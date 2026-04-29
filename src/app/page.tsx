import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { ScrollFade } from "@/components/scroll-fade";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-24 md:py-32 flex items-center min-h-[60vh]">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Hi, I'm Siddhartha Katiyar.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
            I'm a software engineer who writes about dev things, especially when they break in production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/about">More about me</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read the blog</Link>
            </Button>
          </div>
        </div>
      </section>

      <ScrollFade>
        <section className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-24">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Latest Writing</h2>
            <Link href="/blog" className="text-primary font-medium hover:underline">
              View all posts &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
}
