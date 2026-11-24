import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.js';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PublicationsService } from './src/publications/publications.service.js';
import type { PrismaService } from './src/prisma/prisma.service.js';

const url = process.env.DATABASE_URL!;

const allowedHosts = [
  'ep-polished-bread-bdbeyiz2-pooler.c-8.us-east-2.aws.neon.tech',
  'ep-polished-bread-bdbeyiz2.c-8.us-east-2.aws.neon.tech'
];

if (!allowedHosts.includes(new URL(url).hostname)) {
  throw new Error('STOP : environnement non autorise');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: url })
});

const service = new PublicationsService(
  prisma as unknown as PrismaService
);

async function main() {
  const publications = await prisma.publication.findMany({
    where: {
      OR: [
        {
          id: {
            in: [
              '588a62ca-6c4b-4e46-9acd-b3e8b1ba4230',
              'f7d3fe9f-1a56-4e0e-9208-94bfb5fc2003'
            ]
          },
          type: 'DOCUMENT'
        },
        {
          type: 'DOCTRINE',
          doctrineNumber: { gte: 1, lte: 14 },
          doctrineVersion: {
            in: ['COURTE', 'INTEGRALE']
          }
        }
      ]
    },
    orderBy: [
      { type: 'asc' },
      { doctrineNumber: 'asc' },
      { doctrineVersion: 'asc' }
    ]
  });

  const doctrines = publications.filter(
    p => p.type === 'DOCTRINE'
  );

  const documents = publications.filter(
    p => p.type === 'DOCUMENT'
  );

  const uniqueVersions = new Set(
    doctrines.map(
      p => `${p.doctrineNumber}-${p.doctrineVersion}`
    )
  );

  if (
    publications.length !== 30 ||
    documents.length !== 2 ||
    doctrines.length !== 28 ||
    uniqueVersions.size !== 28 ||
    publications.some(
      p => !p.storageKey ||
        !['DRAFT', 'PUBLISHED'].includes(p.status)
    )
  ) {
    throw new Error(
      'STOP : inventaire inattendu ou doublons detectes'
    );
  }

  let published = 0;
  let skipped = 0;

  for (const publication of publications) {
    if (publication.status === 'PUBLISHED') {
      skipped++;
      continue;
    }

    await service.publish(publication.id);

    published++;
    console.log('[PUBLIE]', publication.title);
  }

  console.log('\n=== RESULTAT ===');
  console.log('NOUVELLES PUBLICATIONS:', published);
  console.log('DEJA PUBLIEES:', skipped);

  console.log(
    'TOTAL DOCUMENTS PUBLIES:',
    await prisma.publication.count({
      where: {
        type: 'DOCUMENT',
        status: 'PUBLISHED'
      }
    })
  );

  console.log(
    'TOTAL VERSIONS DOCTRINES PUBLIEES:',
    await prisma.publication.count({
      where: {
        type: 'DOCTRINE',
        status: 'PUBLISHED'
      }
    })
  );
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
