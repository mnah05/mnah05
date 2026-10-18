# Agent Guidance

## App and content

- React + TanStack Start on Cloudflare Workers, **not Pages** or a static-only upload: `/api/views` needs the D1 binding `DB`. `README.md`'s “static files” description is incomplete.
- `src/routes/__root.tsx` owns the document shell, shared header/footer, and global styles. File routes feed `src/router.tsx` through generated `src/routeTree.gen.ts`; regenerate with `npm run generate-routes`, never edit the generated tree.
- Notes are compiled from `src/content/notes/*.{md,mdx}` by Vite. Filenames become slugs; `src/lib/notes.ts` silently omits notes without a valid `pubDate`. `/blog` routes redirect to `/notes`.
- Project content lives in `src/data/projects.ts`. The web resume uses `src/data/resume.ts`; its PDF is separately authored in `resume.tex`.

## Commands and verification

- Install with `npm ci`; `npm run dev` serves port 3000. `npm run build` runs route generation, client/server builds, then prerendering; a successful build is not a TypeScript check.
- Run `npm run check` and `npm test` separately. Current typecheck blocker: missing `gray-matter` declarations in `src/lib/notes.ts` (TS7016).
- `npm test` only covers view formatting, not the D1 API. Tests import `.ts` directly from `.mjs`, so use a Node version with native TypeScript support. Focus a test with `node --test --test-name-pattern="singularizes" src/lib/views.test.mjs`.
- `npm run resume:pdf` requires `tectonic` and writes ignored `public/resume.pdf`. Build it before the site build/deploy when the downloadable PDF must be included; deployment does not generate it.

## Deployment

- Production is Worker `domain-page` serving `mnah.dev`, configured in `wrangler.jsonc`. Use project-local Wrangler (this repo already uses it), not a CLI migration.
- `npm run deploy` rebuilds then deploys. To validate packaging first: `npm run build`, then `npx wrangler deploy --dry-run`. Vite redirects Wrangler to generated `dist/server/wrangler.json`; edit root config, not generated output.
- View-count schema is in `migrations/`, bound to existing D1 database `domain-page-views`. Keep the binding and distinguish local from remote database operations; a frontend-only deploy must not recreate or reset it.

## Design constraints

- Keep the React setup, white-only theme, and homepage photo. No dark-mode toggle or system-theme detection.
- Links stay blue, including visited links; hover is darker blue. Shared colors are in `src/styles/global.css`; page-specific link styles must not override this.

## Icons

- Use [Rune Icons](https://www.runeicons.com/icons) as the preferred source when a UI icon is needed.
- Keep reusable SVGs local in `public/icons/`; inline one-off SVGs are fine. Do not add an icon package or font for these.
- Use restrained line icons matching the simple style. Decorative icons use `aria-hidden="true"`; meaningful icons need a label or visible text.
