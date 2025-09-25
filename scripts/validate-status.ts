import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { statusSchema } from '../src/data/statusSchema';

async function main() {
  const statusPath = resolve(process.cwd(), 'status.json');

  try {
    const fileContents = await readFile(statusPath, 'utf-8');
    const parsed = JSON.parse(fileContents);
    statusSchema.parse(parsed);
    console.log('status.json is valid ✅');
  } catch (error) {
    console.error('status.json validation failed ❌');

    if (error instanceof Error) {
      console.error(error.message);
    }

    if (error && typeof error === 'object' && 'errors' in error) {
      console.error(JSON.stringify((error as { errors: unknown }).errors, null, 2));
    }

    process.exitCode = 1;
  }
}

main();
