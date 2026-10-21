import type { ReactNode } from "react";
import FormattedDate from "./FormattedDate";
import ViewCounter from "./ViewCounter";
import "../styles/notes-post.css";

type Props = {
  title: string;
  pubDate: string | Date;
  updatedDate?: string | Date;
  heroImage?: string;
  slug?: string;
  children: ReactNode;
};

export default function NotesLayout({
  title,
  pubDate,
  updatedDate,
  heroImage,
  slug,
  children,
}: Props) {
  return (
    <main className="notes-post-page">
      <article className="post-article">
        <h1>{title}</h1>
        <div className="post-meta-line">
          <a
            href="https://x.com/notagujjuu"
            target="_blank"
            rel="noopener noreferrer"
          >
            @notagujjuu
          </a>
          <span>|</span>
          <FormattedDate date={pubDate} />
          {updatedDate && (
            <span>
              (Updated <FormattedDate date={updatedDate} />)
            </span>
          )}
          {slug && (
            <span>
              <ViewCounter slug={slug} />
            </span>
          )}
        </div>
        {heroImage && (
          <div className="hero-image">
            <img width="1020" height="510" src={heroImage} alt="" />
          </div>
        )}
        <div className="post-content">{children}</div>
      </article>
    </main>
  );
}
