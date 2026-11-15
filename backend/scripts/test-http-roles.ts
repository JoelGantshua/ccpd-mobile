
import 'dotenv/config';

import { randomUUID, randomBytes } from 'node:crypto';
import { strict as assert } from 'node:assert';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../src/auth/session.service.ts';

import type { PrismaService } from '../src/prisma/prisma.service.ts';

const API = 'http://localhost:3000';

if (process.env.CCPD_TEST_DATABASE_CONFIRMED !== 'development') {
  throw new Error('Branche development non confirmee');
}

if (!process.env.DIRECT_URL || !process.env.JWT_SECRET) {
  throw new Error('Configuration manquante');
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

const createdIds: string[] = [];

async function createUser(
  role: 'ADMIN' | 'RESPONSABLE_PROVINCIAL' | 'MEMBRE',
  provinceId: string,
) {
  const user = await prisma.user.create({
    data: {
      fullName: `CCPD HTTP Test ${role}`,
      email: `http-test-${randomUUID()}@example.invalid`,
      passwordHash:
        '$argon2id$v=19$m=19456,t=2,p=1$test$test',
      role,
      provinceId,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  createdIds.push(user.id);

  const session = await sessions.createSession(user.id);
  return session.accessToken;
}

async function check(
  route: string,
  token: string,
  expected: number,
) {
  const response = await fetch(`${API}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  assert.equal(
    response.status,
    expected,
    `${route}: attendu ${expected}, obtenu ${response.status}`,
  );

  console.log(`OK : ${route} -> HTTP ${expected}`);
}

async function main() {
  const province = await prisma.province.findUnique({
    where: { name: 'Tshopo' },
  });

  assert.ok(province, 'Province Tshopo introuvable');

  const admin = await createUser('ADMIN', province.id);
  const provincial = await createUser(
    'RESPONSABLE_PROVINCIAL',
    province.id,
  );
  const member = await createUser('MEMBRE', province.id);

  await check('/admin/members/pending', admin, 200);
  await check('/admin/members/pending', member, 403);

  await check('/provincial/members', provincial, 200);
  await check('/provincial/members/pending', provincial, 200);
  await check('/provincial/members', member, 403);
  await check('/provincial/members', admin, 403);

  console.log('TOUS LES TESTS HTTP DE ROLES ONT REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ECHEC :', error);
  process.exitCode = 1;
} finally {
  for (const id of createdIds) {
    try {
      await prisma.user.delete({ where: { id } });
      console.log('Compte temporaire supprime');
    } catch (error) {
      console.error('Nettoyage incomplet :', error);
      process.exitCode = 1;
    }
  }

  await prisma.$disconnect();
}
