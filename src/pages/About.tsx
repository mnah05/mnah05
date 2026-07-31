import BlogLayout from "../components/BlogLayout";

export default function About() {
	return (
		<BlogLayout title="About" description="About mnah" pubDate={new Date("August 08 2021")}>
			{/* TODO: personalize this bio with your own story. */}
			<p>
				Hi, I&apos;m mnah (Nauman Hasan). I build things &mdash; mostly small
				tools and experiments, from a key-value store and a Go analytics
				service to this very site.
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
