import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  }),
});

try {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      isActive: true,
      emailVerifiedAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  console.table(users.map((user) => ({
    email: user.email,
    role: user.role,
    actif: user.isActive,
    emailVerifie: Boolean(user.emailVerifiedAt),
  })));
} finally {
  await prisma.$disconnect();
}
