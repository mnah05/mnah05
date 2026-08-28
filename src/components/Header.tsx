import { Link, NavLink } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import "../styles/header.css";

const SITE_TITLE = "mnah";

function ThemeToggle() {
	const { theme, toggle } = useTheme();

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={toggle}
			aria-label={theme === "light" ? "Switch to dark mode (Midnight Espresso)" : "Switch to light mode (Café au Lait)"}
			title={theme === "light" ? "Switch to dark mode (Midnight Espresso)" : "Switch to light mode (Café au Lait)"}
		>
			<span className="toggle-icon-wrap">
				{theme === "light" ? (
					<svg className="toggle-icon" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
					</svg>
				) : (
					<svg className="toggle-icon" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				)}
			</span>
		</button>
	);
}

export default function Header() {
	return (
		<header className="site-header">
			<nav>
				<Link to="/" className="brand">
					<span className="brand-dot" aria-hidden="true" />
					<span className="brand-text">{SITE_TITLE}</span>
				</Link>
				<div className="nav-links">
					<NavLink to="/" end>
						Home
					</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/blog">Blog</NavLink>
					<NavLink to="/resume">Resume</NavLink>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
