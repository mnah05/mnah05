import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormattedDate from "../components/FormattedDate";
import { posts } from "../posts";
import "../styles/home.css";

const SITE_TITLE = "mnah";
const SITE_DESCRIPTION = "mnah — builds things";

type Project = {
	name: string;
	description: string;
	href: string;
	priority?: number;
	stars?: number;
	year?: number;
	status?: "down" | "live";
};

const PROJECTS: Project[] = [
	{
		name: "envitoo",
		description: "Event management platform with ticketing, QR check-in, and volunteer coordination.",
		href: "/projects/envitoo",
		priority: 10,
		year: 2026,
		status: "down",
	},
	{
		name: "go-analytics",
		description: "High-performance URL shortener with real-time click analytics and async workers.",
		href: "/projects/go-analytics",
		priority: 9,
		year: 2026,
		status: "down",
	},
	{
		name: "nexus",
		description: "Distributed, persistent key-value store with Raft consensus and auto leader election.",
		href: "/projects/nexus",
		priority: 8,
		year: 2026,
		status: "down",
	},
	{
		name: "tripnest",
		description: "Travel planning backend with type-safe SQL, migrations, and Dockerized services.",
		href: "/projects/tripnest",
		priority: 7,
		year: 2026,
		status: "down",
	},
	{
		name: "boiler-go",
		description: "Opinionated Go starter with clean structure and common tooling wired up.",
		href: "https://github.com/mnah05/boiler-go",
		priority: 5,
	},
	{
		name: "read",
		description: "Articles, papers, and references I am reading or have saved.",
		href: "https://raindrop.io/workwithnauman/reads-72899412",
		priority: 2,
	},
];

const STACK = [
	"Go",
	"TypeScript",
	"Hono",
	"Cloudflare Workers",
	"PostgreSQL",
	"Redis",
	"Clerk",
	"Supabase",
	"Cloudflare R2",
	"Docker",
	"NATS JetStream",
];

const LATEST_POSTS = posts.slice(0, 3);

export default function Home() {
	return (
		<>
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} />
			<Header />
			<main className="home">
				<section className="hero">
					<div className="hero-eyebrow-wrap">
						<span className="hero-badge">
							<span className="badge-icon">☕</span> Backend &middot; Go &middot; TypeScript &middot; Cloudflare
						</span>
					</div>
					<h1>mnah</h1>
					<p className="tagline">builds things with craft & precision</p>
					<p className="intro">
						I am a backend-focused engineer who likes shipping small, reliable tools
						and systems. Most of my work is in Go, TypeScript, and the Cloudflare
						ecosystem.
					</p>
					<div className="hero-actions">
						<a className="button button-primary" href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">
							<span>GitHub</span>
							<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M7 17L17 7M17 7H7M17 7V17" />
							</svg>
						</a>
						<Link className="button button-secondary" to="/resume">
							<span>Resume</span>
						</Link>
						<a className="button button-secondary" href="mailto:workwithnauman@gmail.com">
							<span>Email</span>
						</a>
					</div>
				</section>

				<section className="projects-section" aria-labelledby="projects-heading">
					<div className="section-header">
						<h2 id="projects-heading">Selected work</h2>
					</div>
					<ul className="projects">
						{PROJECTS.map((project) => (
							<li key={project.name}>
								{project.href.startsWith("/") ? (
									<Link to={project.href} className="project-card-link">
										<div className="project-card">
										<div className="project-head">
											<span className="project-name">{project.name}</span>
											<div className="project-meta">
												{project.year && <span className="project-year">{project.year}</span>}
												{project.status && (
													<span className={`status-pill status-pill-${project.status}`}>
														{project.status === "down" ? "offline" : "live"}
													</span>
												)}
												<span className="project-arrow" aria-hidden="true">&rarr;</span>
											</div>
										</div>
										<p className="project-description">{project.description}</p>
									</div>
								</Link>
							) : (
								<a href={project.href} target="_blank" rel="noopener noreferrer" className="project-card-link">
									<div className="project-card">
										<div className="project-head">
											<span className="project-name">{project.name}</span>
											<div className="project-meta">
												{project.year && <span className="project-year">{project.year}</span>}
												{project.status && (
													<span className={`status-pill status-pill-${project.status}`}>
														{project.status === "down" ? "offline" : "live"}
													</span>
												)}
												<span className="project-arrow" aria-hidden="true">&#x2197;</span>
											</div>
										</div>
										<p className="project-description">{project.description}</p>
									</div>
								</a>
							)}
							</li>
						))}
					</ul>
				</section>

				<section className="stack-section" aria-labelledby="stack-heading">
					<div className="section-header">
						<h2 id="stack-heading">Tools & stack</h2>
					</div>
					<ul className="stack-list">
						{STACK.map((tool) => (
							<li key={tool}>
								<span className="stack-dot" aria-hidden="true" />
								{tool}
							</li>
						))}
					</ul>
				</section>

				<section className="github-section" aria-labelledby="github-heading">
					<div className="section-header">
						<h2 id="github-heading">GitHub activity</h2>
						<a
							href="https://github.com/mnah05"
							target="_blank"
							rel="noopener noreferrer"
							className="section-link"
						>
							@mnah05 &rarr;
						</a>
					</div>
					<div className="chart-container">
						<a href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer" aria-label="View Nauman Hasan's GitHub profile">
							<img
								className="contribution-chart"
								src="https://ghchart.rshah.org/bd5e1b/mnah05"
								alt="Nauman Hasan's GitHub contribution graph for the last year"
								loading="lazy"
								width="828"
								height="128"
							/>
						</a>
					</div>
				</section>

				{LATEST_POSTS.length > 0 && (
					<section className="writing-section" aria-labelledby="writing-heading">
						<div className="section-header">
							<h2 id="writing-heading">Writing</h2>
							<Link to="/blog" className="section-link">
								All posts &rarr;
							</Link>
						</div>
						<ul className="writing-list">
							{LATEST_POSTS.map((post) => (
								<li key={post.slug}>
									<Link to={`/blog/${post.slug}`} className="writing-link">
										<div className="writing-title-wrap">
											<span className="writing-bullet" aria-hidden="true" />
											<span className="writing-title">{post.title}</span>
										</div>
										<span className="writing-date">
											<FormattedDate date={post.pubDate} />
										</span>
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}
			</main>
			<Footer />
		</>
	);
}
