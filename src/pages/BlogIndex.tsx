import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormattedDate from "../components/FormattedDate";
import Seo from "../components/Seo";
import { posts } from "../posts";
import "../styles/blog-index.css";

const SITE_TITLE = "Blog | mnah";
const SITE_DESCRIPTION = "Thoughts, notes, and write-ups from mnah.";

export default function BlogIndex() {
	return (
		<>
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} />
			<Header />
			<main>
				<section>
					<h1>Blog</h1>
					{posts.length === 0 ? (
						<p className="empty-state">No posts yet.</p>
					) : (
						<ul className="post-list">
							{posts.map((post) => (
								<li key={post.slug}>
									<Link to={`/blog/${post.slug}`}>
										<h4 className="title">{post.title}</h4>
										<p className="date">
											<FormattedDate date={post.pubDate} />
										</p>
									</Link>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
			<Footer />
		</>
	);
}
