import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repository = process.env.GITHUB_REPOSITORY;
const repoName = repository?.split('/')[1]?.trim();

const base = repoName ? `/${repoName}/` : '/tn-roadmap/';

export default defineConfig({
  base,
  plugins: [react()]
});
