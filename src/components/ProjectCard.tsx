import { Link } from "@tanstack/react-router";
import type { Project } from "../data/projects";

export async function paintViewCounts(slugs: string[]) {
  if (slugs.length === 0) return;
  const { fetchViews } = await import("../lib/views");
  try {
    const views = await fetchViews(slugs);
    for (const [slug, count] of Object.entries(views)) {
      document
        .querySelectorAll(`[data-view-count="${CSS.escape(slug)}"]`)
        .forEach((el) => {
          el.textContent = count.toLocaleString("en-US");
        });
    }
  } catch {
    /* views are best-effort */
  }
}

export function scheduleViewCounts(slugs: string[]) {
  const load = () => paintViewCounts(slugs);
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(load, { timeout: 1500 });
  } else {
    setTimeout(load, 0);
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-item">
      <Link
        className="project-item-trigger"
        to="/projects/$slug"
        params={{ slug: project.slug }}
      >
        <span className="project-item-year">{project.year}</span>
        <span className="project-item-name">{project.name}</span>
        <span
          className={`project-status${project.status.tone === "live" ? " live" : ""}`}
        >
          {project.status.label}
        </span>
        <span
          className="project-item-views"
          data-view-count={`projects/${project.slug}`}
        >
          —
        </span>
      </Link>
    </article>
  );
}
