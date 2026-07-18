import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import {
  Mail,
  Download,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  FolderGit2
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Siddhartha Katiyar",
  description:
    "Software Engineer at Jsmon specializing in backend infrastructure, security systems, and distributed systems.",
};

const interests = [
  "Infrastructure for AI systems",
  "Developer tooling",
  "Memory/context systems",
  "Backend reliability",
  "Distributed systems",
  "Execution velocity with AI"
];

const experience = [
  {
    company: "Jsmon",
    role: "Software Development Engineer I",
    period: "Nov 2024 – Present",
    url: "https://jsmon.sh",
    highlights: [
      "Designed a distributed event-driven microservices platform using Redis queues, enabling independently scalable asynchronous backend workflows.",
      "Developed an Aggregator service for distributed workflow orchestration, retries, and failure recovery across asynchronous backend services.",
      "Led the design and implementation of a centralized PostgreSQL Writer for asynchronous persistence, batched SQL execution, and Redis cache invalidation, sustaining production workloads exceeding 2,000 queued jobs/sec.",
      "Architected a normalized PostgreSQL schema and led the migration from MongoDB to PostgreSQL, supporting 500M+ records while reducing worst-case query latency from 10 minutes to 25 seconds through schema redesign and SQL optimization.",
      "Built a distributed ingestion pipeline using AWS EC2 workers to collect Common Crawl and Wayback Machine data, storing append-heavy datasets in ClickHouse for security analytics.",
    ],
    skills: ["Go", "PostgreSQL", "Redis", "ClickHouse", "AWS", "Microservices"],
  },
  {
    company: "Cisco Systems",
    role: "Technical Intern",
    period: "Jan 2025 – Jun 2025",
    url: "https://cisco.com",
    highlights: [
      "Built a CLI tool mapping legacy TDL configurations to YANG models, reducing Cisco IOS-XE migration lookup time from hours to 30 seconds.",
      "Built a FastAPI dashboard visualizing TDL-to-YANG migration progress and test coverage.",
    ],
    skills: ["Python", "FastAPI", "YANG", "CLI"],
  },
  {
    company: "Fidelity International",
    role: "FTC – Technology Intern",
    period: "Jun 2024 – Jul 2024",
    url: "https://fidelityinternational.com",
    highlights: [
      "Designed private key management strategies and reverse-engineered the MetaMask extension for a custom custodian crypto wallet.",
      "Implemented secure backend infrastructure on AWS for managing high-value digital assets.",
    ],
    skills: ["ReactJS", "ExpressJS", "AWS", "Ethers.js"],
  },
  {
    company: "Siemens",
    role: "Software Engineer Intern",
    period: "Jun 2023 – Jul 2023",
    url: "https://siemens.com",
    highlights: [
      "Built 'ChatConnect,' a full-stack real-time messaging application using Java, Spring Boot, and PostgreSQL.",
    ],
    skills: ["Spring Boot", "Next.js", "PostgreSQL"],
  },
];

const projects = [
  {
    title: "ContextOS — AI Memory Layer",
    url: "https://github.com/siddharthakatiyar",
    highlights: [
      "Built an AI memory layer implementing Model Context Protocol (MCP) for persistent, low-latency context retrieval across repositories.",
      "Architected a hybrid semantic retrieval engine combining SQLite FTS5 (BM25), identifier-aware search, graph expansion, and intent-aware ranking for low-latency retrieval across large codebases.",
    ],
    skills: ["SQLite FTS5", "MCP", "Search Ranking", "Graphs"],
  },
  {
    title: "ThrottleX — Distributed API Scheduling Platform",
    url: "https://github.com/siddharthakatiyar/throttleX",
    highlights: [
      "Designed a distributed scheduler maximizing throughput while enforcing third-party API rate limits.",
      "Architected a Redis-backed scheduler combining time-weighted priority queues, Deficit Round Robin (DRR), tenant isolation, and atomic Lua-based dequeuing to ensure fair, fault-tolerant request scheduling.",
    ],
    skills: ["Redis", "Lua", "Scheduling", "DRR"],
  },
];

