import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

const SITE_TITLE = "mnah";
const SITE_DESCRIPTION = "mnah — builds things";

type Project = {
	name: string;
	href: string;
	desc?: string;
	priority?: number;
	stars?: number;
	year?: number;
};

const PROJECTS: Project[] = [
	{ name: "envitoo", href: "https://envitoo.mnah.dev/", desc: "event management platform", priority: 10, year: 2026 },
	{ name: "go-analytics", href: "https://github.com/mnah05/go-analytics", priority: 9, year: 2026 },
	{ name: "tripnest", href: "https://github.com/mnah05/tripnest", priority: 8, year: 2026 },
	{ name: "kv", href: "https://github.com/mnah05/kv", priority: 6 },
	{ name: "boiler-go", href: "https://github.com/mnah05/boiler-go", priority: 5 },
	{ name: "dotfiles", href: "https://github.com/mnah05/dotfiles", priority: 4 },
	{
		name: "read",
		href: "https://raindrop.io/workwithnauman/reads-72899412",
		priority: 2,
	},
	{
		name: "resume",
		href: "https://www.overleaf.com/read/dxbtbmgqdrbg#973621",
		priority: 3,
	},
];

const projectScore = (p: Project) => {
	const recency = p.year ? Math.max(0, 3 - (new Date().getFullYear() - p.year)) : 0;
	const popularity = p.stars ? Math.min(p.stars, 50) / 10 : 0;
	return (p.priority ?? 0) + recency + popularity;
};

const ORDERED_PROJECTS = [...PROJECTS].sort((a, b) => projectScore(b) - projectScore(a));

export default function Home() {
	return (
		<>
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} />
			<Header />
			<main className="home">
				<section className="hero">
					<h1>mnah</h1>
					<p className="tagline">builds things</p>
				</section>

				<section aria-label="Projects">
					<ul className="projects">
						{ORDERED_PROJECTS.map((project) => (
							<li key={project.name}>
								<a
									href={project.href}
									target="_blank"
									rel="noopener noreferrer"
								>
								<span className="project-name">{project.name}</span>
								{project.desc && (
									<span className="project-desc">{project.desc}</span>
								)}
								<span className="project-arrow" aria-hidden="true">
									&rarr;
								</span>
								</a>
							</li>
						))}
					</ul>
				</section>
			</main>
			<Footer />
		</>
	);
}
