
import 'dotenv/config';
import * as argon2 from 'argon2';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const ORIGINAL_EMAIL = 'ccpdblocest@gmail.com';
const NEW_EMAIL = 'blaise.matondo.08@gmail.com';

const EXPECTED_HOST =
  'ep-polished-bread-bdbeyiz2-pooler.c-8.us-east-2.aws.neon.tech';

const EXECUTE =
  process.env.CCPD_RECOVERY_EXECUTE === 'YES';

const password = process.env.CCPD_RECOVERY_PASSWORD;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL manquante.');
}

const url = new URL(connectionString);

if (
  url.protocol !== 'postgresql:' &&
  url.protocol !== 'postgres:'
) {
  throw new Error('Protocole de base inattendu.');
}

if (
  url.hostname !== EXPECTED_HOST ||
  url.pathname !== '/neondb'
) {
  throw new Error(
    'Connexion differente de la branche development validee.',
  );
}

if (
  process.env.CCPD_RECOVERY_BRANCH !== 'development'
) {
  throw new Error(
    'Confirmation de branche manquante.',
  );
}

if (
  process.env.CCPD_RECOVERY_TARGET !== ORIGINAL_EMAIL
) {
  throw new Error(
    'Confirmation du compte cible manquante.',
  );
}

if (
  EXECUTE &&
  process.env.CCPD_RECOVERY_CONFIRM !==
    'RECOVER-CCPD-ADMIN'
) {
  throw new Error(
    'Confirmation d execution manquante.',
  );
}

if (
  EXECUTE &&
  (
    typeof password !== 'string' ||
    Array.from(password).length < 12 ||
    Array.from(password).length > 128 ||
    password.includes('\0')
  )
) {
  throw new Error(
    'Mot de passe invalide (12 a 128 caracteres).',
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

try {
  const admin = await prisma.user.findUnique({
    where: { email: ORIGINAL_EMAIL },
    select: {
      id: true,
      role: true,
      isActive: true,
      emailVerifiedAt: true,
    },
  });

  if (
    !admin ||
    admin.role !== 'ADMIN' ||
    !admin.isActive ||
    !admin.emailVerifiedAt
  ) {
    throw new Error(
      'Compte administrateur absent ou etat inattendu.',
    );
  }

  const adminCount = await prisma.user.count({
    where: { role: 'ADMIN' },
  });

  if (adminCount !== 1) {
    throw new Error(
      'Nombre d administrateurs inattendu.',
    );
  }

  const emailOwner = await prisma.user.findUnique({
    where: { email: NEW_EMAIL },
    select: { id: true },
  });

  if (emailOwner) {
    throw new Error(
      'Nouvelle adresse deja utilisee.',
    );
  }

  const sessions = await prisma.refreshSession.count({
    where: {
      userId: admin.id,
      revokedAt: null,
    },
  });

  console.log({
    mode: EXECUTE ? 'EXECUTION' : 'SIMULATION',
    brancheDeclaree: 'development',
    compteCible: ORIGINAL_EMAIL,
    nouvelleAdresse: NEW_EMAIL,
    sessionsARevoquer: sessions,
  });

  if (!EXECUTE) {
    console.log(
      'SIMULATION : aucune modification effectuee.',
    );
  } else {
    const passwordHash = await argon2.hash(password!, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    await prisma.$transaction(async (tx) => {
      const changed = await tx.user.updateMany({
        where: {
          id: admin.id,
          email: ORIGINAL_EMAIL,
          role: 'ADMIN',
          isActive: true,
          emailVerifiedAt: { not: null },
        },
        data: {
          email: NEW_EMAIL,
          passwordHash,
          emailVerifiedAt: null,
        },
      });

      if (changed.count !== 1) {
        throw new Error(
          'Compte modifie entre-temps.',
        );
      }

      await tx.emailVerificationToken.deleteMany({
        where: { userId: admin.id },
      });

      await tx.refreshSession.updateMany({
        where: {
          userId: admin.id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });
    });

    const updated = await prisma.user.findUnique({
      where: { id: admin.id },
      select: {
        email: true,
        role: true,
        isActive: true,
        emailVerifiedAt: true,
      },
    });

    console.log({
      modificationEffectuee: true,
      email: updated?.email,
      role: updated?.role,
      actif: updated?.isActive,
      emailVerifie: Boolean(
        updated?.emailVerifiedAt,
      ),
    });

    console.log(
      'Demander un lien via POST /auth/resend-verification.',
    );

    console.log(
      'Verifier le nouvel email avant connexion.',
    );
  }
} finally {
  await prisma.$disconnect();
}
