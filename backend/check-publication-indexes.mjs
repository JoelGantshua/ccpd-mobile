import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const url = process.env.DIRECT_URL;
const target = new URL(url);

if (
  target.hostname !== 'ep-polished-bread-bdbeyiz2.c-8.us-east-2.aws.neon.tech' ||
  target.pathname !== '/neondb'
) {
  throw new Error('BASE NON AUTORISEE');
}

const sql = neon(url);

console.table(await sql`
  SELECT indexname, indexdef
  FROM pg_indexes
  WHERE schemaname = 'public'
    AND tablename = 'Publication'
  ORDER BY indexname
`);
