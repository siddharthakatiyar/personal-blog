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
            I'm a software engineer focused on building secure, scalable systems and high-performance security infrastructure.
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

      <ScrollFade className="min-h-[calc(100vh-3.5rem)] snap-start snap-always">
        <section className="container mx-auto max-w-screen-2xl px-4 md:px-8 pt-16 pb-24">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Latest Writing</h2>
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
      </ScrollFade>
    </div>
  );
}
