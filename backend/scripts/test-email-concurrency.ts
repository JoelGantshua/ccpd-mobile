import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import * as argon2 from 'argon2';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { EmailVerificationService } from '../src/auth/email-verification.service.ts';
import type { PrismaService } from '../src/prisma/prisma.service.ts';

if (process.env.CCPD_TEST_DATABASE_CONFIRMED !== 'development') {
  throw new Error('Branche development non confirmee');
}

if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL absente');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL,
  }),
});

const verification = new EmailVerificationService(
  prisma as unknown as PrismaService,
);

const testUsers: string[] = [];

async function createTestUser() {
  const province = await prisma.province.findFirst({
    where: { name: 'Tshopo' },
  });

  assert.ok(province, 'Province de test absente');

  const user = await prisma.user.create({
    data: {
      fullName: 'CCPD Security Test',
      email: `security-${randomUUID()}@example.invalid`,
      passwordHash: await argon2.hash(
        randomBytes(32).toString('hex'),
        { type: argon2.argon2id },
      ),
      provinceId: province.id,
      role: 'MEMBRE',
      isActive: false,
    },
  });

  testUsers.push(user.id);
  return user;
}

async function main() {
  // TEST 1 : Deux utilisations simultanees.
  const user1 = await createTestUser();
  const token1 = await verification.issueToken(user1.id);

  const results = await Promise.allSettled([
    verification.consumeToken(token1.token),
    verification.consumeToken(token1.token),
  ]);

  const successes = results.filter(
    r => r.status === 'fulfilled',
  ).length;

  assert.equal(
    successes,
    1,
    'Un seul appel doit reussir',
  );

  const verified = await prisma.user.findUniqueOrThrow({
    where: { id: user1.id },
  });

  assert.ok(verified.emailVerifiedAt);
  assert.equal(verified.isActive, false);

  console.log('OK : une seule consommation simultanee');
  console.log('OK : compte toujours inactif');

  // TEST 2 : Jeton expire.
  const user2 = await createTestUser();
  const token2 = await verification.issueToken(user2.id);

  const storedToken = await prisma.emailVerificationToken.findFirstOrThrow({
    where: { userId: user2.id },
  });

  await prisma.emailVerificationToken.update({
    where: { tokenHash: storedToken.tokenHash },
    data: {
      expiresAt: new Date(Date.now() - 60_000),
    },
  });

  await assert.rejects(
    () => verification.consumeToken(token2.token),
  );

  const expiredUser = await prisma.user.findUniqueOrThrow({
    where: { id: user2.id },
  });

  assert.equal(expiredUser.emailVerifiedAt, null);
  assert.equal(expiredUser.isActive, false);

  console.log('OK : jeton expire refuse');
  console.log('OK : compte non verifie et inactif');
  console.log('TOUS LES TESTS ONT REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ECHEC :', error);
  process.exitCode = 1;
} finally {
  for (const id of testUsers) {
    try {
      await prisma.user.delete({ where: { id } });
      console.log('Compte temporaire supprime');
    } catch (error) {
      console.error('Nettoyage incomplet', error);
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
