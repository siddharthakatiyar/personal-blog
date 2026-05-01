import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Siddhartha Katiyar",
  description:
    "Software Engineer at Jsmon specializing in backend infrastructure, security systems, and distributed systems.",
};

const experience = [
  {
    company: "Jsmon",
    role: "Software Development Engineer I",
    period: "Nov 2024 – Present",
    location: "Noida",
    url: "https://jsmon.sh",
    highlights: [
      "Led a major 110M+ row database migration from MongoDB to PostgreSQL for a high-traffic security platform.",
      "Designed and implemented a distributed caching layer using Redis, improving response times by 80%.",
      "Refactored monolithic backend services into event-driven microservices to handle 10k+ requests/second.",
      "Developed a high-throughput web artifact ingestion pipeline using AWS, ClickHouse, and TypeScript.",
      "Built an Automated Attack Surface Management (ASM) system and a template engine for vulnerability detection.",
    ],
    skills: ["PostgreSQL", "Redis", "TypeScript", "AWS", "ClickHouse", "Go"],
  },
  {
    company: "Cisco",
    role: "Technical Intern I",
    period: "Jan 2025 – Jun 2025",
    location: "Bengaluru",
    url: "https://cisco.com",
    highlights: [
      "Developed a Programmability Dashboard for Cisco's Polaris OS (CLI, TDL, YANG models).",
      "Built a zero-installation SSH CLI tool that reduced network analysis time in distributed environments by 98%.",
      "Implemented structured Python parsers for programmable interfaces across multiple network platforms.",
      "Created a React-based data visualization dashboard for analyzing network scalability impacts.",
    ],
    skills: ["Python", "React", "SSH", "YANG", "Network Automation"],
  },
  {
    company: "Fidelity International",
    role: "FTC – Technology Intern",
    period: "Jun 2024 – Jul 2024",
    location: "Gurugram",
    url: "https://fidelityinternational.com",
    highlights: [
      "Designed private key management strategies and reverse-engineered the MetaMask extension to build a custom custodian crypto wallet.",
      "Implemented secure backend infrastructure on AWS for managing high-value digital assets.",
      "Developed an Ethers.js integration module for seamless blockchain interaction within the wallet.",
    ],
    skills: ["ReactJS", "ExpressJS", "AWS", "Ethers.js", "Blockchain"],
  },
  {
    company: "Siemens",
    role: "Software Engineer Intern",
    period: "Jun 2023 – Jul 2023",
    location: "Gurugram",
    url: "https://siemens.com",
    highlights: [
      "Built 'ChatConnect,' a full-stack real-time messaging application using Java, Spring Boot, and PostgreSQL.",
      "Implemented a secure authentication system using Spring Security and JWT (HS256).",
      "Developed a responsive frontend with Next.js and integrated WebSocket for low-latency communication.",
    ],
    skills: ["Spring Boot", "Next.js", "PostgreSQL", "Spring Security"],
  },
];

const education = [
  {
    institution: "Jaypee Institute of Information Technology",
    degree: "B.Tech in Computer Science",
    period: "Oct 2021 – May 2025",
    location: "Noida, India",
  },
  {
    institution: "New Kingston Senior Secondary School",
    degree: "Intermediate (Class XII)",
    period: "2019 – 2021",
    location: "Kanpur, India",
  },
];

const skills = {
  "Backend & Systems": ["Node.js", "Go", "Python", "Java (Spring Boot)", "TypeScript", "FastAPI", "C++"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis", "ClickHouse", "MySQL"],
  "Cloud & Infrastructure": ["AWS", "GCP", "Docker", "Distributed Systems", "Linux"],
  "Frontend": ["React", "Next.js"],
};

const awards = [
  {
    title: "Codeforces Expert",
    description: "Peak Rating: 1735 (Top 0.8% in India)",
    link: "https://codeforces.com/profile/sidXIX",
  },
  {
    title: "CodeChef 5-Star",
    description: "Peak Rating: 2068 (Top 0.2% globally)",
    link: "https://www.codechef.com/users/siddharthakat",
  },
  {
    title: "LeetCode Knight",
    description: "Peak Rating: 1895 (Top 5% globally)",
    link: "https://leetcode.com/u/siddharthakatiyar25/",
  },
  {
    title: "NTSE Scholar",
    description: "Selected among top 2,000 students from 1M+ applicants nationwide.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-8 py-16 md:py-24">
      {/* Header / Hero */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 text-center md:text-left">
        <Image
          src="/profile.jpeg"
          alt="Siddhartha Katiyar"
          width={140}
          height={140}
          className="rounded-full border-2 border-border object-cover shrink-0"
          priority
        />
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Siddhartha Katiyar</h1>
              <p className="text-muted-foreground mt-1.5">Building Jsmon · Software Engineer</p>
            </div>
            <Button
              render={
                <Link
                  href="https://drive.google.com/uc?export=download&id=1329MhUVB6r8BQlW9ZNsfXzXcp71cB9Pl"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
              variant="outline"
              className="w-full sm:w-fit gap-2"
            >
              <Download className="h-4 w-4" />
              Download Résumé
            </Button>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4" />
            <span>India</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Software engineer specializing in production-grade security systems, backend infrastructure,
            and multi-language codebases. Currently at Jsmon, an early-stage attack surface management
            startup, where I design distributed systems and move fast on hard problems.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-6">
            <Link
              href="https://github.com/siddharthakatiyar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="GitHub"
            >
              <Icons.gitHub className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/siddharthakat25"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Twitter"
            >
              <Icons.twitter className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/siddharthakatiyar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:siddharthakatiyar25@gmail.com"
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Experience</h2>
        </div>

        <div className="space-y-4">
          {experience.map((job) => (
            <Card key={job.company} className="group">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-semibold">{job.role}</CardTitle>
                    </div>
                    <Link
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1 mt-0.5 w-fit"
                    >
                      {job.company}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="text-sm text-muted-foreground md:text-right shrink-0 mt-1 md:mt-0">
                    <div className="font-medium md:font-normal">{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2.5 mb-4">
                  {job.highlights.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-3 items-start">
                      <div className="size-1.5 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs font-normal">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 items-start">
          <div className="space-y-8">
            {Object.entries(skills).filter((_, i) => i % 2 === 0).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            {Object.entries(skills).filter((_, i) => i % 2 !== 0).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Education */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Education</h2>
        </div>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <div>
                <p className="font-medium text-sm">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
              </div>
              <div className="text-sm text-muted-foreground text-right shrink-0">
                <div>{edu.period}</div>
                <div>{edu.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Awards */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Honors & Awards</h2>
        </div>
        <ul className="space-y-6">
          {awards.map((award) => (
            <li key={award.title} className="flex gap-3 items-start">
              <div className="size-1.5 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{award.title}</span>
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {award.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Separator className="my-16" />
      
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                render={<Link href="mailto:siddharthakatiyar25@gmail.com" />} 
                size="default" 
                nativeButton={false}
                className="px-6"
              >
                Send an email
              </Button>
              <Button 
                render={<Link href="https://x.com/siddharthakat25" target="_blank" />} 
                variant="outline" 
                size="default" 
                nativeButton={false}
                className="px-6"
              >
                DM on X
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
