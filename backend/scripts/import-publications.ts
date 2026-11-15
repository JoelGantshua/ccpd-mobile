import 'dotenv/config';

import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  unlink,
} from 'node:fs/promises';
import { basename, join, parse } from 'node:path';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const apply = process.argv.includes('--apply');
const maxSize = 10 * 1024 * 1024;
const root = join(process.cwd(), 'uploads');
const destination = join(root, 'publications');

const categories = [
  { folder: 'documents', type: 'DOCUMENT' },
  { folder: 'doctrines', type: 'DOCTRINE' },
] as const;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL manquant.');
}

if (
  apply &&
  process.env.CCPD_IMPORT_CONFIRMED !== 'development'
) {
  throw new Error(
    'Importation refusée : confirmation development manquante.',
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

type ImportItem = {
  source: string;
  fileName: string;
  storageKey: string;
  title: string;
  type: 'DOCUMENT' | 'DOCTRINE';
  size: number;
};

async function main() {
  const items: ImportItem[] = [];
  const seen = new Set<string>();

  // Examiner tous les fichiers avant toute écriture.
  for (const category of categories) {
    const folder = join(root, 'a-importer', category.folder);
    const entries = await readdir(folder, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (!entry.name.toLowerCase().endsWith('.pdf')) {
        continue;
      }

      if (!entry.isFile()) {
        throw new Error(`Fichier non régulier : ${entry.name}`);
      }

      const source = join(folder, entry.name);
      const info = await lstat(source);

      if (
        !info.isFile() ||
        info.size === 0 ||
        info.size > maxSize
      ) {
        throw new Error(`Taille invalide : ${entry.name}`);
      }

      const buffer = await readFile(source);
      const header = buffer.subarray(0, 5).toString('ascii');
      const tail = buffer.subarray(-1024).toString('latin1');

      if (header !== '%PDF-' || !tail.includes('%%EOF')) {
        throw new Error(`PDF invalide : ${entry.name}`);
      }

      const hash = createHash('sha256')
        .update(buffer)
        .digest('hex');

      if (seen.has(hash)) {
        throw new Error(`PDF dupliqué dans le lot : ${entry.name}`);
      }

      seen.add(hash);

      const title = parse(entry.name).name
        .replace(/_/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);

      if (title.length < 3) {
        throw new Error(`Titre invalide : ${entry.name}`);
      }

      items.push({
        source,
        fileName: basename(entry.name).slice(0, 255),
        storageKey: `${hash}.pdf`,
        title,
        type: category.type,
        size: buffer.length,
      });
    }
  }

  items.sort((a, b) =>
    a.type.localeCompare(b.type) ||
    a.title.localeCompare(b.title),
  );

  console.log(`\nPDF détectés : ${items.length}`);
  console.log(
    apply
      ? 'MODE : IMPORTATION RÉELLE'
      : 'MODE : SIMULATION (aucune écriture)',
  );

  let created = 0;
  let skipped = 0;

  if (apply) {
    await mkdir(destination, { recursive: true });
  }

  for (const item of items) {
    const existing = await prisma.publication.findFirst({
      where: { storageKey: item.storageKey },
      select: { id: true, type: true },
    });

    if (existing) {
      skipped++;
      console.log(`[EXISTANT] ${item.title}`);
      continue;
    }

    if (!apply) {
      created++;
      console.log(`[À IMPORTER] ${item.type} : ${item.title}`);
      continue;
    }

    const target = join(destination, item.storageKey);
    let copied = false;

    try {
      try {
        await copyFile(
          item.source,
          target,
          constants.COPYFILE_EXCL,
        );
        copied = true;
      } catch (error) {
        if (
          !(error instanceof Error) ||
          !('code' in error) ||
          error.code !== 'EEXIST'
        ) {
          throw error;
        }

        // Ne jamais écraser un fichier existant.
        const existingBuffer = await readFile(target);
        const existingHash = createHash('sha256')
          .update(existingBuffer)
          .digest('hex');

        if (`${existingHash}.pdf` !== item.storageKey) {
          throw new Error(
            `Conflit avec le fichier existant : ${item.fileName}`,
          );
        }
      }

      await prisma.publication.create({
        data: {
          title: item.title,
          description: null,
          type: item.type,
          status: 'DRAFT',
          fileName: item.fileName,
          storageKey: item.storageKey,
          mimeType: 'application/pdf',
          fileSize: item.size,
        },
      });

      created++;
      console.log(`[IMPORTÉ] ${item.type} : ${item.title}`);
    } catch (error) {
      if (copied) {
        await unlink(target).catch(() => undefined);
      }

      throw error;
    }
  }

  console.log('\n=== BILAN ===');
  console.log(`Nouveaux : ${created}`);
  console.log(`Déjà enregistrés : ${skipped}`);

  if (apply) {
    console.log('Tous les nouveaux fichiers sont en brouillon.');
    console.log('Aucun document publié automatiquement.');
  } else {
    console.log('Aucune modification de Neon ni des fichiers.');
  }
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
