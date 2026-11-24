
import { createHmac, randomInt } from 'node:crypto';

const CODE_TTL_MINUTES = 10;

export function hashEmailCode(
  userId: string,
  code: string,
): string {
  const secret = process.env.EMAIL_CODE_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('EMAIL_CODE_SECRET non configure');
  }

  return createHmac('sha256', secret)
    .update(`${userId}:${code}`, 'utf8')
    .digest('hex');
}

export function generateEmailVerificationCode(
  userId: string,
) {
  const code = randomInt(0, 1_000_000)
    .toString()
    .padStart(6, '0');

  return {
    code,
    codeHash: hashEmailCode(userId, code),
    expiresAt: new Date(
      Date.now() + CODE_TTL_MINUTES * 60_000,
    ),
  };
}
