import 'dotenv/config';
import * as argon2 from 'argon2';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;
const email = process.env.CCPD_ADMIN_EMAIL?.trim().toLowerCase();
const fullName = process.env.CCPD_ADMIN_NAME?.trim();
const password = process.env.CCPD_ADMIN_PASSWORD;

if (!connectionString || !email || !fullName || !password) {
  throw new Error('Configuration administrateur incomplète.');
}

if (process.env.CCPD_BOOTSTRAP_CONFIRMED !== 'development') {
  throw new Error(
    'Confirmez explicitement la branche de développement Neon.',
  );
}

const passwordLength = Array.from(password).length;

if (
  passwordLength < 12 ||
  passwordLength > 128 ||
  password.includes('\0')
) {
  throw new Error(
    'Le mot de passe doit contenir entre 12 et 128 caractères.',
  );
}

if (fullName.length < 2 || !email.includes('@')) {
  throw new Error('Nom ou adresse e-mail invalide.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

try {
  const existingAdmins = await prisma.user.count({
    where: { role: 'ADMIN' },
  });

  if (existingAdmins > 0) {
    throw new Error(
      'Un administrateur existe déjà. Initialisation refusée.',
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new Error(
      'Cette adresse existe déjà. Aucune promotion automatique autorisée.',
    );
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const admin = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role: 'ADMIN',
      isActive: true,
      emailVerifiedAt: new Date(),
      provinceId: null,
    },
    select: {
      id: true,
      role: true,
      isActive: true,
      emailVerifiedAt: true,
    },
  });

  console.log('Administrateur initial créé avec succès.');
  console.log({
    id: admin.id,
    role: admin.role,
    actif: admin.isActive,
    emailVerifie: Boolean(admin.emailVerifiedAt),
  });
} finally {
  await prisma.$disconnect();
}
