# Astro → React + TypeScript Migration Plan

> Target: `Vite + React 18+ + TypeScript (strict) + React Router + MDX`, static pre-rendered output to `dist/`, deployed via existing Cloudflare Worker (`src/worker.ts` + D1).
> Source inventory date: 2026-10-09. Site: `https://mnah.dev`.

## 1. Goals / Non-goals

### Goals

- Replace all 9 Astro routes and 7 `.astro` components with typed React (`.tsx`) equivalents, no behavior/URL regression.
- Keep `output: static` semantics: every route ships as pre-rendered HTML in `dist/` (SEO parity with Astro).
- All new + ported code in TypeScript (`strict`, `noUncheckedIndexedAccess` recommended). No plain `.jsx`/`.js` except generated output.
- Preserve: Cloudflare Worker view-counter API (`GET/POST /api/views`), D1 schema/migrations, `/blog/* → /notes/*` 301s, sitemap + `robots.txt`, resume PDF pipeline, theme handling, view-counter dedup semantics.

### Non-goals

- No URL restructuring. No new CMS. No SSR streaming / server components.
- No change to D1 tables (`page_views`, `page_viewers`) or Wrangler `account_id` / `database_id`.
- No icon-system change (keep local Rune SVGs per `AGENTS.md`).

## 2. Target stack (TypeScript-first)

| Concern | Choice | Notes |
|---|---|---|
| Build | `vite@6+`, `@vitejs/plugin-react` | Replaces `astro build` |
| UI | `react`, `react-dom`, `react-router-dom@6+` (`createBrowserRouter` or `<Routes>`) | File → route mapping in §4 |
| Markdown | `@mdx-js/rollup`, `gray-matter`, `reading-time` optional, `zod` for frontmatter | Replaces `astro:content` + `glob` loader |
| SEO/head | `react-helmet-async` | Replaces `BaseLayout` `<head>` props |
| Sitemap | `vite-plugin-sitemap` or `scripts/build-sitemap.ts` (runs on `postbuild`) | Replaces `@astrojs/sitemap`; must emit `sitemap-index.xml` to match `robots.txt` |
| Prerender | `scripts/prerender.tsx` using `react-dom/server` `renderToString` per route | Replaces Astro static output; required for SEO parity |
| Checks | `tsc --noEmit`, `prettier`, existing `node --test src/scripts/views.test.mjs` | Keep `npm run check` / `test` |
| Deploy | Unchanged: `wrangler deploy`, `assets.directory: dist`, `main: src/worker.ts` | Only `build.command` changes |

Minimum `package.json` scripts after migration:

```json
{
  "scripts": {
    "dev": "wrangler d1 migrations apply domain-page-views --local && vite",
    "build": "tsc --noEmit && vite build && tsx scripts/prerender.tsx && tsx scripts/build-sitemap.ts",
    "preview": "vite preview",
    "worker:dev": "wrangler dev",
    "check": "tsc --noEmit",
    "test": "node --test src/scripts/views.test.mts"
  }
}
```

## 3. Current inventory (source of truth)

Routes (9):

- `/` ← `src/pages/index.astro` (PROJECTS cards + notes index list + batch views script)
- `/projects` ← `src/pages/projects/index.astro`
- `/projects/:slug` ← `src/pages/projects/[slug].astro` (`getStaticPaths` from `PROJECTS`, 4 slugs: `envitoo, go-analytics, tripnest, nexus`)
- `/notes` ← `src/pages/notes/index.astro` (currently dirty in worktree: table layout `#/Note/About/Date/Views`)
- `/notes/:slug` ← `src/pages/notes/[slug].astro` (`getCollection("notes")` + `render(post)`, 2 notes: `hello-world`, `sockets-in-db`)
- `/about`, `/colophon` ← static via `NotesLayout`
- `/resume` ← `src/pages/resume.astro` (data `src/data/resume.ts`, print button)
- `404` ← `src/pages/404.astro` (`noindex`)

Shared:

