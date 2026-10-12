import { createFileRoute } from "@tanstack/react-router";
import NotesLayout from "../components/NotesLayout";
import { getNoteComponent, getNoteMeta, getNoteSlugs } from "../lib/notes";

export const Route = createFileRoute("/notes/$slug")({
  head: ({ params }: { params: { slug: string } }) => {
    const meta = getNoteMeta(params.slug);
    if (!meta) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        {
          property: "og:url",
          content: `https://mnah.dev/notes/${meta.slug}`,
        },
      ],
      links: [
        { rel: "canonical", href: `https://mnah.dev/notes/${meta.slug}` },
      ],
    };
  },
  component: NotePage,
});

export function getNoteStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

function NotePage() {
  const { slug } = Route.useParams();
  const meta = getNoteMeta(slug);
  if (!meta) {
    return (
      <main>
        <h1>Not found</h1>
      </main>
    );
  }
  const Content = getNoteComponent(slug);
  if (!Content) {
    return (
      <main>
        <h1>Not found</h1>
      </main>
    );
  }
  return (
    <NotesLayout
      title={meta.title}
      pubDate={meta.pubDate}
      updatedDate={meta.updatedDate}
      heroImage={meta.heroImage}
      slug={meta.slug}
    >
      <Content />
    </NotesLayout>
  );
}
