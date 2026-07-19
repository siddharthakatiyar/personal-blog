// ─── Content Data ──────────────────────────────────────────────────

export const terminalData = {
  about: `Siddhartha Katiyar

Backend & Infrastructure Engineer
SDE @ Jsmon

Currently building reliable systems for the AI era.

Interested in:
• Distributed Systems
• AI Infrastructure
• Databases
• Developer Tools`,

  experience: `2025 — Present

Software Development Engineer
Jsmon

• Migrated MongoDB → PostgreSQL
• Built distributed queue architecture
• Backend infrastructure

────────────────────────────────

2025

Technical Intern
Cisco Systems

• Wireless automation
• IOS-XE programmability
• TDL → YANG migration

────────────────────────────────

2024

Technology Intern
Fidelity International

• Crypto Custodian Platform
• AWS Infrastructure`,

  skills: `Languages

Go
Java
C++
Python
TypeScript

────────────────────────────────

Infrastructure

PostgreSQL
Redis
ClickHouse
RabbitMQ
Docker

────────────────────────────────

Cloud

AWS
GCP`,

  stats: `Experience
──────────────────────────────

SDE @ Jsmon              2025–Present
Codeforces Expert        1600+ rating
CodeChef                 ★★★★★

Focus
──────────────────────────────

Distributed Systems
Backend Infrastructure
AI Engineering

Current
──────────────────────────────

Building ContextOS
Writing technical blogs`,

  status: `Current Status
──────────────────────────────

Building:
  ✓ ContextOS — AI Context Engine

Reading:
  Designing Data-Intensive Applications

Learning:
  AI Agents
  Distributed Systems

Looking For:
  Interesting backend problems.`,

  whoami: `Siddhartha Katiyar
Backend & Infrastructure Engineer
SDE @ Jsmon`,
};

// ─── Projects ──────────────────────────────────────────────────────

export interface ProjectLinks {
  github?: string;
  docs?: string;
  npm?: string;
  site?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  links: ProjectLinks;
  tags: string[];
  detail: string;
}

export const projects: Project[] = [
  {
    id: "contextos",
    title: "ContextOS",
    description: "AI Context Engine",
    links: {
      github: "https://github.com/siddharthakatiyar/contextos",
      npm: "https://www.npmjs.com/package/@siddharthakatiyar/contextos",
    },
    tags: ["Go", "SQLite FTS5", "Semantic Retrieval", "Graph Expansion"],
    detail: `ContextOS — AI Context Engine

An intelligent context management layer for AI agents.
Uses SQLite FTS5 for semantic retrieval and graph
expansion to maintain long-term memory across sessions.

Built in Go. Designed for reliability at scale.`,
  },
  {
    id: "throttlex",
    title: "ThrottleX",
    description: "Distributed Rate Limiter",
    links: {
      github: "https://github.com/siddharthakatiyar/throttleX",
      docs: "https://throttlex.siddhartha.work",
    },
    tags: ["Go", "Redis", "gRPC", "PostgreSQL"],
    detail: `ThrottleX — Distributed Rate Limiter

High-performance distributed rate limiting library.
Token bucket and sliding window algorithms over Redis.
gRPC-based for ultra-low latency in microservice environments.`,
  },
  {
    id: "jsmon",
    title: "Jsmon",
    description: "Attack Surface Management",
    links: {
      site: "https://jsmon.sh",
    },
    tags: ["Go", "PostgreSQL", "Microservices", "Queue Architecture"],
    detail: `Jsmon — Attack Surface Management

Backend infrastructure for automated JavaScript
file monitoring and security analysis at scale.
Distributed microservices with robust queue architecture.`,
  },
];

// ─── Virtual Filesystem ─────────────────────────────────────────────

export type FSNode =
  | { type: "file"; content: string }
  | { type: "dir"; children: Record<string, FSNode> };

export const filesystem: Record<string, FSNode> = {
  "about.txt": {
    type: "file",
    content: terminalData.about,
  },
  "skills.json": {
    type: "file",
    content: `{
  "languages": ["Go", "Java", "C++", "Python", "TypeScript"],
  "infrastructure": ["PostgreSQL", "Redis", "ClickHouse", "RabbitMQ", "Docker"],
  "cloud": ["AWS", "GCP"]
}`,
  },
  "resume.pdf": {
    type: "file",
    content: "Opening resume.pdf...\n\n✓ Success",
  },
  "status.txt": {
    type: "file",
    content: terminalData.status,
  },
  experience: {
    type: "dir",
    children: {
      "jsmon.txt": {
        type: "file",
        content: `2025 — Present

Software Development Engineer
Jsmon

• Migrated MongoDB → PostgreSQL
• Built distributed queue architecture
• Backend infrastructure`,
      },
      "cisco.txt": {
        type: "file",
        content: `2025

Technical Intern
Cisco Systems

• Wireless automation
• IOS-XE programmability
• TDL → YANG migration`,
      },
      "fidelity.txt": {
        type: "file",
        content: `2024

Technology Intern
Fidelity International

• Crypto Custodian Platform
• AWS Infrastructure`,
      },
    },
  },
  projects: {
    type: "dir",
    children: {
      "contextos.md": {
        type: "file",
        content: projects.find(p => p.id === "contextos")!.detail,
      },
      "throttlex.md": {
        type: "file",
        content: projects.find(p => p.id === "throttlex")!.detail,
      },
      "jsmon.md": {
        type: "file",
        content: projects.find(p => p.id === "jsmon")!.detail,
      },
    },
  },
  blog: {
    type: "dir",
    children: {},
  },
};

// ─── Available Commands ─────────────────────────────────────────────

export const availableCommands = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "blog",
  "resume",
  "github",
  "linkedin",
  "contact",
  "stats",
  "status",
  "whoami",
  "pwd",
  "ls",
  "clear",
  "theme",
  "open-post",
  "open contextos",
  "open throttlex",
  "open jsmon",
  "cd",
  "cat",
];
