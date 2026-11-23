import { createFileRoute, Link } from "@tanstack/react-router";
import { PROJECTS } from "../data/projects";
import { getAllNotes } from "../lib/notes";
import "../styles/home.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hasan — Backend engineer & systems builder" },
      {
        name: "description",
        content: "I work with Go, and build things to understand the systems underneath.",
      },
      { property: "og:title", content: "Hasan — Backend engineer & systems builder" },
      {
        property: "og:description",
        content: "Projects, notes, and things I find interesting enough to build.",
      },
      { property: "og:url", content: "https://mnah.dev/" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/" }],
  }),
  component: Home,
});

const featuredSlugs = ["fishstick", "nexus", "go-analytics"];
const featuredProjects = featuredSlugs
  .map((slug) => PROJECTS.find((project) => project.slug === slug))
  .filter((project) => project !== undefined);

function Home() {
  const recentNotes = getAllNotes().slice(0, 3);

  return (
    <main className="home-page mx-auto w-full max-w-5xl px-6 pb-20 pt-8 sm:pt-12">
      <section className="home-hero grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_13rem] sm:gap-16" aria-labelledby="intro-heading">
        <div>
          <p className="home-kicker">HASAN <span>·</span> BACKEND ENGINEER</p>
          <h1 id="intro-heading">I work on whatever I find interesting enough to understand.</h1>
          <p className="home-intro-copy">
            Usually Go. I like getting close to the systems underneath: how they behave, where they break, and what it takes to make them reliable.
          </p>
          <div className="home-contact-links">
            <a href="mailto:workwithnauman@gmail.com">Get in touch <span>↗</span></a>
            <a href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
            <a href="https://www.linkedin.com/in/nauman-hasan-53a66630/" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a>
          </div>
        </div>
        <figure className="home-portrait">
          <img src="/images/Screenshot%202026-10-13%20at%2011.58.34%E2%80%AFPM.png" alt="Md Nauman Athar Hasan" />
          <figcaption>Nauman Hasan <span>·</span> building and learning</figcaption>
        </figure>
      </section>

      <section className="home-section" aria-labelledby="work-heading">
        <div className="home-section-heading">
          <div><p className="home-kicker">A FEW THINGS I’VE BUILT</p><h2 id="work-heading">Selected work</h2></div>
          <Link to="/projects">All projects <span>↗</span></Link>
        </div>
        <div className="home-project-list">
          {featuredProjects.map((project) => (
            <Link className="home-project-row" key={project.slug} to="/projects" hash={project.slug}>
              <span><strong>{project.name}</strong><small>{project.short}</small></span>
              <span className="home-project-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-notes-section" aria-labelledby="notes-heading">
        <div className="home-section-heading">
          <div><p className="home-kicker">THINKING IN PUBLIC</p><h2 id="notes-heading">Notes</h2></div>
          <Link to="/notes">All notes <span>↗</span></Link>
        </div>
        <div className="home-notes-list">
          {recentNotes.map((note) => (
            <Link className="home-note-row" key={note.slug} to="/notes/$slug" params={{ slug: note.slug }}>
              <span className="home-note-date">{note.pubDate.getFullYear()}</span>
              <span className="home-note-title">{note.title}</span>
              <span className="home-note-arrow">↗</span>
            </Link>
          ))}
        </div>
        <div className="home-reading-line">
          <span>I keep a collection of useful references, papers, and docs.</span>
          <a href="https://workwithnauman.raindrop.page/reads-72899412" target="_blank" rel="noopener noreferrer">Browse my reading list ↗</a>
        </div>
      </section>

    </main>
  );
}
