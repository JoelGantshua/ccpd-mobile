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

try {
  const doctrines = await prisma.publication.findMany({
    where: { type: 'DOCTRINE' },
    select: {
      id: true,
      doctrineNumber: true,
      doctrineVersion: true,
      status: true,
    },
    orderBy: [
      { doctrineNumber: 'asc' },
      { doctrineVersion: 'asc' },
    ],
  });

  if (doctrines.length !== 30) {
    throw new Error(`Nombre incorrect : ${doctrines.length}/30`);
  }

  for (let number = 1; number <= 15; number++) {
    const pair = doctrines.filter(
      (doc) => doc.doctrineNumber === number,
    );

    const versions = pair.map((doc) => doc.doctrineVersion);

    if (
      pair.length !== 2 ||
      !versions.includes('COURTE') ||
      !versions.includes('INTEGRALE') ||
      pair.some((doc) => doc.status !== 'DRAFT')
    ) {
      throw new Error(`Doctrine ${number} incorrecte.`);
    }

    console.log(
      `Doctrine ${String(number).padStart(2, '0')} : COURTE + INTEGRALE — DRAFT`,
    );
  }

  console.log('\nVÉRIFICATION RÉUSSIE');
  console.log('15 doctrines correctement associées.');
  console.log('30 PDF toujours en brouillon.');
} finally {
  await prisma.$disconnect();
}
