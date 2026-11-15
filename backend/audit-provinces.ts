import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL!,
  }),
});

const provincesBlocEst = [
  'Bas-Uele',
  'Haut-Uele',
  'Ituri',
  'Maniema',
  'Nord-Kivu',
  'Sud-Kivu',
  'Tanganyika',
  'Tshopo',
];

async function main() {
  const all = await prisma.province.findMany({
    orderBy: { name: 'asc' },
  });

  const horsBloc = all.filter(
    p => !provincesBlocEst.includes(p.name)
  );

  console.log('Total provinces :', all.length);
  console.log('Provinces du Bloc Est :',
    all.length - horsBloc.length);
  console.log('Provinces hors Bloc Est :', horsBloc.length);

  console.log('\n=== PROVINCES HORS BLOC EST ===');
  console.table(horsBloc.map(p => ({
    id: p.id,
    name: p.name,
  })));

  const relations = await prisma.$queryRaw<
    Array<{ table_name: string; constraint_name: string }>
  >`
    SELECT
      tc.table_name::text AS table_name,
      tc.constraint_name::text AS constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
      AND tc.constraint_schema = ccu.constraint_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_schema = 'public'
      AND ccu.table_name = 'Province'
  `;

  console.log('\n=== RELATIONS VERS PROVINCE ===');
  console.table(relations);

  console.log('\nAUCUNE DONNEE MODIFIEE.');
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
