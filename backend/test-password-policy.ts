import { AuthService } from './src/auth/auth.service.ts';

const auth = new AuthService();

const tests = [
  { name: 'Mot de passe long', value: 'Une phrase de passe robuste 2026', accepted: true },
  { name: 'Mot de passe court', value: '12345678', accepted: false },
  { name: 'Mot de passe vide', value: '', accepted: false },
  { name: 'Valeur non textuelle', value: 123456789, accepted: false },
  { name: 'Mot de passe trop long', value: 'A'.repeat(129), accepted: false },
];

let failures = 0;

for (const test of tests) {
  let accepted = true;

  try {
    auth.validatePassword(test.value);
  } catch {
    accepted = false;
  }

  const success = accepted === test.accepted;
  if (!success) failures++;

  console.log(`${success ? 'OK' : 'ECHEC'} : ${test.name}`);
}

if (failures > 0) process.exitCode = 1;
