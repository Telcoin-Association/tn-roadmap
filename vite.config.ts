import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasCustomDomain = fs.existsSync(path.resolve(__dirname, 'CNAME'));

const repository = process.env.GITHUB_REPOSITORY;
const repoName = repository?.split('/')[1]?.trim();
const defaultBase = repoName ? `/${repoName}/` : '/tn-roadmap/';

const base = hasCustomDomain ? '/' : defaultBase;

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : base,
  plugins: [react()]
}));
