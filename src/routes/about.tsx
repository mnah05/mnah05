import { createFileRoute } from "@tanstack/react-router";
import NotesLayout from "../components/NotesLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About" },
      { name: "description", content: "About Hasan" },
      { property: "og:title", content: "About" },
      { property: "og:description", content: "About Hasan" },
      { property: "og:url", content: "https://mnah.dev/about" },
    ],
    links: [{ rel: "canonical", href: "https://mnah.dev/about" }],
  }),
  component: About,
});

function About() {
  return (
    <NotesLayout title="About" pubDate={new Date("August 08 2021")}>
      <p>
        Hi, I&apos;m Md Nauman Athar Hasan. I build backend systems, developer
        tools, and small web experiments. I usually work with Go, TypeScript,
        and Cloudflare.
      </p>
      <p>
        I work on ideas that I find interesting. Some become useful projects;
        others become lessons. When I am not coding, I am usually reading or
        writing about something I want to understand better.
      </p>
      <p>
        You can find my projects on{" "}
        <a
          href="https://github.com/mnah05"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        , follow me on{" "}
        <a href="https://x.com/mnah05" target="_blank" rel="noopener noreferrer">
          X
        </a>
        , or connect on{" "}
        <a
          href="https://www.linkedin.com/in/nauman-hasan-53a66630a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
      <p>
        I write longer posts on{" "}
        <a
          href="https://medium.com/@mnah05"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>{" "}
        and{" "}
        <a
          href="https://substack.com/@naumanhasan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Substack
        </a>
        . My{" "}
        <a
          href="https://workwithnauman.raindrop.page/reads-72899412"
          target="_blank"
          rel="noopener noreferrer"
        >
          reading list
        </a>{" "}
        is on Raindrop.
      </p>
    </NotesLayout>
  );
}
