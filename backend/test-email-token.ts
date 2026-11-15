import {
  generateEmailVerificationToken,
  hashEmailToken,
} from './src/auth/security/email-token.ts';

import { strict as assert } from 'node:assert';

const a = generateEmailVerificationToken();
const b = generateEmailVerificationToken();

assert.equal(a.token.length, 64);
assert.notEqual(a.token, b.token);
assert.notEqual(a.token, a.tokenHash);
assert.equal(hashEmailToken(a.token), a.tokenHash);

const remaining = a.expiresAt.getTime() - Date.now();

assert.ok(remaining > 29 * 60 * 1000);
assert.ok(remaining <= 30 * 60 * 1000);

console.log('OK : jeton cryptographique');
console.log('OK : jetons differents');
console.log('OK : empreinte SHA-256');
console.log('OK : expiration de 30 minutes');
console.log('TOUS LES TESTS ONT REUSSI');
