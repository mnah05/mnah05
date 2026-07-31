import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormattedDate from "../components/FormattedDate";
import Seo from "../components/Seo";
import { posts } from "../posts";
import "../styles/blog-index.css";

const SITE_TITLE = "mnah";
const SITE_DESCRIPTION = "mnah's personal site";

export default function BlogIndex() {
	return (
		<>
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} />
			<Header />
			<main>
				<section>
					<ul>
						{posts.map((post) => (
							<li key={post.slug}>
								<Link to={`/blog/${post.slug}`}>
									<img width={720} height={360} src={post.heroImage} alt="" />
									<h4 className="title">{post.title}</h4>
									<p className="date">
										<FormattedDate date={post.pubDate} />
									</p>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</main>
			<Footer />
		</>
	);
}
