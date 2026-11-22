import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PROJECTS } from "../data/projects";
import { scheduleViewCounts } from "../components/ProjectCard";
import "../styles/projects-index.css";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Hasan" },
      { name: "description", content: "Things I built to understand how systems work." },
      { property: "og:title", content: "Projects — Hasan" },
      { property: "og:description", content: "Systems projects, design notes, and lessons from the build." },
      { property: "og:url", content: "https://mnah.dev/projects" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const projects = [...PROJECTS].sort((a, b) => b.year - a.year);
  const viewSlugs = projects.map((project) => `projects/${project.slug}`);

  useEffect(() => {
    scheduleViewCounts(viewSlugs);
  }, []);

  return (
    <main className="projects-page mx-auto w-full max-w-5xl px-6 pb-20 pt-8 sm:pt-12">
      <div className="typewriter-masthead"><span>PROJECT INDEX</span><span>FILE 01 — {projects.length} ENTRIES</span></div>
      <header className="projects-intro">
        <p className="home-kicker">WORK / BUILDS / EXPERIMENTS</p>
        <h1>Things I made to find out how they work.</h1>
        <p>Backend systems, developer tools, and experiments. Each entry opens into the decisions, constraints, and results behind the build.</p>
        <Link to="/">← back to the beginning</Link>
      </header>

      <div className="projects-index-list">
        {projects.map((project, index) => (
          <article className="projects-entry" id={project.slug} key={project.slug}>
            <div className="projects-entry-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="projects-entry-content">
              <div className="projects-entry-meta"><span>{project.year}</span><span>{project.status.label}</span><span data-view-count={`projects/${project.slug}`}>— views</span></div>
              <h2><a href={`#${project.slug}`}>{project.name}</a></h2>
              <p className="projects-entry-tagline">{project.tagline}</p>
              <div className="projects-tech">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
              <details className="projects-build-notes">
                <summary>Open build notes <span>+</span></summary>
                <div className="projects-detail-copy">
                  {project.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <h3>What came out of it</h3>
                  <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  <p className="projects-status-note">{project.status.note}</p>
                  <div className="projects-entry-links">
                    {project.github?.url && <a href={project.github.url} target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a>}
                    <Link to="/projects/$slug" params={{ slug: project.slug }}>Full project page ↗</Link>
                  </div>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
