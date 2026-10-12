// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "../data/projects";
import { getAllNotes } from "../lib/notes";

function buildSitemap(): string {
  const site = "https://mnah.dev";
  const urls: string[] = [
    `${site}/`,
    `${site}/about`,
    `${site}/colophon`,
    `${site}/resume`,
    `${site}/notes`,
    `${site}/projects`,
  ];
  for (const note of getAllNotes()) urls.push(`${site}/notes/${note.slug}`);
  for (const p of PROJECTS) urls.push(`${site}/projects/${p.slug}`);
  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
