import BlogLayout from "../components/BlogLayout";

export default function Colophon() {
	return (
		<BlogLayout
			title="Colophon"
			description="How this site is built and deployed"
			pubDate={new Date("August 25 2026")}
		>
			<p>
				This site is a single-page app built with{" "}
				<a href="https://react.dev" target="_blank" rel="noopener noreferrer">
					React
				</a>{" "}
				and{" "}
				<a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
					TypeScript
				</a>
				, bundled by{" "}
				<a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
					Vite
				</a>
				. Blog posts are written in Markdown and rendered with react-markdown.
			</p>

			<p>
				It is deployed as static assets on{" "}
				<a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer">
					Cloudflare Workers
				</a>
				, with unknown routes falling back to the app for client-side routing.
			</p>

			<p>
				The design is flat editorial minimal: warm paper tones in light mode,
				a deep ink palette in dark mode, all driven by CSS custom properties
				with a theme toggle persisted to local storage.
			</p>

			<p>
				Type is set in Newsreader for display headings and Atkinson Hyperlegible
				for body text, both self-hosted.
			</p>
		</BlogLayout>
	);
}
