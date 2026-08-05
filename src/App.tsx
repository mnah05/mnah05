import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Seo from "./components/Seo";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/resume" element={<Resume />} />
			<Route path="/blog" element={<BlogIndex />} />
			<Route path="/blog/:slug" element={<BlogPost />} />
			<Route
				path="*"
				element={
					<>
						<Seo title="Not found" description="Page not found" />
						<Header />
						<main>
							<p>
								Page not found. <Link to="/">Back to home</Link>
							</p>
						</main>
						<Footer />
					</>
				}
			/>
		</Routes>
	);
}
