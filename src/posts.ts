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

function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
	if (!match) {
		throw new Error("Missing frontmatter");
	}
	const data: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const sep = line.indexOf(":");
		if (sep === -1) continue;
		const key = line.slice(0, sep).trim();
		const value = line.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
		data[key] = value;
	}
	return {
		data: data as unknown as Frontmatter,
		content: raw.slice(match[0].length),
	};
}

export const posts: Post[] = Object.entries(modules)
	.map(([path, raw]) => {
		const slug = path.split("/").pop()!.replace(/\.md$/, "");
		const { data, content } = parseFrontmatter(raw as string);
		return { slug, ...data, content };
	})
	.sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}
