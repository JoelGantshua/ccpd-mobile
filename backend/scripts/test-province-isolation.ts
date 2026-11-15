import 'dotenv/config';

import { randomUUID, randomBytes } from 'node:crypto';
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
  role: 'MEMBRE' | 'RESPONSABLE_PROVINCIAL',
  provinceId: string,
) {
  const user = await prisma.user.create({
    data: {
      fullName: `CCPD Isolation Test ${role}`,
      email: `isolation-${randomUUID()}@example.invalid`,
      passwordHash: await argon2.hash(
        randomBytes(32).toString('hex'),
        { type: argon2.argon2id },
      ),
      role,
      provinceId,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  createdIds.push(user.id);
  return user;
}

async function checkProvince(
  responsableId: string,
  ownMemberId: string,
  otherMemberId: string,
  provinceName: string,
) {
  const session = await sessions.createSession(responsableId);

  const response = await fetch(
    'http://localhost:3000/provincial/members',
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  assert.equal(response.status, 200);

  const members: Array<{
    id: string;
    provinceId: string;
    passwordHash?: string;
  }> = await response.json();

  assert.ok(
    members.some(member => member.id === ownMemberId),
    `Membre de ${provinceName} introuvable`,
  );

  assert.ok(
    !members.some(member => member.id === otherMemberId),
    `Fuite de donnees entre provinces : ${provinceName}`,
  );

  assert.ok(
    members.every(member => member.passwordHash === undefined),
    'Hash de mot de passe expose',
  );

  console.log(`OK : isolation ${provinceName}`);
}

async function main() {
  const tshopo = await prisma.province.findUnique({
    where: { name: 'Tshopo' },
  });

  const ituri = await prisma.province.findUnique({
    where: { name: 'Ituri' },
  });

  assert.ok(tshopo && ituri, 'Provinces introuvables');

  const responsableTshopo = await createUser(
    'RESPONSABLE_PROVINCIAL',
    tshopo.id,
  );

  const responsableIturi = await createUser(
    'RESPONSABLE_PROVINCIAL',
    ituri.id,
  );

  const membreTshopo = await createUser('MEMBRE', tshopo.id);
  const membreIturi = await createUser('MEMBRE', ituri.id);

  await checkProvince(
    responsableTshopo.id,
    membreTshopo.id,
    membreIturi.id,
    'Tshopo',
  );

  await checkProvince(
    responsableIturi.id,
    membreIturi.id,
    membreTshopo.id,
    'Ituri',
  );

  console.log('ISOLATION PROVINCIALE VALIDEE');
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
