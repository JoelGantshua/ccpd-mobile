import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL absente');
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DIRECT_URL,
  }),
});

try {
  const result = await prisma.$queryRaw<
    Array<{
      total_tokens: number;
      users_with_tokens: number;
      duplicate_users: number;
      active_tokens: number;
    }>
  >`
    SELECT
      COUNT(*)::int AS total_tokens,
      COUNT(DISTINCT "userId")::int AS users_with_tokens,
      (
        SELECT COUNT(*)::int
        FROM (
          SELECT "userId"
          FROM "EmailVerificationToken"
          GROUP BY "userId"
          HAVING COUNT(*) > 1
        ) duplicates
      ) AS duplicate_users,
      COUNT(*) FILTER (
        WHERE "consumedAt" IS NULL
        AND "expiresAt" > CURRENT_TIMESTAMP
      )::int AS active_tokens
    FROM "EmailVerificationToken"
  `;

  console.table(result);
  console.log('AUDIT TERMINE - AUCUNE MODIFICATION');
} finally {
  await prisma.$disconnect();
}
