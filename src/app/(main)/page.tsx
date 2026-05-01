import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { ScrollFade } from "@/components/scroll-fade";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div data-scroll-snap>
      <section className="relative container mx-auto max-w-screen-2xl px-4 md:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-center snap-start snap-always">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-6">
            Hi, I'm Siddhartha Katiyar.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            I'm a backend engineer focused on building high-scale systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button render={<Link href="/about" />} size="lg" nativeButton={false}>
              More about me
            </Button>
            <Button render={<Link href="/blog" />} variant="outline" size="lg" nativeButton={false}>
              Read the blog
            </Button>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always relative">
        <section className="container mx-auto max-w-screen-2xl px-4 md:px-8 pt-16 pb-24 h-full flex flex-col">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Latest Writing</h2>
            <Link href="/blog" className="text-primary font-medium hover:underline">
              View all posts &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
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

      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always flex flex-col items-center justify-center text-center px-4">
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
