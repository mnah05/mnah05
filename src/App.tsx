import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Colophon from "./pages/Colophon";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/colophon" element={<Colophon />} />
			<Route path="/resume" element={<Resume />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/projects/:slug" element={<Project />} />
			<Route path="/blog" element={<BlogIndex />} />
			<Route path="/blog/:slug" element={<BlogPost />} />
			<Route
				path="*"
				element={<NotFound />}
			/>
		</Routes>
	);
}
