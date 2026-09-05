import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";
import "../styles/home.css";
import "../styles/project.css";

export default function Projects() {
	return (
		<>
			<Seo title="Projects | mnah" description="A selection of projects by mnah" />
			<Header />
			<main className="project-page">
				<div className="back-nav">
					<Link to="/" className="back-link">
						&larr; Home
					</Link>
				</div>

				<header className="project-header">
					<h1>Projects</h1>
					<p className="project-tagline">
						Selected work. Click any project for details, status, and source links.
					</p>
					<hr className="project-divider" />
				</header>

				<ul className="projects project-index-list">
					{PROJECTS.map((project) => (
						<li key={project.slug}>
							<Link to={`/projects/${project.slug}`} className="project-card-link">
								<div className="project-card">
									<div className="project-head">
										<span className="project-name">{project.name}</span>
										<div className="project-meta">
											{project.year && <span className="project-year">{project.year}</span>}
											<span className={`status-pill status-pill-${project.status.tone}`}>
												{project.status.tone === "down" ? "offline" : "live"}
											</span>
											<span className="project-arrow" aria-hidden="true">&rarr;</span>
										</div>
									</div>
									<p className="project-description">{project.short}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</main>
			<Footer />
		</>
	);
}
