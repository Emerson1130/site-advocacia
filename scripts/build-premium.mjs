import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const result = spawnSync('npm', ['run', 'build'], {
  cwd: repositoryRoot,
  env: {
    ...process.env,
    STATIC_HOSTING: '1',
    VITE_STATIC_HOSTING: '1',
    SITE_ORIGIN: 'https://advogadaelisianeromualdo.com',
  },
  stdio: 'inherit',
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

await import('./prepare-premium.mjs');
