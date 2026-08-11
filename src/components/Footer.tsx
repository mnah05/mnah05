import "../styles/footer.css";

const SOCIALS = [
	{ label: "gh", href: "https://github.com/mnah05/" },
	{ label: "x", href: "https://x.com/mnah05" },
	{
		label: "in",
		href: "https://www.linkedin.com/in/nauman-hasan-53a66630a/",
	},
	{ label: "email", href: "mailto:workwithnauman@gmail.com" },
];

export default function Footer() {
	return (
		<footer>
			<div className="footer-inner">
				<p className="copyright">&copy; {new Date().getFullYear()} mnah</p>
				<ul className="footer-links">
					{SOCIALS.map((s) => (
						<li key={s.label}>
							<a href={s.href} target="_blank" rel="noopener noreferrer">
								{s.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
