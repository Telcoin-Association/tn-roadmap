import fs from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repository = process.env.GITHUB_REPOSITORY;
const repoName = repository?.split('/')[1]?.trim();
const hasCustomDomain = fs.existsSync(new URL('./CNAME', import.meta.url));
const base = hasCustomDomain ? '/' : repoName ? `/${repoName}/` : '/';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : base,
  plugins: [react()]
}));
