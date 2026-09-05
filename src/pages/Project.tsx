import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "./NotFound";
import { getProjectBySlug } from "../data/projects";
import "../styles/project.css";

function ExternalLink({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
			{children}
		</a>
	);
}

export default function Project() {
	const { slug } = useParams<{ slug: string }>();
	const project = slug ? getProjectBySlug(slug) : undefined;

	if (!project) {
		return <NotFound />;
	}

	const { status, github, liveUrl } = project;

	return (
		<>
			<Seo title={`${project.name} | mnah`} description={project.short} />
			<Header />
			<main className="project-page">
				<article>
					<div className="back-nav">
						<Link to="/projects" className="back-link">
							&larr; All projects
						</Link>
					</div>

					<div className={`status-banner status-banner-tone-${status.tone}`} role="status">
						<span className="status-dot" aria-hidden="true" />
						<div>
							<span className="status-label">{status.label}</span>
							<p className="status-note">{status.note}</p>
						</div>
					</div>

					<header className="project-header">
						<div className="project-name-line">
							<h1>{project.name}</h1>
							<span className="project-year">{project.year}</span>
						</div>
						<p className="project-tagline">{project.tagline}</p>
						<hr className="project-divider" />
					</header>

					<div className="project-body">
						{project.summary.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}

						<h2>Highlights</h2>
						<ul className="project-highlights">
							{project.highlights.map((highlight) => (
								<li key={highlight}>
									<span className="highlight-bullet" aria-hidden="true" />
									<span>{highlight}</span>
								</li>
							))}
						</ul>

						<h2>Stack</h2>
						<ul className="project-stack">
							{project.stack.map((tool) => (
								<li key={tool}>
									<span className="stack-dot" aria-hidden="true" />
									{tool}
								</li>
							))}
						</ul>
					</div>

					<div className="project-actions">
						{liveUrl ? (
							<ExternalLink href={liveUrl} className="button button-primary">
								<span>View live site</span>
								<svg
									aria-hidden="true"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M7 17L17 7M17 7H7M17 7V17" />
								</svg>
							</ExternalLink>
						) : (
							<span className="button button-primary" aria-disabled="true">
								<span>Live site unavailable</span>
							</span>
						)}
						{github?.url ? (
							<ExternalLink href={github.url} className="button button-secondary">
								<span>View on GitHub</span>
								<svg
									aria-hidden="true"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M7 17L17 7M17 7H7M17 7V17" />
								</svg>
							</ExternalLink>
						) : (
							<ExternalLink href="https://github.com/mnah05" className="button button-secondary">
								<span>GitHub</span>
								<svg
									aria-hidden="true"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M7 17L17 7M17 7H7M17 7V17" />
								</svg>
							</ExternalLink>
						)}
					</div>

					{github?.note && (
						<p className="github-note">
							{github.note} You can also browse the rest of my work on{" "}
							<a href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">
								GitHub
							</a>
							.
						</p>
					)}
				</article>
			</main>
			<Footer />
		</>
	);
}
