export const terminalData = {
  about: `I'm Siddhartha Katiyar.
SDE at Jsmon · Backend Infrastructure

I'm interested in how AI changes the way software systems are designed, 
maintained, and scaled — especially around memory, reliability, 
and developer workflows.`,
  
  experience: `2024 - Present

Software Development Engineer I
Jsmon
• PostgreSQL migration
• Queue architecture
• Distributed services

2025

Technical Intern
Cisco Systems
• Wireless Automation
• TDL to YANG migration

2024

Technology Intern
Fidelity International
• Crypto Custodian
• AWS Infrastructure`,

  projects: [
    {
      id: "contextos",
      title: "ContextOS",
      description: "AI Context Engine",
      linkText: "npm • GitHub • Docs",
      tags: ["SQLite FTS5", "Semantic Retrieval", "Graph Expansion"]
    },
    {
      id: "throttlex",
      title: "ThrottleX",
      description: "Distributed Rate Limiter",
      linkText: "GitHub • Docs",
      tags: ["Go", "Redis", "gRPC", "PostgreSQL"]
    },
    {
      id: "jsmon",
      title: "Jsmon",
      description: "Backend Infrastructure",
      linkText: "Attack Surface Management",
      tags: ["Microservices", "Queue Architecture"]
    }
  ],

  skills: `Languages
Go, Java, C++, Python, TypeScript

Infrastructure
PostgreSQL, Redis, RabbitMQ, Docker, ClickHouse

Cloud
AWS, GCP`,
};

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
  "clear",
  "theme",
  "open contextos",
  "open throttlex",
  "open jsmon"
];
