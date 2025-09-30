# Telcoin Network Status

Production-ready static roadmap for Telcoin Network. The site is built with Vite, React, TypeScript, and TailwindCSS and deploys to GitHub Pages.

## Getting started

```bash
npm ci
npm run dev
```

Local preview after building:

```bash
npm run build
npm run preview
```

## Data workflow

`status.json` at the repository root is the single source of truth. Validate or update it with the provided tooling:

```bash
npm run validate:status          # schema validation
npm run bump:status -- --phase devnet:in_progress --overall 32 --set meta.lastUpdated=auto
```

Vitest covers the schema to keep future updates safe:

```bash
npm test
```

## Linting & type safety

```bash
npm run lint          # ESLint + Prettier rules
npm run lint:a11y     # JSX accessibility pass
npm run typecheck     # TypeScript strict mode
```

## Deployment

GitHub Actions builds and deploys to Pages on every push to `main` (`.github/workflows/pages.yml`). After the first merge, confirm repository **Settings → Pages → Source** is set to “GitHub Actions” and that GitHub-owned actions are allowed.

## License

MIT © Telcoin