- `src/layouts/BaseLayout.astro` → canonical/OG/Twitter/meta, theme pre-paint script, Cloudflare beacon.
- Components: `Header` (nav + theme toggle), `Footer`, `ProjectCard` (`<dialog>` + `data-view-count`), `NotesLayout`, `ViewCounter` (`GET/POST /api/views/:slug` + `localStorage viewed:<slug>`), `FormattedDate`, `Icon` (`arrow-left|download|external|print`).
- Content: `src/content.config.ts` (zod: `title, description, pubDate: coerce.date, updatedDate?, heroImage?`), `src/content/notes/*.md`.
- Logic to keep: `src/data/projects.ts` (`Project`, `PROJECTS`, `getProjectBySlug`), `src/data/resume.ts`, `src/scripts/views.ts` (`formatViews`, `viewsLabel`, `fetchViews` batch-50), `src/worker.ts` (assets passthrough, views API, blog redirect).
- Styles (reuse as-is): `global, header, footer, home, project, notes-post, resume, not-found` (+ orphaned `notes-index.css` — decide keep/delete in Phase 1).
- Public (preserve paths): `favicon.svg`, `robots.txt`, `fonts/*` (4 files), `backgrounds/*` (8 files), `resume.pdf` (gitignored, built by `scripts/build-resume.sh` via tectonic).

## 4. Route + file mapping (Astro → React TS)

| URL | Astro source | React destination | Data source |
|---|---|---|---|
| `/` | `pages/index.astro` | `src/routes/HomePage.tsx` | `PROJECTS` + `src/content/notes/*` |
| `/projects` | `pages/projects/index.astro` | `src/routes/ProjectsPage.tsx` | `PROJECTS` |
| `/projects/:slug` | `pages/projects/[slug].astro` | `src/routes/ProjectDetailPage.tsx` | `getProjectBySlug(slug)`; unknown slug → `NotFoundPage` |
| `/notes` | `pages/notes/index.astro` | `src/routes/NotesPage.tsx` | notes collection |
| `/notes/:slug` | `pages/notes/[slug].astro` | `src/routes/NoteDetailPage.tsx` | `getNoteBySlug(slug)`; unknown → `NotFoundPage` |
| `/about` | `pages/about.astro` | `src/routes/AboutPage.tsx` (via `NotesLayout`) | static + hardcoded dates |
| `/colophon` | `pages/colophon.astro` | `src/routes/ColophonPage.tsx` | static |
| `/resume` | `pages/resume.astro` | `src/routes/ResumePage.tsx` | `src/data/resume.ts` |
| `*` | `pages/404.astro` | `src/routes/NotFoundPage.tsx` (`noindex`) | static |

New shell:

- `index.html` → `#root`, `/src/main.tsx`
- `src/main.tsx` → `StrictMode` + `HelmetProvider` + `RouterProvider`
- `src/App.tsx` → route tree + `BaseLayout` outlet
- `src/app/router.tsx` → typed route definitions + `prerenderPaths` export (single source for prerender + sitemap)
- `src/components/*.tsx` → `BaseLayout, Header, Footer, ProjectCard, NotesLayout, ViewCounter, FormattedDate, Icon`
- `src/content/notes.ts` → typed loader (see §5)
- `src/hooks/useViewCounts.ts`, `src/hooks/useViewCounter.ts` → replace inline Astro `<script>` blocks
- `scripts/prerender.tsx`, `scripts/build-sitemap.ts` → typed Node scripts (`tsx` runner)

## 5. TypeScript design (key types)

```ts
// src/content/notes.ts
import { z } from "zod";

export const NoteFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
});
export type NoteFrontmatter = z.infer<typeof NoteFrontmatterSchema>;

export type NoteMeta = NoteFrontmatter & { slug: string };
export type NoteModule = { meta: NoteMeta; Component: React.ComponentType };

// views API (mirrors src/worker.ts)
export type ViewsMap = Record<string, number>;
export type SingleViewResponse = { slug: string; views: number };
export type CountedViewResponse = SingleViewResponse & { counted: boolean };
export type BatchViewsResponse = { views: ViewsMap };
```

Rules:

- `tsconfig.json`: drop `extends: astro/tsconfigs/strict`; use `bundler` module resolution, `strict: true`, `noUncheckedIndexedAccess: true`, `verbatimModuleSyntax`, `erasableSyntaxOnly` (if TS 5.8+), `types: ["vite/client", "node"]`.
- Props for all components explicitly typed (`BaseLayoutProps`, `ProjectCardProps { project: Project }`, `ViewCounterProps { slug: string }`, etc.).
- Content loader validates every note with `NoteFrontmatterSchema.parse`; build fails loudly on invalid frontmatter.
- Convert `src/scripts/views.ts` → keep, but add types above; convert `views.test.mjs` → `views.test.mts` with typed mocks.

