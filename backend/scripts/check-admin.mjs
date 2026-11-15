
import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL est manquant.');
}

const email = process.env.CCPD_CHECK_EMAIL?.trim().toLowerCase();

if (!email) {
  throw new Error('CCPD_CHECK_EMAIL est manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

try {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      role: true,
      isActive: true,
      emailVerifiedAt: true,
    },
  });

  if (!user) {
    console.log('Compte absent dans la base utilisée par le backend.');
  } else {
    console.log({
      compteExiste: true,
      role: user.role,
      actif: user.isActive,
      emailVerifie: Boolean(user.emailVerifiedAt),
    });
  }
} finally {
  await prisma.$disconnect();
}
