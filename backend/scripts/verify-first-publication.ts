import 'dotenv/config';

import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const fileName =
  'Note_Poids_Politique_Est_RDC_CCPD_Elvis_Mutiri_wa_Bashara_FINAL.pdf';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

try {
  const matches = await prisma.publication.findMany({
    where: {
      fileName,
      type: 'DOCUMENT',
    },
    select: {
      id: true,
      title: true,
      fileName: true,
      storageKey: true,
      fileSize: true,
      mimeType: true,
      status: true,
      type: true,
    },
  });

  if (matches.length !== 1) {
    throw new Error(
      `Publication unique introuvable : ${matches.length} résultat(s).`,
    );
  }

  const doc = matches[0];

  if (doc.status !== 'DRAFT') {
    throw new Error(`Statut inattendu : ${doc.status}`);
  }

  if (
    !doc.storageKey ||
    !/^[a-f0-9]{64}\.pdf$/i.test(doc.storageKey) ||
    doc.mimeType !== 'application/pdf'
  ) {
    throw new Error('Référence PDF invalide.');
  }

  const path = join(
    process.cwd(),
    'uploads',
    'publications',
    doc.storageKey,
  );

  const info = await stat(path);

  if (
    !info.isFile() ||
    info.size === 0 ||
    info.size > 10 * 1024 * 1024 ||
    info.size !== doc.fileSize
  ) {
    throw new Error('Taille ou fichier incohérent.');
  }

  const buffer = await readFile(path);
  const hash = createHash('sha256')
    .update(buffer)
    .digest('hex');

  const tail = buffer
    .subarray(Math.max(0, buffer.length - 1024))
    .toString('latin1');

  if (
    buffer.subarray(0, 5).toString('ascii') !== '%PDF-' ||
    !tail.includes('%%EOF') ||
    `${hash}.pdf` !== doc.storageKey.toLowerCase()
  ) {
    throw new Error('Intégrité du PDF non confirmée.');
  }

  console.log(JSON.stringify({
    id: doc.id,
    title: doc.title,
    type: doc.type,
    status: doc.status,
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    integritePdf: 'OK',
  }));
} finally {
  await prisma.$disconnect();
}
