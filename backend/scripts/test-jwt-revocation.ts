import 'dotenv/config';
import { randomBytes, randomUUID } from 'node:crypto';
import { strict as assert } from 'node:assert';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { SessionService } from '../src/auth/session.service.ts';
import { JwtAccessGuard } from '../src/auth/jwt-access.guard.ts';
import type { PrismaService } from '../src/prisma/prisma.service.ts';
import type { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

if (process.env.CCPD_TEST_DATABASE_CONFIRMED !== 'development') {
  throw new Error('Branche development non confirmee');
}

if (!process.env.DIRECT_URL || !process.env.JWT_SECRET) {
  throw new Error('Configuration Neon/JWT absente');
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

const guard = new JwtAccessGuard(
  jwt,
  prisma as unknown as PrismaService,
);

let testUserId: string | null = null;

function makeContext(token: string): ExecutionContext {
  const request = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as unknown as ExecutionContext;
}

async function main() {
  const province = await prisma.province.findUnique({
    where: { name: 'Tshopo' },
    select: { id: true },
  });

  assert.ok(province, 'Province introuvable');

  const user = await prisma.user.create({
    data: {
      fullName: 'CCPD JWT Security Test',
      email: `jwt-test-${randomUUID()}@example.invalid`,
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

  const session = await sessions.createSession(user.id);

  assert.ok(session.accessToken);
  console.log('OK : JWT et session crees');

  const before = await guard.canActivate(
    makeContext(session.accessToken),
  );

  assert.equal(before, true);
  console.log('OK : JWT accepte avec session active');

  await sessions.logoutAll(user.id);

  const stored = await prisma.refreshSession.findFirstOrThrow({
    where: { userId: user.id },
  });

  assert.ok(stored.revokedAt);
  console.log('OK : session revoquee dans Neon');

  await assert.rejects(
    () => guard.canActivate(
      makeContext(session.accessToken),
    ),
    UnauthorizedException,
  );

  console.log('OK : ancien JWT refuse apres revocation');
  console.log('TEST DE REVOCATION REUSSI');
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
      console.error('Nettoyage incomplet :', error);
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
