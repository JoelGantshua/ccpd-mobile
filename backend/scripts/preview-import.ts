import { readdir, readFile, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { createHash } from 'node:crypto';

const root = join(process.cwd(), 'uploads', 'a-importer');

const categories = [
  { folder: 'documents', type: 'DOCUMENT' },
  { folder: 'doctrines', type: 'DOCTRINE' },
] as const;

const maxSize = 10 * 1024 * 1024;
const hashes = new Map<string, string>();
let valid = 0;
let invalid = 0;

for (const category of categories) {
  const folder = join(root, category.folder);
  const files = (await readdir(folder))
    .filter((name) => name.toLowerCase().endsWith('.pdf'))
    .sort();

  console.log(`\n=== ${category.type} : ${files.length} PDF ===`);

  for (const fileName of files) {
    const path = join(folder, fileName);
    const info = await stat(path);

    let problem = '';

    if (!info.isFile() || info.size === 0 || info.size > maxSize) {
      problem = 'Taille ou fichier invalide';
    } else {
      const buffer = await readFile(path);

      const header = buffer.subarray(0, 5).toString('ascii');
      const tail = buffer.subarray(-1024).toString('latin1');

      if (header !== '%PDF-' || !tail.includes('%%EOF')) {
        problem = 'Structure PDF à vérifier';
      } else {
        const hash = createHash('sha256')
          .update(buffer)
          .digest('hex');

        if (hashes.has(hash)) {
          problem = `Doublon de ${hashes.get(hash)}`;
        } else {
          hashes.set(hash, fileName);
        }
      }
    }

    const title = parse(fileName).name
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200);

    if (problem) {
      invalid++;
      console.log(`[À VÉRIFIER] ${fileName} — ${problem}`);
    } else {
      valid++;
      console.log(`[OK] ${title}`);
    }
  }
}

console.log('\n=== BILAN ===');
console.log(`PDF valides : ${valid}`);
console.log(`PDF à vérifier : ${invalid}`);
console.log('Aucun fichier modifié.');
console.log('Aucune écriture dans Neon.');
