import type { ReactNode } from "react";
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
			<main>
				<article>
					{heroImage && (
						<div className="hero-image">
							<img width={1020} height={510} src={heroImage} alt="" />
						</div>
					)}
					<div className="prose">
						<div className="title">
							<div className="date">
								<FormattedDate date={pubDate} />
								{updatedDate && (
									<div className="last-updated-on">
										Last updated on <FormattedDate date={updatedDate} />
									</div>
								)}
							</div>
							<h1>{title}</h1>
							<hr />
						</div>
						{children}
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
}
