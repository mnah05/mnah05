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

const THEME_SCRIPT = `(function(){try{var saved=localStorage.getItem("theme");var theme=saved==="light"||saved==="dark"?saved:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(theme==="dark")document.documentElement.setAttribute("data-theme","dark");else document.documentElement.removeAttribute("data-theme");var meta=document.getElementById("meta-theme-color");if(meta)meta.setAttribute("content",theme==="dark"?"#0a0a0a":"#ffffff");}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" },
      { rel: "sitemap", href: "/sitemap-index.xml" },
    ],
    scripts: [
      {
        children: THEME_SCRIPT,
      },
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
