import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: url }),
});

const apply = process.argv.includes('--apply');

function parseDoctrine(fileName: string) {
  const match =
    /^CCPD_Doctrine_(\d{2})_.+_version_(courte|integrale)\.pdf$/i.exec(fileName) ??
    /^CCPD_Doctrines_(15)_Edition_(courte|integrale)\.pdf$/i.exec(fileName);

  if (!match) {
    throw new Error(`Fichier non reconnu : ${fileName}`);
  }

  const number = Number(match[1]);
  const version = match[2].toUpperCase();

  if (number < 1 || number > 15) {
    throw new Error(`Numéro incorrect : ${fileName}`);
  }

  return { number, version };
}

async function verify(tx: any) {
  const docs = await tx.publication.findMany({
    where: { type: 'DOCTRINE' },
    select: {
      id: true,
      fileName: true,
      status: true,
      doctrineNumber: true,
      doctrineVersion: true,
    },
  });

  if (docs.length !== 30) {
    throw new Error(`30 PDF attendus, ${docs.length} trouvés.`);
  }

  const keys = new Set<string>();
  const parsed = [];

  for (const doc of docs) {
    if (!doc.fileName || doc.status !== 'DRAFT') {
      throw new Error(`Document inattendu : ${doc.id}`);
    }

    const { number, version } = parseDoctrine(doc.fileName);
    const key = `${number}-${version}`;

    if (keys.has(key)) {
      throw new Error(`Paire en double : ${key}`);
    }

    keys.add(key);

    parsed.push({
      ...doc,
      number,
      version,
    });
  }

  for (let n = 1; n <= 15; n++) {
    if (!keys.has(`${n}-COURTE`) || !keys.has(`${n}-INTEGRALE`)) {
      throw new Error(`Paire incomplète : doctrine ${n}`);
    }
  }

  return parsed;
}

try {
  const docs = await verify(prisma);

  if (!apply) {
    console.log('MODE PRÉVISUALISATION');
    console.log('30 PDF, 15 paires vérifiées.');
    console.log('Aucune modification effectuée.');
    process.exitCode = 0;
  } else {
    if (process.env.CCPD_DOCTRINE_APPLY !== 'development') {
      throw new Error(
        'Confirmation manquante : CCPD_DOCTRINE_APPLY=development',
      );
    }

    if (docs.some(
      (d) => d.doctrineNumber !== null ||
             d.doctrineVersion !== null
    )) {
      throw new Error('Des associations existent déjà.');
    }

    await prisma.$transaction(async (tx) => {
      const current = await verify(tx);

      if (current.some(
        (d) => d.doctrineNumber !== null ||
               d.doctrineVersion !== null
      )) {
        throw new Error('Métadonnées déjà renseignées.');
      }

      for (const doc of current) {
        const result = await tx.publication.updateMany({
          where: {
            id: doc.id,
            type: 'DOCTRINE',
            status: 'DRAFT',
            doctrineNumber: null,
            doctrineVersion: null,
          },
          data: {
            doctrineNumber: doc.number,
            doctrineVersion: doc.version,
          },
        });

        if (result.count !== 1) {
          throw new Error(`Mise à jour échouée : ${doc.id}`);
        }
      }

      const count = await tx.publication.count({
        where: {
          type: 'DOCTRINE',
          status: 'DRAFT',
          doctrineNumber: { not: null },
          doctrineVersion: { not: null },
        },
      });

      if (count !== 30) {
        throw new Error(`Vérification finale échouée : ${count}/30`);
      }
    }, {
      maxWait: 10000,
      timeout: 60000,
    });

    console.log('SUCCÈS : 30 associations enregistrées.');
    console.log('15 doctrines, 2 versions chacune.');
    console.log('Statut des doctrines : DRAFT.');
  }
} finally {
  await prisma.$disconnect();
}
