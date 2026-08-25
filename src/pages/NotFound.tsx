import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/not-found.css";

export default function NotFound() {
	return (
		<>
			<Seo title="404 — not found" description="Page not found" />
			<Header />
			<main className="not-found">
				<span className="not-found-code">404</span>
				<h1>Nothing here</h1>
				<p className="not-found-message">
					This page doesn&apos;t exist. It may have moved, or the link is wrong.
				</p>
				<div className="not-found-actions">
					<Link className="button" to="/">
						Home
					</Link>
					<Link className="button button-secondary" to="/blog">
						Blog
					</Link>
					<Link className="button button-secondary" to="/about">
						About
					</Link>
				</div>
			</main>
			<Footer />
		</>
	);
}
