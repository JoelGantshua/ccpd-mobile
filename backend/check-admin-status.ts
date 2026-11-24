import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
      emailVerifiedAt: true,
      createdAt: true,
    },
  });

  console.table(admins);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());