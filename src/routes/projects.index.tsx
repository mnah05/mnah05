import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import ProjectCard, { scheduleViewCounts } from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";
import "../styles/home.css";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | hasan" },
      { name: "description", content: "A selection of projects by Hasan" },
      { property: "og:title", content: "Projects | hasan" },
      {
        property: "og:description",
        content: "A selection of projects by Hasan",
      },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="project-card-list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
