import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import Header from "./Header";
import Footer from "./Footer";
import FormattedDate from "./FormattedDate";
import "../styles/blog-post.css";

interface BlogLayoutProps {
	title: string;
	description: string;
	pubDate: string | Date;
	updatedDate?: string | Date;
	heroImage?: string;
	children: ReactNode;
}

export default function BlogLayout({
	title,
	description,
	pubDate,
	updatedDate,
	heroImage,
	children,
}: BlogLayoutProps) {
	return (
		<>
			<Seo title={title} description={description} />
			<Header />
			<main className="blog-post-page">
				<article className="post-article">
					<div className="back-nav">
						<Link to="/blog" className="back-link">
							&larr; Back to all posts
						</Link>
					</div>
					{heroImage && (
						<div className="hero-image">
							<img width={1020} height={510} src={heroImage} alt="" />
						</div>
					)}
					<div className="prose">
						<header className="post-header">
							<div className="post-meta-line">
								<span className="post-date-badge">
									<FormattedDate date={pubDate} />
								</span>
								{updatedDate && (
									<span className="last-updated-on">
										(Updated <FormattedDate date={updatedDate} />)
									</span>
								)}
							</div>
							<h1>{title}</h1>
							{description && <p className="post-lead">{description}</p>}
							<hr className="post-divider" />
						</header>
						<div className="post-content">{children}</div>
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
}
