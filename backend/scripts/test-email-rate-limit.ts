import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import * as argon2 from 'argon2';
import { HttpException } from '@nestjs/common';
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

const service = new EmailVerificationService(
  prisma as unknown as PrismaService,
);

const testIds: string[] = [];

async function createUser() {
  const province = await prisma.province.findFirst({
    where: { name: 'Tshopo' },
  });

  assert.ok(province);

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

  testIds.push(user.id);
  return user;
}

function is429(error: unknown): boolean {
  return error instanceof HttpException &&
    error.getStatus() === 429;
}

async function main() {
  // Test 1 : emission initiale
  const user = await createUser();
  const first = await service.issueToken(user.id);

  assert.match(first.token, /^[a-f0-9]{64}$/);
  console.log('OK : premier jeton emis');

  // Test 2 : nouvelle demande immediate
  await assert.rejects(
    () => service.issueToken(user.id),
    is429,
  );
  console.log('OK : nouvelle demande bloquee (429)');

  // Simulation de 6 minutes ecoulees
  await prisma.emailVerificationToken.update({
    where: { userId: user.id },
    data: {
      createdAt: new Date(Date.now() - 6 * 60_000),
    },
  });

  // Test 3 : renouvellement
  const second = await service.issueToken(user.id);
  assert.notEqual(second.token, first.token);
  console.log('OK : renouvellement apres le delai');

  // Test 4 : ancien jeton invalide
  await assert.rejects(
    () => service.consumeToken(first.token),
  );
  console.log('OK : ancien jeton invalide');

  // Test 5 : nouveau jeton utilisable
  const verified = await service.consumeToken(second.token);
  assert.deepEqual(verified, { verified: true });

  const updated = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  assert.ok(updated.emailVerifiedAt);
  assert.equal(updated.isActive, false);
  console.log('OK : nouveau jeton valide, compte inactif');

  // Test 6 : deux emissions concurrentes
  const concurrentUser = await createUser();

  const results = await Promise.allSettled([
    service.issueToken(concurrentUser.id),
    service.issueToken(concurrentUser.id),
  ]);

  assert.equal(
    results.filter(r => r.status === 'fulfilled').length,
    1,
  );

  assert.equal(
    results.filter(
      r => r.status === 'rejected' && is429(r.reason),
    ).length,
    1,
  );

  console.log('OK : une seule emission concurrente');
  console.log('TOUS LES TESTS ONT REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ECHEC DU TEST :', error);
  process.exitCode = 1;
} finally {
  for (const id of testIds) {
    try {
      await prisma.user.delete({
        where: { id },
      });
      console.log('Compte de test supprime');
    } catch (error) {
      console.error('Nettoyage incomplet :', error);
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
