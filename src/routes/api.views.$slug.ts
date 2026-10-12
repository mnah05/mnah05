// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import {
  decodeSlug,
  getSingleViews,
  isValidSlug,
  json,
  recordView,
} from "../lib/views-server";

async function getDB(context: any): Promise<D1Database | undefined> {
  const fromCtx =
    context?.cloudflare?.env?.DB ?? context?.env?.DB ?? context?.DB;
  if (fromCtx) return fromCtx as D1Database;
  try {
    const cf = (await import("cloudflare:workers")) as unknown as {
      env?: Record<string, unknown>;
    };
    return cf?.env?.DB as D1Database | undefined;
  } catch {
    return undefined;
  }
}

export const Route = createFileRoute("/api/views/$slug")({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        try {
          const db = await getDB(context);
          if (!db) return json({ error: "missing DB binding" }, 500);
          const raw = (params as { slug?: string }).slug ?? "";
          const slug = decodeSlug(raw);
          if (!isValidSlug(slug))
            return json({ error: "missing or invalid slug" }, 400);
          const views = await getSingleViews(db, slug);
          return json({ slug, views });
        } catch (err) {
          console.error("views API error:", err);
          return json({ error: "internal error" }, 500);
        }
      },
      POST: async ({ request, params, context }) => {
        try {
          const db = await getDB(context);
          if (!db) return json({ error: "missing DB binding" }, 500);
          const raw = (params as { slug?: string }).slug ?? "";
          let slug = decodeSlug(raw);
          if (!isValidSlug(slug)) {
            try {
              const body = (await request.json()) as { slug?: string };
              slug = body?.slug ?? null;
            } catch {
              // handled below
            }
          }
          if (!isValidSlug(slug))
            return json({ error: "missing or invalid slug" }, 400);
          const { views, counted } = await recordView(db, slug, request);
          return json({ slug, views, counted });
        } catch (err) {
          console.error("views API error:", err);
          return json({ error: "internal error" }, 500);
        }
      },
    },
  },
});
