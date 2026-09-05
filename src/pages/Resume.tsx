import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { resume } from "../data/resume";
import "../styles/resume.css";

export default function Resume() {
	const handlePrint = () => {
		window.print();
	};

	return (
		<>
			<Seo title="Resume | mnah" description={`${resume.name} — resume`} />
			<Header />
			<main className="resume-page">
				<header className="resume-header">
					<div className="resume-header-top">
						<h1>{resume.name}</h1>
						<button type="button" className="resume-print-btn" onClick={handlePrint} aria-label="Print or save resume as PDF">
							<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="6 9 6 2 18 2 18 9" />
								<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
								<rect x="6" y="14" width="12" height="8" />
							</svg>
							<span>Print / PDF</span>
						</button>
					</div>
					<div className="resume-contact">
						<span>{resume.location}</span>
						<span className="sep">&bull;</span>
						<a href={`mailto:${resume.email}`}>{resume.email}</a>
						{resume.links.map((link) => (
							<span key={link.label}>
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
								<span className="year">{project.year}</span>
							</div>
							<div className="resume-subline">
								<span className="resume-project-tech">{project.tech}</span>
							{project.link && project.link.href.startsWith("/") ? (
								<Link className="resume-project-link" to={project.link.href}>
									{project.link.label} &rarr;
								</Link>
							) : (
								project.link && (
									<a
										className="resume-project-link"
										href={project.link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{project.link.label} &rarr;
									</a>
								)
							)}
							</div>
							<ul className="resume-bullets">
								{project.points.map((point) => (
									<li key={point}>{point}</li>
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
			<Footer />
		</>
	);
}
