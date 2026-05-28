import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { ScrollFade } from "@/components/scroll-fade";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { getAllPosts } from "@/lib/blog";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const latestPosts = getAllPosts().filter(post => post.meta.status === "published").slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Siddhartha Katiyar",
    "url": "https://www.siddhartha.work",
    "jobTitle": "Systems Developer / Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Jsmon"
    },
    "sameAs": [
      "https://github.com/siddharthakatiyar",
      "https://x.com/siddharthakat25",
      "https://www.linkedin.com/in/siddharthakatiyar/"
    ],
    "knowsAbout": [
      "Distributed Systems",
      "Database Systems",
      "Go Programming Language",
      "API Rate Limiting",
      "Software Architecture",
      "High-Performance Systems"
    ]
  };

  return (
    <div data-scroll-snap>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative container mx-auto max-w-screen-2xl px-4 md:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-center snap-start snap-always">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Building reliable systems for the AI era.
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-4xl mx-auto font-medium">
            SDE at Jsmon &middot; Codeforces Expert &middot; Writing about systems, databases, and AI engineering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button render={<Link href="/about" />} size="lg" nativeButton={false}>
              More about me
            </Button>
            <Button render={<Link href="/blog" />} variant="outline" size="lg" nativeButton={false}>
              Read my writing
            </Button>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Featured Writing */}
      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always relative">
        <section className="container mx-auto max-w-screen-2xl px-4 md:px-8 pt-16 h-full flex flex-col justify-center">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Featured Writing</h2>
            <Link href="/blog" className="text-primary font-medium hover:underline">
              View all posts &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.meta.title}
                description={post.meta.description}
                pubDate={post.meta.pubDate}
                slug={post.slug}
                tags={post.meta.tags}
              />
            ))}
          </div>
        </section>

        <ScrollIndicator />
      </ScrollFade>

      {/* Combined Section: Work, Exploring, Principles, Mini-About */}
      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always relative">
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-24 space-y-32">
          
          {/* Featured Work */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-10">Latest Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              <a 
                href="https://throttlex.siddhartha.work" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-8 border border-border/50 rounded-2xl bg-card/50 hover:bg-card hover:border-border transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                      ThrottleX 
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">System</span>
                    </h3>
                    <p className="text-muted-foreground max-w-3xl leading-relaxed text-lg">
                      A smart API rate limiting, traffic orchestration, and quota management platform. Designed as a production-grade distributed system to eliminate rate-limit errors and maximize throughput for AI applications using Go, Redis, and gRPC microservices.
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
                <div className="flex gap-2 flex-wrap mt-6">
                  {['Go', 'Redis', 'gRPC', 'PostgreSQL', 'Microservices'].map(tech => (
                    <span key={tech} className="text-xs font-medium bg-muted/50 border border-border/50 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          </section>

          {/* Mini About */}
          <section className="max-w-3xl mx-auto text-center pb-8">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
              I'm interested in how AI changes the way software systems are designed, maintained, and scaled — especially around memory, reliability, and developer workflows.
            </p>
            <Link href="/about" className="inline-flex items-center justify-center text-primary font-medium hover:underline text-lg group">
              More about my background 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </section>

        </div>
        <ScrollIndicator />
      </ScrollFade>

      {/* Contact CTA */}
      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always flex flex-col items-center justify-center text-center px-4 relative">
        <section className="container mx-auto max-w-4xl py-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-foreground opacity-25 blur-3xl group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-16 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Let's build something together.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                I'm open to freelance projects, consulting, and interesting collaborations. If you have a backend infrastructure challenge or a security project — let's talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  render={<Link href="mailto:siddharthakatiyar25@gmail.com" />} 
                  size="lg" 
                  nativeButton={false}
                  className="px-8 shadow-lg shadow-primary/20"
                >
                  Get in touch
                </Button>
                <Button 
                  render={<Link href="https://x.com/siddharthakat25" target="_blank" />} 
                  variant="outline" 
                  size="lg" 
                  nativeButton={false}
                  className="px-8"
                >
                  DM on X
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>
    </div>
  );
}
