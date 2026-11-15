import 'dotenv/config';

const variables = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
];

for (const name of variables) {
  const value = process.env[name]?.trim();

  console.log(
    `${name}: ${
      !value || value.startsWith('VOTRE_')
        ? 'NON CONFIGURÉ'
        : 'CONFIGURÉ'
    }`,
  );
}
