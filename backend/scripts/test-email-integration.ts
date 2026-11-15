
import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import * as argon2 from 'argon2';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { EmailVerificationService } from '../src/auth/email-verification.service.ts';
import type { PrismaService } from '../src/prisma/prisma.service.ts';

if (process.env.CCPD_TEST_DATABASE_CONFIRMED !== 'development') {
  throw new Error(
    'Test bloque : confirmer la branche development.'
  );
}

if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL absente');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL,
  }),
});

const verificationService = new EmailVerificationService(
  prisma as unknown as PrismaService,
);

let testUserId: string | null = null;

async function main() {
  const province = await prisma.province.findFirst({
    where: { name: 'Tshopo' },
    select: { id: true },
  });

  assert.ok(province, 'Province de test introuvable');

  // Compte fictif, uniquement pour ce test.
  const passwordHash = await argon2.hash(
    randomBytes(32).toString('hex'),
    { type: argon2.argon2id },
  );

  const user = await prisma.user.create({
    data: {
      fullName: 'CCPD Security Test',
      email: `test-${randomUUID()}@example.invalid`,
      passwordHash,
      provinceId: province.id,
      role: 'MEMBRE',
      isActive: false,
    },
  });

  testUserId = user.id;
  console.log('OK : compte temporaire cree');

  const generated = await verificationService.issueToken(
    user.id,
  );

  const stored = await prisma.emailVerificationToken.findFirst({
    where: { userId: user.id },
  });

  assert.ok(stored);
  assert.notEqual(stored.tokenHash, generated.token);
  console.log('OK : jeton stocke sous forme hachee');

  const result = await verificationService.consumeToken(
    generated.token,
  );

  assert.deepEqual(result, { verified: true });

  const verifiedUser = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });

  assert.ok(verifiedUser.emailVerifiedAt);
  assert.equal(verifiedUser.isActive, false);

  console.log('OK : adresse e-mail verifiee');
  console.log('OK : compte toujours inactif');

  const consumed = await prisma.emailVerificationToken.findUniqueOrThrow({
    where: { tokenHash: stored.tokenHash },
  });

  assert.ok(consumed.consumedAt);
  console.log('OK : consommation enregistree');

  let reuseRejected = false;

  try {
    await verificationService.consumeToken(generated.token);
  } catch {
    reuseRejected = true;
  }

  assert.ok(reuseRejected, 'Jeton reutilisable : ECHEC');
  console.log('OK : reutilisation refusee');

  console.log('TOUS LES TESTS D INTEGRATION ONT REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ECHEC DU TEST :', error);
  process.exitCode = 1;
} finally {
  if (testUserId) {
    try {
      await prisma.user.delete({
        where: { id: testUserId },
      });
      console.log('Compte temporaire supprime');
    } catch (error) {
      console.error(
        'Nettoyage incomplet : verifier le compte test',
        error,
      );
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
