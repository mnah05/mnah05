export type ProjectStatus = {
	tone: "down" | "live";
	label: string;
	note: string;
};

export type ProjectGithub = {
	url?: string;
	note?: string;
};

export type Project = {
	slug: string;
	name: string;
	tagline: string;
	short: string;
	summary: string[];
	highlights: string[];
	stack: string[];
	year: number;
	status: ProjectStatus;
	liveUrl?: string;
	github?: ProjectGithub;
};

export const PROJECTS: Project[] = [
	{
		slug: "envitoo",
		name: "Envitoo",
		tagline: "Event management with ticketing, QR check-in, and volunteer coordination.",
		short: "An event platform for tickets, guest check-in, and volunteer coordination.",
		summary: [
			"Envitoo helps organizers sell tickets, check in guests with QR codes, and coordinate volunteers.",
			"It is designed to deliver important messages, such as login codes and ticket confirmations, even when several services are working at the same time.",
		],
		highlights: [
			"Transactional outbox over NATS JetStream for reliable async delivery of OTP and ticket-confirmation emails via Resend",
			"Clerk-based auth with lazy user provisioning, and Redis-backed OTP verification (HMAC-SHA256)",
			"QR-code check-in via signed access tokens for guest registration and ticketing",
			"Volunteer application management system, deployed behind Caddy with automatic HTTPS",
		],
		stack: ["Go", "PostgreSQL", "Redis", "NATS JetStream", "Clerk", "Resend"],
		year: 2026,
		status: {
			tone: "live",
			label: "Live",
			note: "The app is deployed and available to use.",
		},
		liveUrl: "https://envitoo.mnah.dev/",
		github: {
			note: "The source is private for now. Reach out on GitHub if you would like access.",
		},
	},
	{
		slug: "go-analytics",
		name: "go-analytics",
		tagline: "A fast URL shortener with click tracking that runs in the background.",
		short: "A fast URL shortener that also records useful click statistics.",
		summary: [
			"go-analytics redirects visitors quickly and records each click in the background. This keeps the main redirect path fast.",
			"Its dashboards use prepared summaries instead of scanning every click, so reports remain responsive as the project grows.",
		],
		highlights: [
			"Sustained throughput of 4,500 req/s with 0.8ms p50 redirect latency, validated via k6 benchmarks on a production-grade setup",
			"Async event pipeline over Redis Streams and Asynq that batch-writes click events into PostgreSQL, decoupling hot paths from analytics writes",
			"Pre-computed analytics rollups in PostgreSQL JSONB collapsing millions of raw rows into ~30 rows per dashboard query",
			"Redis caching layer with 30-day TTL for slug lookups",
		],
		stack: ["Go", "PostgreSQL", "Redis", "Asynq", "Chi"],
		year: 2026,
		status: {
			tone: "down",
			label: "Not deployed",
			note: "There is no hosted instance running right now. The codebase is public on GitHub — check it out below.",
		},
		github: { url: "https://github.com/mnah05/go-analytics" },
	},
	{
		slug: "tripnest",
		name: "tripnest",
		tagline: "A backend for planning trips, building itineraries, and managing travel details.",
		short: "A backend for planning trips and organizing itineraries.",
		summary: [
			"Tripnest provides APIs for managing users, planning trips, and building itineraries.",
			"The project keeps data reliable with checked database queries, tracked schema changes, and a setup that runs consistently with Docker Compose.",
		],
		highlights: [
			"RESTful APIs for user management, trip planning, and itinerary workflows with JWT-based auth middleware",
			"SQLC-generated type-safe queries and golang-migrate for version-controlled schema migrations",
			"Strict separation between handlers, services, and data access layers for maintainability and testability",
			"Full stack containerized with Docker Compose",
		],
		stack: ["Go", "MySQL", "SQLC", "Chi", "JWT", "Docker"],
		year: 2026,
		status: {
			tone: "down",
			label: "Not deployed",
			note: "There is no hosted instance running right now. The codebase is public on GitHub — check it out below.",
		},
		github: { url: "https://github.com/mnah05/tripnest" },
	},
	{
		slug: "nexus",
		name: "nexus",
		tagline: "A data store that keeps information synchronized across several servers.",
		short: "A distributed key-value store that keeps copies of data in sync.",
		summary: [
			"nexus stores key-value data across several servers and keeps those copies synchronized. If the current leader fails, another server can take over automatically.",
			"Every change is recorded before it is applied, which helps the system recover safely. Servers that are not leaders can still handle reads.",
			"It runs as one Go binary and includes a dashboard for viewing the cluster, changing values, and checking basic metrics.",
		],
		highlights: [
			"3-node Raft cluster with randomized election timers (150–300ms), 50ms heartbeats, and automatic leader failover in ~200ms without split-brain",
			"Write-ahead logging with monotonic indices and atomic snapshots (temp file + rename) with WAL truncation to keep log sizes bounded",
			"Primary-read replicas — followers serve local reads, reject writes, and report the current leader",
			"Embedded dark-mode web dashboard with live cluster topology, key-value mutator, key table, metrics, and activity terminal",
			"Zero-dependency single binary with UI assets embedded via embed.FS, plus /metrics, /healthz, /readyz, and /debug/pprof",
		],
		stack: ["Go", "Raft", "WAL", "Docker", "Makefile"],
		year: 2026,
		status: {
			tone: "down",
			label: "Not deployed",
			note: "There is no hosted instance running right now — it runs locally. The codebase is public on GitHub — check it out below.",
		},
		github: { url: "https://github.com/mnah05/nexus" },
	},
];

export const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
