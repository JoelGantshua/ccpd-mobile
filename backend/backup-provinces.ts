import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL!,
  }),
});

try {
  const provinces = await prisma.province.findMany({
    orderBy: { name: 'asc' },
  });

  if (provinces.length !== 26) {
    throw new Error(
      `Sauvegarde interrompue : ${provinces.length} provinces trouvées au lieu de 26.`
    );
  }

  const folder = 'D:/ccpd-mobile/backups';
  mkdirSync(folder, { recursive: true });

  const path = join(
    folder,
    `provinces-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  );

  writeFileSync(path, JSON.stringify(provinces, null, 2), 'utf8');

  console.log('SAUVEGARDE REUSSIE');
  console.log('Provinces sauvegardées :', provinces.length);
  console.log('Fichier :', path);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
