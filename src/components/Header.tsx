import { Link } from "react-router-dom";
import "../styles/header.css";

const SITE_TITLE = "mnah";

export default function Header() {
	return (
		<header className="site-header">
			<nav>
				<Link to="/" className="brand">
					<span className="brand-text">{SITE_TITLE}</span>
				</Link>
				<div className="nav-links">
					<a href="#writing">Writing</a>
					<a href="#about">About</a>
				</div>
			</nav>
		</header>
	);
}
