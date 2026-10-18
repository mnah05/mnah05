import {
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/header.css";
import "../styles/footer.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
      { name: "color-scheme", content: "light" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" },
      { rel: "sitemap", href: "/sitemap-index.xml" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "8c9a6f2e16c944d9b9e479f53387f7b2"}'
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
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
