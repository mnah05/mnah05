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
			<main className="blog-index-page">
				<section>
					<div className="blog-header">
						<h1>Writing &amp; Notes</h1>
						<p className="blog-subtitle">
							Thoughts on backend systems, Go, TypeScript, Cloudflare, and developer craft.
						</p>
					</div>
					{posts.length === 0 ? (
						<div className="empty-state">
							<span className="empty-icon">☕</span>
							<p>Brewing new articles soon. Stay tuned!</p>
						</div>
					) : (
						<ul className="post-list">
							{posts.map((post) => (
								<li key={post.slug}>
									<Link to={`/blog/${post.slug}`} className="post-item-link">
										<div className="post-item-header">
											<h2 className="title">{post.title}</h2>
											<span className="post-arrow" aria-hidden="true">&rarr;</span>
										</div>
										{post.description && (
											<p className="post-description">{post.description}</p>
										)}
										<div className="post-meta">
											<span className="date">
												<FormattedDate date={post.pubDate} />
											</span>
										</div>
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
