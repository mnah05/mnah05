export function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${n}`;
}

export function viewsLabel(n: number): string {
  return n === 1 ? "1 view" : `${formatViews(n)} views`;
}

export async function fetchViews(
  slugs: string[],
): Promise<Record<string, number>> {
  const uniqueSlugs = [...new Set(slugs)];
  const views: Record<string, number> = Object.create(null);
  for (let offset = 0; offset < uniqueSlugs.length; offset += 50) {
    const batch = uniqueSlugs.slice(offset, offset + 50);
    const res = await fetch(
      `/api/views?slugs=${encodeURIComponent(batch.join(","))}`,
    );
    if (!res.ok) throw new Error(`views fetch failed: ${res.status}`);
    const data = (await res.json()) as { views?: Record<string, number> };
    for (const slug of batch) {
      const count = data.views?.[slug];
      if (
        typeof count !== "number" ||
        !Number.isSafeInteger(count) ||
        count < 0
      ) {
        throw new Error("Invalid view count");
      }
      views[slug] = count;
    }
  }
  return views;
}
