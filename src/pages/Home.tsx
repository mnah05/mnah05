import Seo from "../components/Seo";
import "../styles/home.css";

const SITE_TITLE = "mnah";
const SITE_DESCRIPTION = "mnah's personal site";

export default function Home() {
	return (
		<div className="home-theme">
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} />
			<main className="home">
				<h1>mnah</h1>
				<p className="tagline">builds things</p>

				<ul className="links">
					<li>
						<a href="https://github.com/mnah05/kv" target="_blank" rel="noopener noreferrer">
							kv
						</a>
					</li>
					<li>
						<a href="https://github.com/mnah05/go-analytics" target="_blank" rel="noopener noreferrer">
							go-analytics
						</a>
					</li>
					<li>
						<a href="https://github.com/mnah05/boiler-go" target="_blank" rel="noopener noreferrer">
							boiler-go
						</a>
					</li>
					<li>
						<a href="https://github.com/mnah05/tripnest" target="_blank" rel="noopener noreferrer">
							tripnest
						</a>
					</li>
					<li>
						<a href="https://github.com/mnah05/dotfiles" target="_blank" rel="noopener noreferrer">
							dotfiles
						</a>
					</li>
					<li>
						<a
							href="https://raindrop.io/workwithnauman/reads-72899412"
							target="_blank"
							rel="noopener noreferrer"
						>
							read
						</a>
					</li>
					<li>
						<a
							href="https://drive.google.com/file/d/1gUsJzs93HxYxz3EQhQPpnsIAQC58hEAC/view?usp=sharing"
							target="_blank"
							rel="noopener noreferrer"
							className="resume"
						>
							resume
						</a>
					</li>
				</ul>

				<div className="social">
					<a href="https://github.com/mnah05/" target="_blank" rel="noopener noreferrer">
						gh
					</a>
					<a href="https://x.com/mnah05" target="_blank" rel="noopener noreferrer">
						x
					</a>
					<a
						href="https://www.linkedin.com/in/nauman-hasan-53a66630a/"
						target="_blank"
						rel="noopener noreferrer"
					>
						in
					</a>
				</div>
			</main>
		</div>
	);
}
