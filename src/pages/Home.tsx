import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
					<h1>Md Nauman Athar Hasan</h1>
					<p className="role">Backend Engineer</p>
					<p className="intro">Building reliable backend systems, developer tools, and small experiments on the web.</p>
					<div className="hero-links" aria-label="Social links">
						<a href="mailto:workwithnauman@gmail.com">Email</a>
						<a href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">GitHub</a>
						<a href="https://www.linkedin.com/in/nauman-hasan-53a66630a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
					</div>
					<img className="profile-photo" src="https://github.com/mnah05.png" alt="Md Nauman Athar Hasan" />
				</section>

				<section id="about" className="text-section" aria-labelledby="about-heading">
					<h2 id="about-heading">About</h2>
					<p>I care about clean APIs, reliable async workflows, and shipping things that last. Most of my work is in Go, TypeScript, and the Cloudflare ecosystem.</p>
					<p>Right now, I am drawn to distributed systems, backend performance, databases, concurrency, and technical writing that makes complex systems easier to understand.</p>
				</section>

				<section className="work-section" aria-labelledby="work-heading">
					<h2 id="work-heading">Selected Work</h2>
					<ul className="work-list">
						{PROJECTS.map((project) => (
							<li key={project.name}>
								<a href={project.href} target={project.href.startsWith("/") ? undefined : "_blank"} rel={project.href.startsWith("/") ? undefined : "noopener noreferrer"}>
									<span className="work-year">{project.year}</span>
									<span className="work-name">{project.name}</span>
									<span className="work-description">{project.description}</span>
								</a>
							</li>
						))}
					</ul>
				</section>

				<section className="text-section skills-section" aria-labelledby="skills-heading">
					<h2 id="skills-heading">Skills</h2>
					<p>{STACK.join(" / ")}</p>
				</section>

				{LATEST_POSTS.length > 0 && (
					<section id="writing" className="writing-section" aria-labelledby="writing-heading">
						<h2 id="writing-heading">Writing</h2>
						<ul className="writing-list">
							{LATEST_POSTS.map((post) => (
								<li key={post.slug}>
									<a href={`/blog/${post.slug}`}>{post.title}</a>
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
