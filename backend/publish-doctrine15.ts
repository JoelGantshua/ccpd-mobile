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
  const title =
    'Décentralisation, gouvernance participative et développement provincial et local';

  const publications = await prisma.publication.findMany({
    where: {
      type: 'DOCTRINE',
      doctrineNumber: 15
    }
  });

  const expectedIds = [
    '139bcb34-9999-4f54-9c98-54117e004356',
    '837dae95-1bfd-412f-96c6-cf12bef18a91'
  ];

  if (
    publications.length !== 2 ||
    publications.some(p =>
      !expectedIds.includes(p.id) ||
      !p.storageKey ||
      !['DRAFT', 'PUBLISHED'].includes(p.status)
    ) ||
    !publications.some(p => p.doctrineVersion === 'COURTE') ||
    !publications.some(p => p.doctrineVersion === 'INTEGRALE')
  ) {
    throw new Error('STOP : doctrine 15 incoherente');
  }

  for (const publication of publications) {
    const version =
      publication.doctrineVersion === 'COURTE'
        ? 'version courte'
        : 'version intégrale';

    const newTitle = `Doctrine 15 - ${title} - ${version}`;

    await prisma.publication.update({
      where: { id: publication.id },
      data: { title: newTitle }
    });

    if (publication.status === 'DRAFT') {
      await service.publish(publication.id);
    }

    console.log('[PUBLIE]', newTitle);
  }

  console.log('\n=== RESULTAT ===');

  console.log(
    'DOCUMENTS PUBLIES:',
    await prisma.publication.count({
      where: {
        type: 'DOCUMENT',
        status: 'PUBLISHED'
      }
    })
  );

  console.log(
    'VERSIONS DOCTRINES PUBLIEES:',
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