const awards = [
  {
    title: "Codeforces Expert",
    description: "Max Rating: 1735 — Best Global Rank: 381 / 38,000+",
    link: "https://codeforces.com/profile/sidXIX",
  },
  {
    title: "CodeChef 5-Star",
    description: "Max Rating: 2068",
    link: "https://www.codechef.com/users/siddharthakat",
  },
  {
    title: "LeetCode Knight",
    description: "Peak Rating: 1895 (Top 5% globally)",
    link: "https://leetcode.com/u/siddharthakatiyar25/",
  },
  {
    title: "NTSE Scholar",
    description: "Awarded the National Talent Search Scholarship by NCERT (2019)",
    link: "",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-8 py-16 md:py-24">
      <div className="glass-panel rounded-3xl p-6 md:p-10">
        {/* Header / Hero */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 text-center md:text-left">
        <Image
          src="/profile.jpeg"
          alt="Siddhartha Katiyar"
          width={120}
          height={120}
          className="rounded-full border border-border object-cover shrink-0"
          priority
        />
        <div className="flex-1 w-full">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Siddhartha Katiyar</h1>
            <p className="text-muted-foreground font-medium">SDE at Jsmon · Backend Infrastructure</p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm mb-6">
            <MapPin className="h-4 w-4" />
            <span>India</span>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            I'm interested in how AI changes the way software systems are designed, maintained, and scaled — especially around memory, reliability, and developer workflows. Currently building security infrastructure at Jsmon, where I work on distributed systems, database migrations, and high-throughput ingestion pipelines.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <Link
              href="https://github.com/siddharthakatiyar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Icons.gitHub className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/siddharthakat25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Icons.twitter className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/siddharthakatiyar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:siddharthakatiyar25@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* What I'm Interested In */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">What I'm Interested In</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {interests.map((interest, i) => (
            <li key={i} className="flex items-center gap-3 text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
              <span>{interest}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-12" />

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Experience</h2>
        </div>

        <div className="space-y-10">
          {experience.map((job) => (
            <div key={job.company} className="relative pl-4 md:pl-0">
              <div className="hidden md:block absolute left-[-21px] top-2 h-2 w-2 rounded-full bg-border" />
              <div className="hidden md:block absolute left-[-18px] top-4 bottom-[-32px] w-px bg-border/50" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-foreground">{job.role}</h3>
                  <span className="text-muted-foreground hidden sm:inline">at</span>
                  <Link
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {job.company}
                  </Link>
                </div>
                <span className="text-sm text-muted-foreground font-mono shrink-0">{job.period}</span>
              </div>
              
              <ul className="space-y-2 mb-4">
                {job.highlights.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3 items-start">
                    <span className="text-muted-foreground/50 mt-0.5">▹</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-normal bg-muted/50 text-muted-foreground">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Projects */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-8">
          <FolderGit2 className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Selected Projects</h2>
        </div>

        <div className="space-y-10">
          {projects.map((project) => (
            <div key={project.title} className="relative pl-4 md:pl-0">
              <div className="hidden md:block absolute left-[-21px] top-2 h-2 w-2 rounded-full bg-border" />
              <div className="hidden md:block absolute left-[-18px] top-4 bottom-[-32px] w-px bg-border/50" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-foreground">{project.title.split(' — ')[0]}</h3>
                  <span className="text-muted-foreground hidden sm:inline">—</span>
                  <span className="text-foreground/80 font-medium inline-flex items-center gap-1">
                    {project.title.split(' — ')[1]}
                  </span>
                </div>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm shrink-0 flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
              
              <ul className="space-y-2 mb-4">
                {project.highlights.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3 items-start">
                    <span className="text-muted-foreground/50 mt-0.5">▹</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-normal bg-muted/50 text-muted-foreground">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold tracking-tight">Education</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-foreground">B.Tech Computer Science</span> <br/>
            Jaypee Institute of Information Technology <br/>
            <span className="font-mono text-xs mt-1 block">2021 – 2025</span>
          </p>
        </section>

        {/* Awards */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold tracking-tight">Honors</h2>
          </div>
          <ul className="space-y-4">
            {awards.map((award) => (
              <li key={award.title} className="text-sm">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-foreground">{award.title}</span>
                  {award.link && (
                    <Link
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">{award.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      </div>

      <Separator className="my-16" />
      
      {/* Contact CTA */}
      <section className="pb-12 text-center">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-primary-foreground/50 opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-muted/20 border border-border/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Interested in working together?</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              I'm always looking for interesting backend challenges and security projects. 
              Whether it's a freelance gig, a consulting opportunity, or just to say hi — 
              I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                render={<Link href="mailto:siddharthakatiyar25@gmail.com" />} 
                size="default" 
                nativeButton={false}
                className="px-6 w-full sm:w-auto"
              >
                Send an email
              </Button>
              <Button 
                render={<Link href="https://x.com/siddharthakat25" target="_blank" />} 
                variant="outline" 
                size="default" 
                nativeButton={false}
                className="px-6 w-full sm:w-auto"
              >
                DM on X
              </Button>
              <Button
                render={
                  <Link
                    href="https://drive.google.com/uc?export=download&id=1329MhUVB6r8BQlW9ZNsfXzXcp71cB9Pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                variant="ghost"
                className="px-4 w-full sm:w-auto gap-2 text-muted-foreground hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                Résumé
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
