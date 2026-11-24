import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function main() {
  const url = process.env.DIRECT_URL;

  if (!url) throw new Error('DIRECT_URL absent');

  const target = new URL(url);

  if (
    target.hostname !== 'ep-polished-bread-bdbeyiz2.c-8.us-east-2.aws.neon.tech' ||
    target.pathname !== '/neondb'
  ) {
    throw new Error('BASE NON AUTORISEE');
  }

  const sql = neon(url);

  console.log('=== INVENTAIRE ===');

  console.table(await sql`
    SELECT type, status, COUNT(*)::int AS total
    FROM "Publication"
    GROUP BY type, status
    ORDER BY type, status
  `);

  console.log('=== DOUBLONS ===');

  console.table(await sql`
    SELECT "doctrineNumber", "doctrineVersion",
           COUNT(*)::int AS total
    FROM "Publication"
    WHERE "doctrineNumber" IS NOT NULL
      AND "doctrineVersion" IS NOT NULL
    GROUP BY "doctrineNumber", "doctrineVersion"
    HAVING COUNT(*) > 1
  `);

  console.log('=== METADONNEES INVALIDES ===');

  console.table(await sql`
    SELECT id, type, "doctrineNumber", "doctrineVersion"
    FROM "Publication"
    WHERE (
      type = 'DOCTRINE'
      AND (
        "doctrineNumber" IS NULL
        OR "doctrineNumber" NOT BETWEEN 1 AND 15
        OR "doctrineVersion" IS NULL
        OR "doctrineVersion" NOT IN ('COURTE', 'INTEGRALE')
      )
    )
    OR (
      type = 'DOCUMENT'
      AND (
        "doctrineNumber" IS NOT NULL
        OR "doctrineVersion" IS NOT NULL
      )
    )
  `);

  console.log('CONTROLE TERMINE');
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
