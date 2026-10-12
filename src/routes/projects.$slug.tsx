import { createFileRoute } from "@tanstack/react-router";
import ViewCounter from "../components/ViewCounter";
import { PROJECTS } from "../data/projects";
import "../styles/project.css";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }: { params: { slug: string } }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${project.name} | hasan` },
        { name: "description", content: project.short },
        { property: "og:title", content: `${project.name} | hasan` },
        { property: "og:description", content: project.short },
        {
          property: "og:url",
          content: `https://mnah.dev/projects/${project.slug}`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://mnah.dev/projects/${project.slug}`,
        },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return (
      <main>
        <h1>Not found</h1>
      </main>
    );
  }
  const viewSlug = `projects/${project.slug}`;

  return (
    <main className="project-page">
      <article>
        <h1>{project.name}</h1>
        <div className="project-meta-line">
          <a
            href="https://x.com/mnah05"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mnah05
          </a>
          <span>|</span>
          <span>{project.year}</span>
          <span>|</span>
          <span>
            <ViewCounter slug={viewSlug} />
          </span>
          <span>|</span>
          <span>{project.status.label}</span>
        </div>
        <p className="project-tagline">{project.tagline}</p>
        <p className="status-note">{project.status.note}</p>
        <div className="project-body">
          {project.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <h2>What it does</h2>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight.slice(0, 24)}>{highlight}</li>
            ))}
          </ul>
          <h2>Built with</h2>
          <ul className="project-stack">
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
        <div className="project-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              View live site
            </a>
          )}
          {project.github?.url ? (
            <a
              href={project.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          ) : (
            <a
              href="https://github.com/mnah05"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
        {project.github?.note && (
          <p className="status-note">{project.github.note}</p>
        )}
      </article>
    </main>
  );
}
