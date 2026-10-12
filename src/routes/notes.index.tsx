import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getAllNotes } from "../lib/notes";
import { scheduleViewCounts } from "../components/ProjectCard";
import "../styles/home.css";

export const Route = createFileRoute("/notes/")({
  head: () => ({
    meta: [
      { title: "Notes | hasan" },
      {
        name: "description",
        content: "Short notes and write-ups from Hasan.",
      },
      { property: "og:title", content: "Notes | hasan" },
      {
        property: "og:description",
        content: "Short notes and write-ups from Hasan.",
      },
      { property: "og:url", content: "https://mnah.dev/notes" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/notes" }],
  }),
  component: NotesIndex,
});

function NotesIndex() {
  const posts = getAllNotes();
  const viewSlugs = posts.map((post) => post.slug);

  useEffect(() => {
    scheduleViewCounts(viewSlugs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let lastYear: number | null = null;

  return (
    <main>
      {posts.length === 0 ? (
        <p>Brewing new notes soon.</p>
      ) : (
        <ul className="index-list">
          {posts.map((post) => {
            const year = post.pubDate.getFullYear();
            const showYear = year !== lastYear;
            lastYear = year;
            return (
              <li className="group" key={post.slug}>
                <Link to="/notes/$slug" params={{ slug: post.slug }}>
                  <span className="index-row">
                    {showYear ? (
                      <>
                        <span className="index-year">{year}</span>
                        <span className="index-title-wrap">
                          <span className="index-title">{post.title}</span>
                        </span>
                      </>
                    ) : (
                      <span className="index-row-indented index-title-wrap">
                        <span className="index-title">{post.title}</span>
                      </span>
                    )}
                    <span className="index-views" data-view-count={post.slug}>
                      —
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
