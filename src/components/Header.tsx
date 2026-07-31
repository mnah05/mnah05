import { Link, NavLink } from "react-router-dom";
import "../styles/header.css";

const SITE_TITLE = "mnah";

export default function Header() {
	return (
		<header>
			<nav>
				<Link to="/" className="brand">
					{SITE_TITLE}
				</Link>
				<div className="nav-links">
					<NavLink to="/" end>
						Home
					</NavLink>
					<NavLink to="/about">About</NavLink>
				</div>
			</nav>
		</header>
	);
}
