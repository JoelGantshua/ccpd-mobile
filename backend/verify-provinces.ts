import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL!,
  }),
});

try {
  console.log(
    'TOTAL DANS NEON :',
    await prisma.province.count()
  );
} finally {
  await prisma.$disconnect();
}
