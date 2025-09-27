import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/smoke.spec.mjs'],
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'off'
  },
  reporter: [['list']]
});
