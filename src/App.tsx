import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Colophon from "./pages/Colophon";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/colophon" element={<Colophon />} />
			<Route path="/resume" element={<Resume />} />
			<Route path="/blog" element={<BlogIndex />} />
			<Route path="/blog/:slug" element={<BlogPost />} />
			<Route
				path="*"
				element={<NotFound />}
			/>
		</Routes>
	);
}
