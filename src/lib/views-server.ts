export const SLUG_RE = /^[a-zA-Z0-9._\-/]{1,200}$/;
export const MAX_BATCH = 50;

export function isValidSlug(slug: string | null): slug is string {
  return !!slug && SLUG_RE.test(slug);
}

export function decodeSlug(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export async function hashViewer(ip: string, userAgent: string): Promise<string> {
  const input = `${ip}|${userAgent}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getViewerIp(request: Request): string | null {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    null
  );
}

function getDB(cloudflareEnv: Record<string, unknown>): D1Database {
  const db = cloudflareEnv.DB as D1Database | undefined;
  if (!db) throw new Error("missing D1 binding DB");
  return db;
}

export async function getBatchViews(
  db: D1Database,
  slugs: string[],
): Promise<Record<string, number>> {
  const clean = slugs
    .map((s) => s.trim())
    .filter((s) => isValidSlug(s))
    .slice(0, MAX_BATCH);
  const views: Record<string, number> = {};
  for (const s of clean) views[s] = 0;
  if (clean.length === 0) return views;
  const placeholders = clean.map(() => "?").join(",");
  const { results } = await db
    .prepare(`SELECT slug, views FROM page_views WHERE slug IN (${placeholders})`)
    .bind(...clean)
    .all<{ slug: string; views: number }>();
  for (const row of results ?? []) views[row.slug] = row.views;
  return views;
}

export async function getSingleViews(
  db: D1Database,
  slug: string,
): Promise<number> {
  const row = await db
    .prepare("SELECT views FROM page_views WHERE slug = ?")
    .bind(slug)
    .first<{ views: number }>();
  return row?.views ?? 0;
}

export async function recordView(
  db: D1Database,
  slug: string,
  request: Request,
): Promise<{ views: number; counted: boolean }> {
  const ip = getViewerIp(request);
  const userAgent = request.headers.get("User-Agent") ?? "";
  if (ip) {
    const viewerHash = await hashViewer(ip, userAgent);
    await db
      .prepare("INSERT OR IGNORE INTO page_views (slug, views) VALUES (?, 0)")
      .bind(slug)
      .run();
    const viewerInsert = await db
      .prepare(
        "INSERT OR IGNORE INTO page_viewers (slug, viewer_hash) VALUES (?, ?)",
      )
      .bind(slug, viewerHash)
      .run();
    const counted = (viewerInsert.meta.changes ?? 0) > 0;
    if (counted) {
      await db
        .prepare(
          `UPDATE page_views SET views = views + 1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE slug = ?`,
        )
        .bind(slug)
        .run();
    }
    const row = await db
      .prepare("SELECT views FROM page_views WHERE slug = ?")
      .bind(slug)
      .first<{ views: number }>();
    return { views: row?.views ?? (counted ? 1 : 0), counted };
  }

  await db
    .prepare(
      `INSERT INTO page_views (slug, views) VALUES (?, 1)
       ON CONFLICT(slug) DO UPDATE SET views = views + 1, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
    )
    .bind(slug)
    .run();
  const row = await db
    .prepare("SELECT views FROM page_views WHERE slug = ?")
    .bind(slug)
    .first<{ views: number }>();
  return { views: row?.views ?? 1, counted: true };
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export { getDB };