## 6. Detailed phases

### Phase 0 — Freeze + baseline (0.5 day)

- [ ] Commit/stash current dirty `src/pages/notes/index.astro` table change (decide: keep new table UX in React port).
- [ ] Record baseline: `npm run build`, snapshot `dist/` file list + 9 URLs' HTML titles/meta, `robots.txt`, `sitemap-index.xml`.
- [ ] Decide orphaned `src/styles/notes-index.css`: delete or wire into `NotesPage`.
- Acceptance: baseline checklist saved in PR description.

### Phase 1 — Scaffold Vite + TS + Router (0.5–1 day)

- [ ] `npm rm astro @astrojs/mdx @astrojs/sitemap`; `npm i react react-dom react-router-dom react-helmet-async`; `npm i -D typescript vite @vitejs/plugin-react @mdx-js/rollup gray-matter zod tsx @types/react @types/react-dom vite-plugin-sitemap`.
- [ ] Add `index.html`, `vite.config.ts` (react + mdx plugins, `assetsInclude`, `publicDir: public`), new `tsconfig.json` (+ `tsconfig.node.json` for scripts), `src/vite-env.d.ts`.
- [ ] Add `src/main.tsx`, `src/App.tsx`, `src/app/router.tsx` with placeholder routes for all 9 URLs.
- [ ] Keep `wrangler.jsonc` as-is except verify `build.command: npm run build` still outputs `dist/`.
- Acceptance: `npm run dev` renders placeholder nav for all routes; `tsc --noEmit` clean.

### Phase 2 — Port shell components (1–2 days)

- [ ] `BaseLayout.astro` → `BaseLayout.tsx`: props `{ title: string; description: string; path: string; image?: string; noindex?: boolean }`; canonical = `new URL(path, "https://mnah.dev")`; `Helmet` tags mirror current OG/Twitter/`theme-color`; pre-paint theme inline `<script>` via `dangerouslySetInnerHTML`; Cloudflare beacon script.
- [ ] `Header/Footer/FormattedDate/Icon` → `.tsx` with identical markup/classes; theme toggle logic → `useTheme.ts` hook (`localStorage` + `matchMedia` + `data-theme`).
- [ ] Import `global.css/header.css/footer.css` once in `BaseLayout`.
- Acceptance: shell renders pixel-equivalent header/footer on every route; theme toggle + no-flash preserved.

### Phase 3 — Content layer (1 day)

- [ ] Implement `src/content/notes.ts`: `import.meta.glob("../content/notes/*.{md,mdx}", { eager: true })` (or file-based MDX imports), `gray-matter` parse, `NoteFrontmatterSchema` validation, sorted-by-`pubDate`-desc `getAllNotes()`, `getNoteBySlug()`.
- [ ] Move notes to `src/content/notes/` unchanged; MDX components map (`mark.hl-*`, code fences) preserved.
- [ ] `NotesLayout.astro` → `NotesLayout.tsx` (props typed, wraps `BaseLayout`, renders meta line + `ViewCounter` + hero image + `<Outlet/>`/children).
- Acceptance: `getAllNotes()` returns 2 notes typed; invalid frontmatter fails build.

### Phase 4 — Port pages + interactions (2 days)

- [ ] `HomePage/ProjectsPage/NotesPage`: replicate sorting/grouping; replace Astro `define:vars` batch scripts with `useViewCounts(slugs: string[])` hook calling `fetchViews()`; render `data-view-count` spans; handle loading (`—`) + error (leave `—`).
- [ ] `ProjectCard.astro` → `ProjectCard.tsx`: `<dialog>` open/close via `useRef<HTMLDialogElement>` (no global delegation); keep `data-view-count="projects/<slug>"`.
- [ ] `ProjectDetailPage/NoteDetailPage`: `useParams()` + lookup; missing → `<NotFoundPage/>`; note detail renders MDX `Component`.
- [ ] `ResumePage`: render from `src/data/resume.ts`; print button `onClick={() => window.print()}`; keep `/resume.pdf` link.
- [ ] About/Colophon: hardcode content as TSX (or MDX) via `NotesLayout`.
- Acceptance: all lists sort identically to Astro; dialogs, print, dates match.

