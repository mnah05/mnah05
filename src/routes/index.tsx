import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import ProjectCard, { scheduleViewCounts } from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";
import { getAllNotes } from "../lib/notes";
import "../styles/home.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "hasan" },
      {
        name: "description",
        content:
          "The personal website of Md Nauman Athar Hasan: projects and notes.",
      },
      { property: "og:title", content: "hasan" },
      {
        property: "og:description",
        content:
          "The personal website of Md Nauman Athar Hasan: projects and notes.",
      },
      { property: "og:url", content: "https://mnah.dev/" },
      { property: "og:site_name", content: "hasan" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/" }],
  }),
  component: Home,
});

type IndexItem = {
  year: number;
  title: string;
  href: string;
  viewSlug: string;
  sortTime: number;
};

const notes = getAllNotes();

const noteItems: IndexItem[] = notes.map((post) => ({
  year: post.pubDate.getFullYear(),
  title: post.title,
  href: `/notes/${post.slug}`,
  viewSlug: post.slug,
  sortTime: post.pubDate.valueOf(),
}));

const projectItems: IndexItem[] = PROJECTS.map((project) => ({
  year: project.year,
  title: project.name,
  href: `/projects/${project.slug}`,
  viewSlug: `projects/${project.slug}`,
  sortTime: new Date(project.year, 0, 1).valueOf(),
}));

const sortItems = (items: IndexItem[]) =>
  [...items].sort((a, b) => b.sortTime - a.sortTime || b.year - a.year);

function Home() {
  const projects = sortItems(projectItems);
  const sortedNotes = sortItems(noteItems);
  const viewSlugs = [...projects, ...sortedNotes].map((item) => item.viewSlug);

  useEffect(() => {
    scheduleViewCounts(viewSlugs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="intro" aria-labelledby="intro-heading">
        <h1 id="intro-heading">Md Nauman Athar Hasan</h1>
        <p className="intro-role">Backend Engineer &amp; Systems Builder</p>
        <p>
          I build backend systems, developer tools, and small web experiments.
          I care about reliable software, clear interfaces, and understanding
          how things work underneath.
        </p>
        <p className="intro-links">
          <a href="mailto:workwithnauman@gmail.com">Email</a>{" "}
          <a href="https://github.com/mnah05">GitHub</a>{" "}
          <a href="https://www.linkedin.com/in/nauman-hasan-53a66630/">LinkedIn</a>
        </p>
        <img
          className="profile-photo"
          src="/images/Screenshot%202026-10-13%20at%2011.58.34%E2%80%AFPM.png"
          alt="Md Nauman Athar Hasan"
        />
      </section>
      <section className="home-section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <h2 id="projects-heading">Selected work</h2>
          <Link to="/projects">All projects</Link>
        </div>
        <div className="project-card-list">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="home-section" aria-labelledby="notes-heading">
        <div className="section-heading">
          <h1 id="notes-heading">Notes</h1>
          <Link to="/notes">All notes</Link>
        </div>
        {sortedNotes.length === 0 ? (
          <p>Brewing new notes soon.</p>
        ) : (
          <ul className="index-list">
            {sortedNotes.map((item, index) => {
              const showYear =
                index === 0 || item.year !== sortedNotes[index - 1].year;
              return (
                <li className="group" key={item.viewSlug}>
                  <a href={item.href}>
                    <span className="index-row">
                      {showYear ? (
                        <span className="index-year">{item.year}</span>
                      ) : null}
                      <span
                        className={`index-title-wrap${showYear ? "" : " index-row-indented"}`}
                      >
                        <span className="index-title">{item.title}</span>
                      </span>
                      <span
                        className="index-views"
                        data-view-count={item.viewSlug}
                      >
                        —
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
