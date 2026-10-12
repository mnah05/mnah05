import { createFileRoute } from "@tanstack/react-router";
import NotesLayout from "../components/NotesLayout";

export const Route = createFileRoute("/colophon")({
  head: () => ({
    meta: [
      { title: "Colophon" },
      { name: "description", content: "How this site is built and deployed" },
      { property: "og:title", content: "Colophon" },
      {
        property: "og:description",
        content: "How this site is built and deployed",
      },
      { property: "og:url", content: "https://mnah.dev/colophon" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/colophon" }],
  }),
  component: Colophon,
});

function Colophon() {
  return (
    <NotesLayout title="Colophon" pubDate={new Date("August 25 2026")}>
      <p>
        This site is built with{" "}
        <a
          href="https://tanstack.com/start"
          target="_blank"
          rel="noopener noreferrer"
        >
          TanStack Start
        </a>{" "}
        and React. I write notes in Markdown, and they are turned into web
        pages at build time.
      </p>
      <p>
        The site is deployed as static files on{" "}
        <a
          href="https://workers.cloudflare.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Workers
        </a>
        . Unknown routes are sent to the app so navigation works without a
        full page reload.
      </p>
      <p>
        The design is minimal and text-first, inspired by rauchg.com: a centered
        column, year-grouped index lists with view counts, and pill hover
        highlights — with light and dark themes. Use the sun/moon button in the
        header to switch — your choice is remembered.
      </p>
      <p>
        Body text is set in the system sans stack; view counts are served by a
        small Cloudflare Worker backed by D1.
      </p>
      <details>
        <summary>One small secret</summary>
        <p>
          If you found this, you have earned an imaginary coffee. Keep looking
          closely.
        </p>
      </details>
    </NotesLayout>
  );
}
