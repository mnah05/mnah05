export type Education = {
  school: string;
  years: string;
  degree: string;
  location: string;
  coursework?: string;
};

export type Project = {
  name: string;
  tech: string;
  link?: { label: string; href: string };
  year: string;
  points: string[];
};

export type SkillGroup = {
  category: string;
  items: string;
};

export const resume = {
  name: "Md Nauman Athar Hasan",
  location: "Kolkata, India",
  email: "workwithnauman@gmail.com",
  links: [
    { label: "mnah.dev", href: "https://mnah.dev" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nauman-hasan-53a66630a/",
    },
    { label: "GitHub", href: "https://github.com/mnah05" },
    { label: "LeetCode", href: "https://leetcode.com/u/mnah05" },
  ],
  education: [
    {
      school: "Dehradun Institute of Technology (DIT)",
      years: "2024 -- 2028",
      degree: "B.Tech in Computer Science and Engineering",
      location: "Dehradun, India",
      coursework: "Data Structures & Algorithms, Operating Systems, DBMS",
    },
    {
      school: "St. Thomas' Day School",
      years: "2024",
      degree: "Higher Secondary (10+2)",
      location: "Kolkata, India",
    },
  ] satisfies Education[],
  projects: [
    {
      name: "Envitoo",
      tech: "Go, PostgreSQL, Redis, NATS JetStream, Clerk",
      link: { label: "Live", href: "https://envitoo.mnah.dev/" },
      year: "",
      points: [
        "Built a production-grade event management platform with a transactional outbox pattern over NATS JetStream, powering reliable async delivery of OTP and ticket-confirmation emails via Resend",
        "Implemented Clerk-based auth with lazy user provisioning, Redis-backed OTP verification (HMAC-SHA256), and QR-code check-in via signed access tokens for guest registration and ticketing",
        "Built volunteer application management system; deployed on a Linode server behind Caddy with automatic HTTPS",
      ],
    },
    {
      name: "go-analytics",
      tech: "Go, PostgreSQL, Redis, Asynq, Chi",
      link: { label: "GitHub", href: "https://github.com/mnah05/go-analytics" },
      year: "",
      points: [
        "Built a high-performance URL shortener with real-time click analytics achieving 4,500 req/s sustained throughput and 0.8ms p50 redirect latency, validated via k6 benchmarks on a production-grade setup",
        "Architected an async event pipeline using Redis Streams and Asynq workers to batch-write click events into PostgreSQL, decoupling hot redirect paths from analytics writes and eliminating database bottlenecks under load",
        "Implemented pre-computed analytics rollups using PostgreSQL JSONB, collapsing millions of raw event rows into ~30 rows per dashboard query, and designed a Redis caching layer with 30-day TTL for slug lookups",
      ],
    },
    {
      name: "Nexus KV",
      tech: "Go, Raft Consensus, WAL, Docker",
      link: { label: "GitHub", href: "https://github.com/mnah05/nexus" },
      year: "",
      points: [
        "Built a persistent, distributed key-value store in Go implementing the Raft consensus protocol for leader election, replicated writes, and read replicas across a multi-node cluster",
        "Engineered WAL-backed durability with atomic snapshotting and automatic compaction, exposing operational endpoints (raft status, health/readiness checks, metrics) for cluster observability",
        "Built an embedded web dashboard for real-time cluster inspection and containerized the stack with Docker Compose, supporting one-command startup of a 3-node local cluster",
      ],
    },
  ] satisfies Project[],
  skills: [
    { category: "Languages", items: "Go, TypeScript, JavaScript, SQL" },
    {
      category: "Backend",
      items: "Go, Hono, Node.js, REST APIs, JWT Authentication, Clerk",
    },
    {
      category: "Databases",
      items: "PostgreSQL, MySQL, Redis, SQLC, Supabase, Database Design",
    },
    {
      category: "Cloud & Infra",
      items:
        "Cloudflare Workers, Cloudflare R2, Wrangler, Docker, Docker Compose, NATS JetStream, Git, Linux, golang-migrate, zerolog, GitHub Actions",
    },
    {
      category: "Concepts",
      items:
        "Async Job Processing, Redis Streams, Write-Behind Caching, Rate Limiting, Idempotency, Graceful Shutdown",
    },
  ] satisfies SkillGroup[],
} as const;
