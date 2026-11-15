import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

function getDoctrineInfo(fileName: string) {
  const match =
    /^CCPD_Doctrine_(\d{2})_.+_version_(courte|integrale)\.pdf$/i.exec(fileName)
    ?? /^CCPD_Doctrines_(15)_Edition_(courte|integrale)\.pdf$/i.exec(fileName);

  if (!match) {
    throw new Error(`Nom de fichier non reconnu : ${fileName}`);
  }

  return {
    doctrineNumber: Number(match[1]),
    doctrineVersion: match[2].toUpperCase(),
  };
}

try {
  const doctrines = await prisma.publication.findMany({
    where: { type: 'DOCTRINE' },
    select: {
      id: true,
      fileName: true,
      status: true,
      doctrineNumber: true,
      doctrineVersion: true,
    },
  });

  if (doctrines.length !== 30) {
    throw new Error(
      `Nombre inattendu : ${doctrines.length} doctrines au lieu de 30.`,
    );
  }

  const grouped = new Map<number, Set<string>>();

  for (const doc of doctrines) {
    if (!doc.fileName) {
      throw new Error(`PDF sans nom : ${doc.id}`);
    }

    if (doc.status !== 'DRAFT') {
      throw new Error(`Doctrine non brouillon : ${doc.fileName}`);
    }

    const info = getDoctrineInfo(doc.fileName);

    if (info.doctrineNumber < 1 || info.doctrineNumber > 15) {
      throw new Error(`Numéro incorrect : ${doc.fileName}`);
    }

    const versions = grouped.get(info.doctrineNumber) ?? new Set<string>();

    if (versions.has(info.doctrineVersion)) {
      throw new Error(`Version en double : ${doc.fileName}`);
    }

    versions.add(info.doctrineVersion);
    grouped.set(info.doctrineNumber, versions);

    if (
      doc.doctrineNumber !== null ||
      doc.doctrineVersion !== null
    ) {
      throw new Error(`Métadonnées déjà renseignées : ${doc.fileName}`);
    }
  }

  for (let number = 1; number <= 15; number++) {
    const versions = grouped.get(number);

    if (
      versions?.size !== 2 ||
      !versions.has('COURTE') ||
      !versions.has('INTEGRALE')
    ) {
      throw new Error(`Paire incomplète : doctrine ${number}`);
    }
  }

  console.log('\n=== PRÉVISUALISATION DES ASSOCIATIONS ===\n');

  for (let number = 1; number <= 15; number++) {
    console.log(
      `Doctrine ${String(number).padStart(2, '0')} : COURTE + INTEGRALE — OK`,
    );
  }

  console.log('\n30 PDF vérifiés.');
  console.log('15 paires complètes.');
  console.log('Aucune donnée modifiée dans Neon.');
} finally {
  await prisma.$disconnect();
}
