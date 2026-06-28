# Portfolio — Santiago Gaona Carvajal

Personal portfolio built with Astro, Svelte, and Tailwind CSS.

## Getting started

Use Node 24 from `.nvmrc` before running pnpm commands to avoid engine warnings.

```bash
nvm use
pnpm install
pnpm dev
```

The local site runs at:

```text
http://localhost:4321
```

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local dev server |
| `pnpm build` | Check and build the production site |
| `pnpm astro ...` | Run Astro CLI commands |

For local development, use `pnpm dev`. For production validation, use `pnpm build`; the Vercel adapter does not support `astro preview` for this server output setup.

## Project structure

| Path | Purpose |
| :-- | :-- |
| `src/pages/` | Route entry points |
| `src/components/` | Reusable UI components |
| `src/layouts/` | Page layouts |
| `public/` | Static assets |

## Inspiration

- [Brittany Chiang — GitHub](https://github.com/bchiang7)
- [Brittany Chiang — Website](https://brittanychiang.com/)
