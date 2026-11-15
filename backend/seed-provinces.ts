import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const provincesBlocEst = [
  'Tshopo',
  'Ituri',
  'Nord-Kivu',
  'Sud-Kivu',
  'Maniema',
  'Tanganyika',
  'Haut-Uélé',
  'Bas-Uélé',
];

async function main() {
  const existing = await prisma.province.findMany({
    select: { name: true },
  });

  const horsBlocEst = existing
    .map(p => p.name)
    .filter(name => !provincesBlocEst.includes(name));

  if (horsBlocEst.length > 0) {
    throw new Error(
      `Provinces hors Bloc Est déjà présentes : ${horsBlocEst.join(', ')}. Aucune suppression automatique.`
    );
  }

  for (const name of provincesBlocEst) {
    await prisma.province.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Provinces Bloc Est enregistrées :',
    await prisma.province.count());
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
