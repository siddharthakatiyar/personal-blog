import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Siddhartha Katiyar",
  description: "Writing about software engineering, security, and learning.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-16 md:py-24">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Thoughts, learnings, and tutorials on software development.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-12">
        <main className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <aside className="md:w-1/4">
          <div className="sticky top-24">
            <h2 className="text-lg font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
