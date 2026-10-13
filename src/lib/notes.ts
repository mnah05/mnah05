import matter from "gray-matter";
import type { ComponentType } from "react";

export type NoteMeta = {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
};

const rawModules = import.meta.glob<unknown>("../content/notes/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

const componentModules = import.meta.glob<{ default: ComponentType<any> }>(
  "../content/notes/*.{md,mdx}",
  { eager: true },
);

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.(md|mdx)$/, "");
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (
    value &&
    typeof value === "object" &&
    "default" in value &&
    typeof (value as { default: unknown }).default === "string"
  ) {
    return (value as { default: string }).default;
  }
  return String(value ?? "");
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  try {
    const { data } = matter(raw);
    if (data && typeof data === "object") return data as Record<string, unknown>;
  } catch {
    // fall through to tiny parser
  }
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  const data: Record<string, unknown> = {};
  if (!match) return data;
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key) data[key] = val;
  }
  return data;
}

function pathForSlug(slug: string): string | undefined {
  return Object.keys(rawModules).find((p) => slugFromPath(p) === slug);
}

function parseDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value;
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export function getAllNotes(): NoteMeta[] {
  const notes: NoteMeta[] = [];
  for (const [path, rawValue] of Object.entries(rawModules)) {
    const slug = slugFromPath(path);
    const raw = asString(rawValue);
    const data = parseFrontmatter(raw);
    const pubDate = parseDate(data.pubDate);
    // Do not turn missing metadata into the misleading Unix epoch (1970).
    if (!pubDate) continue;
    notes.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      pubDate,
      updatedDate: data.updatedDate
        ? new Date(String(data.updatedDate))
        : undefined,
      heroImage: data.heroImage ? String(data.heroImage) : undefined,
    });
  }
  return notes.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

export function getNoteMeta(slug: string): NoteMeta | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

export function getNoteSlugs(): string[] {
  return getAllNotes().map((n) => n.slug);
}

export function getNoteComponent(slug: string): ComponentType<any> | undefined {
  const path = pathForSlug(slug);
  if (!path) return undefined;
  const direct = componentModules[path]?.default;
  if (direct) return direct;
  // Fallback: match by slug in case glob keys differ between raw/component
  for (const [p, mod] of Object.entries(componentModules)) {
    if (slugFromPath(p) === slug) return mod?.default;
  }
  return undefined;
}
