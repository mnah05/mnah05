import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

const SITE_TITLE = "hasan";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getInitialTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        saved = null;
      }
      if (saved !== "light" && saved !== "dark") {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  const applyTheme = useCallback((next: "light" | "dark", persist = true) => {
    if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    const meta = document.getElementById("meta-theme-color");
    if (meta) meta.setAttribute("content", next === "dark" ? "#0a0a0a" : "#ffffff");
    if (persist) {
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable */
      }
    }
    setTheme(next);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <nav>
        <Link to="/" className="brand">
          {SITE_TITLE}
        </Link>
        <div className="nav-links">
          <Link to="/notes">
            <span>Writing</span>
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>
          <a
            href="https://x.com/mnah05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              <span>Follow me</span>
            </span>
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
            onClick={() => applyTheme(isDark ? "light" : "dark")}
          >
            <span className="icon-stack" aria-hidden="true">
              <svg
                className="icon-moon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 13.5A8 8 0 0 1 10.5 4 6.5 6.5 0 1 0 20 13.5Z" />
              </svg>
              <svg
                className="icon-sun"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
