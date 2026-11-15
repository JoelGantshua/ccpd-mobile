import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

for (const key of ['DATABASE_URL', 'DIRECT_URL']) {
  const connectionString = process.env[key];

  if (!connectionString) {
    console.log(`${key}: ABSENTE`);
    continue;
  }

  const url = new URL(connectionString);

  console.log(`\n=== ${key} ===`);
  console.log('Hote :', url.hostname);
  console.log('Base :', url.pathname.slice(1));

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

  try {
    const result = await prisma.$queryRaw<
      Array<{
        database_name: string;
        schema_name: string;
        province_table: string | null;
        migration_table: string | null;
      }>
    >`
      SELECT
        current_database()::text AS database_name,
        current_schema()::text AS schema_name,
        to_regclass('public."Province"')::text AS province_table,
        to_regclass('public._prisma_migrations')::text AS migration_table
    `;

    console.log(result);
  } catch (error) {
    console.error('ERREUR :', error);
  } finally {
    await prisma.$disconnect();
  }
}
