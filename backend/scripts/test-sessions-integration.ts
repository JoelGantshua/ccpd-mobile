import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { SessionService } from '../src/auth/session.service.ts';
import type { PrismaService } from '../src/prisma/prisma.service.ts';

if (process.env.CCPD_TEST_DATABASE_CONFIRMED !== 'development') {
  throw new Error('Branche development non confirmee');
}

if (!process.env.DIRECT_URL || !process.env.JWT_SECRET) {
  throw new Error('DIRECT_URL ou JWT_SECRET absent');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL,
  }),
});

const jwt = new JwtService({
  secret: process.env.JWT_SECRET,
  signOptions: {
    algorithm: 'HS256',
    expiresIn: '15m',
    issuer: 'ccpd-mobile-api',
    audience: 'ccpd-mobile',
  },
});

const sessions = new SessionService(
  prisma as unknown as PrismaService,
  jwt,
);

let testUserId: string | null = null;

async function main() {
  const province = await prisma.province.findFirst({
    where: { name: 'Tshopo' },
    select: { id: true },
  });

  assert.ok(province, 'Province introuvable');

  const user = await prisma.user.create({
    data: {
      fullName: 'CCPD Session Security Test',
      email: `session-${randomUUID()}@example.invalid`,
      passwordHash: await argon2.hash(
        randomBytes(32).toString('hex'),
        { type: argon2.argon2id },
      ),
      role: 'MEMBRE',
      provinceId: province.id,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  testUserId = user.id;

  // 1. Creation
  const first = await sessions.createSession(user.id);
  assert.match(first.refreshToken, /^[a-f0-9]{64}$/);

  const stored = await prisma.refreshSession.findFirstOrThrow({
    where: { userId: user.id },
  });

  assert.notEqual(stored.tokenHash, first.refreshToken);
  console.log('OK : session creee et jeton hache');

  // 2. Renouvellement
  const second = await sessions.refresh(first.refreshToken);
  assert.ok(second.accessToken);
  assert.notEqual(second.refreshToken, first.refreshToken);

  console.log('OK : renouvellement reussi');

  // 3. Ancien jeton refuse
  await assert.rejects(
    () => sessions.refresh(first.refreshToken),
  );

  console.log('OK : ancien jeton refuse');

  // 4. Deconnexion
  await sessions.logout(user.id, second.refreshToken);

  await assert.rejects(
    () => sessions.refresh(second.refreshToken),
  );

  console.log('OK : deconnexion revoque la session');

  // 5. Deconnexion de tous les appareils
  const device1 = await sessions.createSession(user.id);
  const device2 = await sessions.createSession(user.id);

  await sessions.logoutAll(user.id);

  await assert.rejects(
    () => sessions.refresh(device1.refreshToken),
  );

  await assert.rejects(
    () => sessions.refresh(device2.refreshToken),
  );

  console.log('OK : toutes les sessions revoquees');

  // 6. Rotation concurrente
  const concurrent = await sessions.createSession(user.id);

  const results = await Promise.allSettled([
    sessions.refresh(concurrent.refreshToken),
    sessions.refresh(concurrent.refreshToken),
  ]);

  assert.equal(
    results.filter(r => r.status === 'fulfilled').length,
    1,
  );

  assert.equal(
    results.filter(r => r.status === 'rejected').length,
    1,
  );

  console.log('OK : rotation concurrente protegee');
  console.log('TOUS LES TESTS DE SESSION ONT REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ECHEC :', error);
  process.exitCode = 1;
} finally {
  if (testUserId) {
    try {
      await prisma.user.delete({
        where: { id: testUserId },
      });
      console.log('Compte de test supprime');
    } catch (error) {
      console.error('Nettoyage incomplet :', error);
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
