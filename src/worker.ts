/**
 * View-counter Worker for the static Astro notes.
 *
 * Static assets are served from `dist/` via the ASSETS binding.
 * This Worker only handles `/api/views/*` and falls through to
 * assets for everything else, so the site stays fully static.
 *
 * Views are unique-only: one count per visitor per slug.
 * Uniqueness is enforced server-side via page_viewers(slug, viewer_hash)
 * where viewer_hash = sha256(ip + user-agent). A persistent client-side
 * guard (localStorage) avoids repeat POSTs to stay within D1 write limits.
 *
 * D1 tables (see migrations/):
 *   page_views(slug TEXT PRIMARY KEY, views INTEGER, updated_at TEXT)
 *   page_viewers(slug TEXT, viewer_hash TEXT, PRIMARY KEY(slug, viewer_hash))
 */

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

const SLUG_RE = /^[a-zA-Z0-9._\-/]{1,200}$/;
const MAX_BATCH = 50;
const VIEW_COUNTS_CACHE_CONTROL =
  "public, max-age=60, s-maxage=300, stale-while-revalidate=60";

function json(
  data: unknown,
  status = 200,
  cacheControl = "no-store",
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

function isValidSlug(slug: string | null): slug is string {
  return !!slug && SLUG_RE.test(slug);
}

async function hashViewer(ip: string, userAgent: string): Promise<string> {
  const input = `${ip}|${userAgent}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getViewerIp(request: Request): string | null {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    null
  );
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Legacy /blog URLs now live at /notes.
    if (url.pathname === "/blog" || url.pathname.startsWith("/blog/")) {
      const rest = url.pathname.slice("/blog".length);
      return Response.redirect(
        new URL(`/notes${rest}${url.search}`, url).href,
        301,
      );
    }

    if (!url.pathname.startsWith("/api/views")) {
      return env.ASSETS.fetch(request);
    }

    try {
      // GET /api/views/<slug> -> { slug, views }
      // GET /api/views?slug=<slug> -> { slug, views }
      // GET /api/views?slugs=a,b,c -> { views: { slug: count } } (no increment, for index pages)
      if (request.method === "GET") {
        const batch = url.searchParams.get("slugs");
        if (batch !== null) {
          const cache = await caches.open("view-counts");
          const cached = await cache.match(request);
          if (cached) return cached;

          const slugs = batch
            .split(",")
            .map((s) => s.trim())
            .filter((s) => isValidSlug(s))
            .slice(0, MAX_BATCH);
          if (slugs.length === 0)
            return json({ views: {} }, 200, VIEW_COUNTS_CACHE_CONTROL);
          const placeholders = slugs.map(() => "?").join(",");
          const { results } = await env.DB.prepare(
            `SELECT slug, views FROM page_views WHERE slug IN (${placeholders})`,
          )
            .bind(...slugs)
            .all<{ slug: string; views: number }>();
          const views: Record<string, number> = {};
          for (const s of slugs) views[s] = 0;
          for (const row of results ?? []) views[row.slug] = row.views;
          const response = json({ views }, 200, VIEW_COUNTS_CACHE_CONTROL);
          ctx.waitUntil(cache.put(request, response.clone()));
          return response;
        }

        const parts = url.pathname.split("/").filter(Boolean); // ["api","views",slug?]
        const slug =
          parts.length >= 3
            ? decodeURIComponent(parts.slice(2).join("/"))
            : url.searchParams.get("slug");
        if (!isValidSlug(slug))
          return json({ error: "missing or invalid slug" }, 400);
        const row = await env.DB.prepare(
          "SELECT views FROM page_views WHERE slug = ?",
        )
          .bind(slug)
          .first<{ views: number }>();
        return json({ slug, views: row?.views ?? 0 });
      }

      // POST /api/views/<slug> (or { "slug" } body) -> counts one unique view
      // per visitor and returns { slug, views, counted }
      if (request.method === "POST") {
        let slug: string | null = null;
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length >= 3)
          slug = decodeURIComponent(parts.slice(2).join("/"));
        if (!isValidSlug(slug)) {
          try {
            const body = (await request.json()) as { slug?: string };
            slug = body?.slug ?? null;
          } catch {
            // ignore JSON parse errors, handled below
          }
        }
        if (!isValidSlug(slug))
          return json({ error: "missing or invalid slug" }, 400);

        // Unique-only: dedup by hashed visitor identity. No raw IP/UA stored.
        const ip = getViewerIp(request);
        const userAgent = request.headers.get("User-Agent") ?? "";
        if (ip) {
          const viewerHash = await hashViewer(ip, userAgent);
          await env.DB.prepare(
            "INSERT OR IGNORE INTO page_views (slug, views) VALUES (?, 0)",
          )
            .bind(slug)
            .run();
          const viewerInsert = await env.DB.prepare(
            "INSERT OR IGNORE INTO page_viewers (slug, viewer_hash) VALUES (?, ?)",
          )
            .bind(slug, viewerHash)
            .run();
          let counted = (viewerInsert.meta.changes ?? 0) > 0;
          if (counted) {
            await env.DB.prepare(
              `UPDATE page_views SET views = views + 1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
							 WHERE slug = ?`,
            )
              .bind(slug)
              .run();
          }
          const row = await env.DB.prepare(
            "SELECT views FROM page_views WHERE slug = ?",
          )
            .bind(slug)
            .first<{ views: number }>();
          return json({
            slug,
            views: row?.views ?? (counted ? 1 : 0),
            counted,
          });
        }

        // Local dev / no IP available: fall back to plain increment.
        await env.DB.prepare(
          `INSERT INTO page_views (slug, views) VALUES (?, 1)
					 ON CONFLICT(slug) DO UPDATE SET views = views + 1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
        )
          .bind(slug)
          .run();
        const row = await env.DB.prepare(
          "SELECT views FROM page_views WHERE slug = ?",
        )
          .bind(slug)
          .first<{ views: number }>();
        return json({ slug, views: row?.views ?? 1, counted: true });
      }

      return json({ error: "method not allowed" }, 405);
    } catch (err) {
      console.error("views API error:", err);
      return json({ error: "internal error" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
