import BlogLayout from "../components/BlogLayout";

export default function About() {
	return (
		<BlogLayout title="About" description="About mnah" pubDate={new Date("August 08 2021")}>
			<p>
				Hi, I&apos;m mnah (Nauman Hasan). I build things for fun — backend systems,
				developer tools, and small experiments on the web. Most of it lives in Go,
				TypeScript, and the Cloudflare ecosystem.
			</p>

			<p>
				There is no big plan here. I am more of a free spirit: I work on whatever I
				find interesting, keep what I like, and drop the rest. When I am not coding,
				I am probably reading or writing about something I got curious about.
			</p>

			<p>
				You can find my projects on{" "}
				<a href="https://github.com/mnah05" target="_blank" rel="noopener noreferrer">
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
		</BlogLayout>
	);
}
