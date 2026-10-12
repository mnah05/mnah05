import { createFileRoute } from "@tanstack/react-router";
import "../styles/not-found.css";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "404 — not found" },
      { name: "description", content: "Page not found" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/404" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="not-found-code">404</span>
      <h1>Nothing here</h1>
      <p className="not-found-message">
        This page doesn&apos;t exist. It may have moved, or the link is wrong.
      </p>
      <div className="not-found-actions">
        <a className="button button-primary" href="/">
          Home
        </a>
        <a className="button button-secondary" href="/notes">
          Notes
        </a>
        <a className="button button-secondary" href="/about">
          About
        </a>
      </div>
    </main>
  );
}
