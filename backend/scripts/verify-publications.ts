import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

try {
  const publications = await prisma.publication.findMany({
    select: {
      type: true,
      status: true,
      storageKey: true,
    },
  });

  const count = (type: string, status: string) =>
    publications.filter(
      (item) => item.type === type && item.status === status,
    ).length;

  let filesPresent = 0;
  let filesMissing = 0;

  for (const publication of publications) {
    if (!publication.storageKey) continue;

    const key = publication.storageKey;

    if (!/^[a-f0-9-]{32,64}\.pdf$/i.test(key)) {
      filesMissing++;
      continue;
    }

    try {
      const file = await stat(
        join(process.cwd(), 'uploads', 'publications', key),
      );

      if (file.isFile()) filesPresent++;
      else filesMissing++;
    } catch {
      filesMissing++;
    }
  }

  console.log('\n=== BIBLIOTHÈQUE CCPD MOBILE ===');
  console.log('Total publications :', publications.length);
  console.log('Documents brouillons :', count('DOCUMENT', 'DRAFT'));
  console.log('Doctrines brouillons :', count('DOCTRINE', 'DRAFT'));
  console.log(
    'Publications publiées :',
    publications.filter((p) => p.status === 'PUBLISHED').length,
  );
  console.log('Fichiers retrouvés :', filesPresent);
  console.log('Fichiers manquants :', filesMissing);
  console.log('\nVérification terminée. Aucune donnée modifiée.');
} finally {
  await prisma.$disconnect();
}