### Phase 5 — View-counter hooks (0.5 day)

- [ ] `useViewCounts(slugs)` → `fetchViews` (batch ≤50), `Intl.NumberFormat("en-US")`, `requestIdleCallback` fallback `setTimeout`, best-effort catch.
- [ ] `useViewCounter(slug)` → mirrors `ViewCounter.astro`: `localStorage viewed:<slug>` guard → `GET` if seen else `POST /api/views/<slug>` → set count → persist; on fetch error hide element (match current `el.remove()`).
- [ ] Keep `formatViews`/`viewsLabel` exports (currently `formatViews` imported but unused in `ViewCounter` — use it or remove import deliberately).
- Acceptance: existing `views.test` (ported to `.mts`) passes; manual check against local D1.

### Phase 6 — Prerender + sitemap + robots (1 day)

- [ ] `scripts/prerender.tsx`: import `prerenderPaths` from router (must include `/`, `/projects`, `/projects/<each-slug>`, `/notes`, `/notes/<each-slug>`, `/about`, `/colophon`, `/resume`, `/404`); `renderToString(<StaticRouter location>…)` or `react-router-dom/server` `StaticRouter`; write `dist/<path>/index.html`; copy `404` to `dist/404.html` (Worker `ASSETS` fallback).
- [ ] `scripts/build-sitemap.ts`: emit `sitemap-index.xml` + `sitemap-0.xml` matching current `@astrojs/sitemap` URLs; verify `public/robots.txt` reference stays valid.
- [ ] Preserve `/blog/* → /notes/*` 301 in `src/worker.ts` (no change needed) + add client-side fallback route `/blog/*` → `<Navigate to="/notes/…">` for SPA navigations.
- Acceptance: `npm run build` outputs static HTML per route with correct `<title>`/meta; `robots.txt` + sitemap fetch 200.

### Phase 7 — Config cleanup + verification (0.5–1 day)

- [ ] Delete `astro.config.mjs`, `.astro/`, all `*.astro`, `src/content.config.ts`; remove `astro` from `tsconfig`/`package.json`.
- [ ] Update `README.md` (dev/build commands), `.github/workflows` if it calls `astro` directly (currently calls `npm ci` + `wrangler deploy`, so likely no change except build is via wrangler `build.command`).
- [ ] Full check: `npm run check`, `npm test`, `npm run build`, `wrangler dev` → click through 9 routes, view counts, dialogs, print, theme, 404, `/blog/hi` redirect, mobile table (`col-about` hidden ≤640px).
- Acceptance: zero `.astro` references (`grep -r "astro" src vite.config.ts package.json` clean except changelog); deploy preview green.

## 7. Risks / mitigations

- SEO regression (SPA without prerender) → mandatory Phase 6 prerender; verify HTML snapshot diff vs Astro baseline.
- `import.meta.glob` + MDX build breakage → Phase 3 isolated; keep notes as plain MD first, enable MDX plugins incrementally.
- View-count double-fire in `StrictMode` → guard `POST` with `localStorage` + `AbortController`/ref dedup in hooks.
- Dialog `<dialog>` + React 18 `showModal` quirks → use callback refs + `useEffect` cleanup.
- Sitemap URL drift → snapshot current `sitemap-index.xml` in Phase 0 and diff in Phase 6.

## 8. Verification checklist (run before merge)

- [ ] `npm run check` clean (TS strict)
- [ ] `npm test` green
- [ ] `npm run build` emits `dist/` with 9+ static HTML entries
- [ ] Manual: `/`, `/projects`, `/projects/envitoo`, `/notes`, `/notes/hello-world`, `/about`, `/colophon`, `/resume`, `/nope` (404), `/blog/hello-world` (301)
- [ ] View counts load on index pages; single-post `POST` counts once per visitor
- [ ] `robots.txt`, `sitemap-index.xml`, `favicon.svg`, fonts, `resume.pdf` all 200
- [ ] `wrangler deploy` preview green (CI)

## 9. Estimate

~6–8 days solo (phases overlapable: 2 + 4 can parallelize after router scaffold).
