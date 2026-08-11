import { Fragment } from "react";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { resume } from "../data/resume";
import "../styles/resume.css";

export default function Resume() {
	return (
		<>
			<Seo title="Resume | mnah" description={`${resume.name} — resume`} />
			<Header />
			<main>
				<header className="resume-header">
					<h1>{resume.name}</h1>
					<div className="resume-contact">
						<span>{resume.location}</span>
						<span className="sep"> | </span>
						<a href={`mailto:${resume.email}`}>{resume.email}</a>
						{resume.links.map((link) => (
							<span key={link.label}>
								<span className="sep"> | </span>
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
								{project.link && (
									<a
										className="resume-project-link"
										href={project.link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{project.link.label}
									</a>
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
					<div className="resume-skills">
						{resume.skills.map((skill) => (
							<Fragment key={skill.category}>
								<span className="skill-category">{skill.category}</span>
								<span className="skill-items">{skill.items}</span>
							</Fragment>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
