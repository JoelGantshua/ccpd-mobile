import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL manquant.');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: url,
  }),
});

try {
  const doctrines = await prisma.publication.findMany({
    where: {
      type: 'DOCTRINE',
    },
    select: {
      id: true,
      title: true,
      fileName: true,
      status: true,
    },
    orderBy: {
      fileName: 'asc',
    },
  });

  console.log('\n=== DOCTRINES CCPD MOBILE ===\n');
  console.log(`Total : ${doctrines.length}\n`);

  doctrines.forEach((doc, index) => {
    console.log(`${index + 1}. ${doc.fileName}`);
    console.log(`   ID     : ${doc.id}`);
    console.log(`   Statut : ${doc.status}`);
    console.log('');
  });

  const published = doctrines.filter(
    (doc) => doc.status === 'PUBLISHED',
  );

  console.log('=== RÉSUMÉ ===');
  console.log(`Doctrines trouvées : ${doctrines.length}`);
  console.log(`Doctrines publiées : ${published.length}`);
  console.log(`Doctrines non publiées : ${doctrines.length - published.length}`);
} finally {
  await prisma.$disconnect();
}
