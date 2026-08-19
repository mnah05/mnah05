import frontMatter from "front-matter";

export interface Post {
	slug: string;
	title: string;
	description: string;
	pubDate: string;
	updatedDate?: string;
	heroImage?: string;
	content: string;
}

interface Frontmatter {
	title: string;
	description: string;
	pubDate: string;
	updatedDate?: string;
	heroImage?: string;
}

const modules = import.meta.glob("./content/blog/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
});

export const posts: Post[] = Object.entries(modules)
	.map(([path, raw]) => {
		const slug = path.split("/").pop()!.replace(/\.md$/, "");
		const { attributes, body } = frontMatter(raw as string);
		return { slug, ...(attributes as Frontmatter), content: body };
	})
	.sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}
