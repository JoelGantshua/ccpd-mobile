import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

try {
  const provinces = await prisma.province.findMany();

  console.log('CONNEXION NEON OK');
  console.log('Nombre de provinces :', provinces.length);
  console.log(provinces);
} catch (error) {
  console.error('ERREUR PRISMA :');
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
