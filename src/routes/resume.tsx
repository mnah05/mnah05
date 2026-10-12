import { createFileRoute } from "@tanstack/react-router";
import Icon from "../components/Icon";
import { resume } from "../data/resume";
import "../styles/resume.css";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume | hasan" },
      { name: "description", content: `${resume.name} — resume` },
      { property: "og:title", content: "Resume | hasan" },
      { property: "og:description", content: `${resume.name} — resume` },
      { property: "og:url", content: "https://mnah.dev/resume" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-header">
        <div className="resume-header-top">
          <h1>{resume.name}</h1>
          <div className="resume-actions">
            <a
              className="resume-print-btn"
              href="/resume.pdf"
              download="Md-Nauman-Athar-Hasan-Resume.pdf"
            >
              <Icon name="download" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              className="resume-print-btn"
              aria-label="Print resume"
              onClick={() => window.print()}
            >
              <Icon name="print" />
              <span>Print</span>
            </button>
          </div>
        </div>
        <div className="resume-contact">
          <span>{resume.location}</span>
          <span className="sep">&bull;</span>
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
          {resume.links.map((link) => (
            <span key={link.href}>
              <span className="sep">&bull;</span>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </header>
      <section className="resume-section">
        <h2>Education</h2>
        {resume.education.map((edu) => (
          <div className="resume-entry" key={edu.school}>
            <div className="resume-entry-head">
              <h3>{edu.school}</h3>
              <span className="year">{edu.years}</span>
            </div>
            <div className="resume-subline">
              {edu.degree} &mdash; {edu.location}
            </div>
            {edu.coursework && (
              <ul className="resume-bullets">
                <li>Relevant Coursework: {edu.coursework}</li>
              </ul>
            )}
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>Projects</h2>
        {resume.projects.map((project) => (
          <div className="resume-entry" key={project.name}>
            <div className="resume-entry-head">
              <h3>{project.name}</h3>
              {project.year && <span className="year">{project.year}</span>}
            </div>
            <div className="resume-subline">
              <span className="resume-project-tech">{project.tech}</span>
              {project.link && (
                <a
                  className="resume-project-link"
                  href={project.link.href}
                  target={project.link.href.startsWith("/") ? undefined : "_blank"}
                  rel={
                    project.link.href.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  {project.link.label} &rarr;
                </a>
              )}
            </div>
            <ul className="resume-bullets">
              {project.points.map((point) => (
                <li key={point.slice(0, 32)}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>Technical Skills</h2>
        <div className="resume-skills-card">
          {resume.skills.map((skill) => (
            <div className="skill-row" key={skill.category}>
              <span className="skill-category">{skill.category}</span>
              <div className="skill-tags">
                {skill.items.split(", ").map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
