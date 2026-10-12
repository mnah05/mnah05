import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const key = `viewed:${slug}`;
        let seen: string | null = null;
        try {
          seen = localStorage.getItem(key);
        } catch {
          seen = null;
        }
        if (seen) {
          const res = await fetch(`/api/views/${encodeURIComponent(slug)}`);
          if (!res.ok) return;
          const data = (await res.json()) as { views: number };
          if (!cancelled) setViews(data.views ?? 0);
          return;
        }
        const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, {
          method: "POST",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { views: number };
        if (!cancelled) setViews(data.views ?? 0);
        try {
          localStorage.setItem(key, "1");
        } catch {
          // private mode etc. — server-side dedup still holds
        }
      } catch {
        // best-effort, keep placeholder
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <span className="view-counter" aria-live="polite">
      <span>{views === null ? "—" : views.toLocaleString("en-US")}</span>
      &nbsp;views
    </span>
  );
}
