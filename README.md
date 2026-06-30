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

| Command            | Action                                                 |
| :----------------- | :----------------------------------------------------- |
| `pnpm install`     | Install dependencies                                   |
| `pnpm dev`         | Start the local dev server                             |
| `pnpm generate:cv` | Regenerate `public/cv.pdf` from typed CV source data   |
| `pnpm verify:cv`   | Verify the generated PDF contract                      |
| `pnpm build`       | Generate, verify, check, and build the production site |
| `pnpm astro ...`   | Run Astro CLI commands                                 |

For local development, use `pnpm dev`. For production validation, use `pnpm build`; the Vercel adapter does not support `astro preview` for this server output setup. The build command regenerates and verifies the CV before running Astro checks and the production build.

## CV generation

The public CV remains available at `/cv.pdf`, backed by the generated file in `public/cv.pdf`.

To update the CV:

1. Edit the Spanish CV source in `src/cv/data.ts`.
2. Run `pnpm generate:cv`.
3. Run `pnpm verify:cv` to confirm `public/cv.pdf` exists, is non-empty, has a valid PDF header, uses US Letter MediaBox dimensions, and contains exactly one detected page.
4. Run `pnpm build` to verify generation, the PDF contract, Astro checks, and the static `/cv.pdf` integration.

The generator lives in `scripts/generate-cv.ts` and is the only place that imports `jspdf`; the PDF verification gate lives in `scripts/verify-cv.ts` and uses only Node filesystem and buffer APIs. The PDF library is not used by Astro, Svelte, or client/runtime code. CV-only Inter font assets from the official `rsms/inter` release are stored under `scripts/cv-assets/fonts/inter` and embedded by the generator.

Rollback is a normal git revert of the generator, CV data/types, dependency and lockfile changes, README notes, and `public/cv.pdf`. Reverting those files restores the previous static PDF behavior at the same `/cv.pdf` URL.

## Project structure

| Path              | Purpose                |
| :---------------- | :--------------------- |
| `src/pages/`      | Route entry points     |
| `src/components/` | Reusable UI components |
| `src/layouts/`    | Page layouts           |
| `public/`         | Static assets          |

## Inspiration

- [Brittany Chiang — GitHub](https://github.com/bchiang7)
- [Brittany Chiang — Website](https://brittanychiang.com/)
