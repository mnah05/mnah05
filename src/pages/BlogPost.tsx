import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import BlogLayout from "../components/BlogLayout";
import { getPost } from "../posts";

export default function BlogPost() {
	const { slug = "" } = useParams();
	const post = getPost(slug);

	if (!post) {
		return (
			<>
				<Seo title="Not found" description="Post not found" />
				<Header />
				<main>
					<p>
						Post not found. <Link to="/blog">Back to blog</Link>
					</p>
				</main>
				<Footer />
			</>
		);
	}

	return (
		<BlogLayout
			title={post.title}
			description={post.description}
			pubDate={post.pubDate}
			updatedDate={post.updatedDate}
			heroImage={post.heroImage}
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
		</BlogLayout>
	);
}
