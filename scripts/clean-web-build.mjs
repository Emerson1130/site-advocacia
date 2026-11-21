import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// React Router/Vite retains old hashed assets and prerendered HTML otherwise.
await rm(path.join(repositoryRoot, 'dist/apps/web'), { recursive: true, force: true });
