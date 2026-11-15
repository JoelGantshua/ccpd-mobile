import { AuthService } from './src/auth/auth.service.ts';

const auth = new AuthService();

const password = 'MotDePasse-Test-2026!';

const hash1 = await auth.hashPassword(password);
const hash2 = await auth.hashPassword(password);

const valid = await auth.verifyPassword(hash1, password);
const invalid = await auth.verifyPassword(
  hash1,
  'MotDePasse-Incorrect!'
);

const checks = {
  algorithmeArgon2id: hash1.startsWith('$argon2id$'),
  motDePasseNonStockeEnClair: hash1 !== password,
  selsDifferents: hash1 !== hash2,
  bonMotDePasseAccepte: valid,
  mauvaisMotDePasseRefuse: !invalid,
};

console.table(checks);

if (Object.values(checks).some(result => !result)) {
  process.exitCode = 1;
}
