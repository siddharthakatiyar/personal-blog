import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Siddhartha Katiyar",
  description: "Writing about software engineering, security, and learning.",
};

export default function BlogPage() {
  const posts = getAllPosts().filter(post => post.meta.status === "published");
  const tags = getAllTags();

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Writing
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Technical deep-dives and thoughts on building systems.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide border-b border-border/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 shrink-0 mr-1">Tags:</span>
          {tags?.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="font-medium text-[10px] uppercase tracking-wider px-2 py-0 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post) => (
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
        </main>
      </div>
    </div>
  );
}
