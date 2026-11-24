
import { createHash, randomBytes } from 'node:crypto';

const TOKEN_TTL_MINUTES = 30;

export function hashEmailToken(token: string): string {
  return createHash('sha256')
    .update(token, 'utf8')
    .digest('hex');
}

export function generateEmailVerificationToken() {
  const token = randomBytes(32).toString('hex');

  return {
    token,
    tokenHash: hashEmailToken(token),
    expiresAt: new Date(
      Date.now() + TOKEN_TTL_MINUTES * 60 * 1000,
    ),
  };
}
