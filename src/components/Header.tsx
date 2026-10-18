import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation">
        <Link to="/" className="brand">hasan</Link>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}
