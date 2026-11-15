import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { readFileSync } from 'node:fs';

const backupPath =
  'D:/ccpd-mobile/backups/provinces-2026-11-09T12-48-15-922Z.json';

const blocEst = [
  'Bas-Uele',
  'Haut-Uele',
  'Ituri',
  'Maniema',
  'Nord-Kivu',
  'Sud-Kivu',
  'Tanganyika',
  'Tshopo',
];

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL!,
  }),
});

async function main() {
  // Vérifier la sauvegarde existante.
  const sauvegarde = JSON.parse(
    readFileSync(backupPath, 'utf8')
  );

  if (!Array.isArray(sauvegarde) || sauvegarde.length !== 26) {
    throw new Error('Sauvegarde invalide ou incomplete.');
  }

  // Lire les données présentes sur Neon.
  const provinces = await prisma.province.findMany();

  const presentes = provinces.filter(
    p => blocEst.includes(p.name)
  );

  const horsBloc = provinces.filter(
    p => !blocEst.includes(p.name)
  );

  console.log('Total :', provinces.length);
  console.log('Bloc Est :', presentes.length);
  console.log('Hors Bloc Est :', horsBloc.length);

  if (
    provinces.length !== 26 ||
    presentes.length !== 8 ||
    horsBloc.length !== 18 ||
    !blocEst.every(name => presentes.some(p => p.name === name))
  ) {
    throw new Error('Verification des provinces echouee.');
  }

  // Vérifier que la sauvegarde correspond aux données actuelles.
  const idsSauvegardes = new Set(
    sauvegarde.map((p: { id: string }) => p.id)
  );

  if (!provinces.every(p => idsSauvegardes.has(p.id))) {
    throw new Error('La sauvegarde ne correspond pas a la base.');
  }

  // Une seule opération SQL de suppression.
  const result = await prisma.province.deleteMany({
    where: {
      id: {
        in: horsBloc.map(p => p.id),
      },
      name: {
        notIn: blocEst,
      },
    },
  });

  console.log('Provinces supprimees :', result.count);

  const restantes = await prisma.province.findMany({
    orderBy: { name: 'asc' },
  });

  console.log('Provinces restantes :', restantes.length);
  console.table(restantes.map(p => ({ name: p.name })));

  if (
    result.count !== 18 ||
    restantes.length !== 8
  ) {
    throw new Error('Verification finale inattendue.');
  }

  console.log('NETTOYAGE REUSSI');
}

try {
  await main();
} catch (error) {
  console.error('ERREUR :', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
