import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

const SITE_TITLE = "mnah";
const SITE_DESCRIPTION = "mnah — builds things";

const PROJECTS = [
	{ name: "link", href: "https://link.mnah.dev/", desc: "my hub — all my links in one place" },
	{ name: "kv", href: "https://github.com/mnah05/kv" },
	{ name: "go-analytics", href: "https://github.com/mnah05/go-analytics" },
	{ name: "boiler-go", href: "https://github.com/mnah05/boiler-go" },
	{ name: "tripnest", href: "https://github.com/mnah05/tripnest" },
	{ name: "dotfiles", href: "https://github.com/mnah05/dotfiles" },
	{
		name: "read",
		href: "https://raindrop.io/workwithnauman/reads-72899412",
	},
	{
		name: "resume",
		href: "https://www.overleaf.com/read/dxbtbmgqdrbg#973621",
	},
];

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
						{PROJECTS.map((project) => (
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
