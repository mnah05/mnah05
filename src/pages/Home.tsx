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
};

const PROJECTS: Project[] = [
	{
		name: "envitoo",
		description: "Event management platform with ticketing, QR check-in, and volunteer coordination.",
		href: "https://envitoo.mnah.dev/",
		priority: 10,
		year: 2026,
	},
	{
		name: "go-analytics",
		description: "High-performance URL shortener with real-time click analytics and async workers.",
		href: "https://github.com/mnah05/go-analytics",
		priority: 9,
		year: 2026,
	},
	{
		name: "tripnest",
		description: "Travel planning backend with type-safe SQL, migrations, and Dockerized services.",
		href: "https://github.com/mnah05/tripnest",
		priority: 8,
		year: 2026,
	},
	{
		name: "kv",
		description: "A lightweight key-value store built for learning and experimentation.",
		href: "https://github.com/mnah05/kv",
		priority: 6,
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

const projectScore = (p: Project) => {
	const recency = p.year ? Math.max(0, 3 - (new Date().getFullYear() - p.year)) : 0;
	const popularity = p.stars ? Math.min(p.stars, 50) / 10 : 0;
	return (p.priority ?? 0) + recency + popularity;
};

const ORDERED_PROJECTS = [...PROJECTS].sort((a, b) => projectScore(b) - projectScore(a));

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
					<span className="hero-eyebrow">Backend &middot; Go &middot; TypeScript</span>
					<h1>mnah</h1>
					<p className="tagline">builds things</p>
					<p className="intro">
						I am a backend-focused engineer who likes shipping small, reliable tools
						and systems. Most of my work is in Go, TypeScript, and the Cloudflare
						ecosystem.
					</p>
					<div className="hero-actions">
						<a className="button" href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
						<Link className="button button-secondary" to="/resume">
							Resume
						</Link>
						<a className="button button-secondary" href="mailto:workwithnauman@gmail.com">
							Email
						</a>
					</div>
				</section>

				<section className="projects-section" aria-labelledby="projects-heading">
					<div className="section-header">
						<h2 id="projects-heading">Selected work</h2>
					</div>
					<ul className="projects">
						{ORDERED_PROJECTS.map((project) => (
							<li key={project.name}>
								{project.href.startsWith("/") ? (
									<Link to={project.href}>
										<div className="project-card">
											<div className="project-head">
												<span className="project-name">{project.name}</span>
												{project.year && <span className="project-year">{project.year}</span>}
											</div>
											<p className="project-description">{project.description}</p>
										</div>
									</Link>
								) : (
									<a href={project.href} target="_blank" rel="noopener noreferrer">
										<div className="project-card">
											<div className="project-head">
												<span className="project-name">{project.name}</span>
												{project.year && <span className="project-year">{project.year}</span>}
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
							<li key={tool}>{tool}</li>
						))}
					</ul>
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
									<Link to={`/blog/${post.slug}`}>
										<span className="writing-title">{post.title}</span>
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
