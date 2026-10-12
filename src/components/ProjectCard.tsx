import { useRef } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <article className="project-item">
      <button
        className="project-item-trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={open}
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
      </button>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={`${project.slug}-title`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="project-dialog-topline">
          <span
            className={`project-status${project.status.tone === "live" ? " live" : ""}`}
          >
            {project.status.label}
          </span>
          <button
            className="project-dialog-close"
            type="button"
            onClick={close}
            aria-label={`Close ${project.name} details`}
          >
            Close
          </button>
        </div>
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p className="project-dialog-tagline">{project.tagline}</p>
        <p>{project.status.note}</p>
        <div className="project-dialog-section">
          <h3>About</h3>
          {project.summary.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="project-dialog-section">
          <h3>Built with</h3>
          <ul>
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
        <div className="project-dialog-actions">
          <Link to="/projects/$slug" params={{ slug: project.slug }}>
            Project details
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              View live site
            </a>
          )}
          {project.github?.url && (
            <a
              href={project.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </dialog>
    </article>
  );
}
