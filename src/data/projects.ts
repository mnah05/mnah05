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
		short: "A production-grade event management platform with reliable async delivery.",
		summary: [
			"Envitoo is an event management platform built around three flows organizers actually need: selling and validating tickets, checking guests in with QR codes, and coordinating volunteers for an event.",
			"Reliability is the throughline. All async work — OTP emails, ticket confirmations, and other side effects — is fanned out through a transactional outbox pattern over NATS JetStream, so nothing gets lost between the database and the message bus.",
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
			tone: "down",
			label: "Currently offline",
			note: "The live app is not deployed right now, so this page stands in for it. The project is still actively developed.",
		},
		github: {
			note: "The source is private for now. Reach out on GitHub if you would like access.",
		},
	},
	{
		slug: "go-analytics",
		name: "go-analytics",
		tagline: "High-performance URL shortener with real-time click analytics and async workers.",
		short: "A URL shortener built to survive read-heavy traffic without sacrificing analytics.",
		summary: [
			"go-analytics is a URL shortener that treats the hot redirect path as sacred and pushes everything else out of the way. Lookups are served from a Redis cache while clicks flow through Redis Streams into Asynq workers that batch-write to PostgreSQL.",
			"The result is a redirect path that stays fast under load, and dashboards that query pre-computed rollups instead of raw event rows.",
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
		tagline: "Travel planning backend with type-safe SQL, migrations, and Dockerized services.",
		short: "A travel-focused backend for trip and itinerary workflows.",
		summary: [
			"Tripnest is a travel planning backend exposing RESTful APIs for user management, trip planning, and itinerary workflows.",
			"Correctness comes first: queries are generated type-safe with SQLC, schemas evolve through version-controlled golang-migrate migrations, and the whole stack is containerized with Docker Compose.",
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
];

export const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
