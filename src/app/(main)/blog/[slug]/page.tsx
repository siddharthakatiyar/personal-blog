import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { TableOfContents } from "@/components/table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { Comments } from "@/components/comments";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useMDXComponents } from "../../../../../mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.meta.title} | Siddhartha Katiyar`,
      description: post.meta.description,
    };
  } catch (e) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

  const formattedDate = new Date(post.meta.pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time dynamically
  const wordCount = post.content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 238); // Average reading speed

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, { theme: "dracula", keepBackground: true }],
      ],
    },
  };

  return (
    <>
      <ReadingProgress />
      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-[680px] mx-auto mb-12">
          <Link 
            href="/blog" 
            className="text-xs text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 group transition-colors"
          >
            <Icons.chevronLeft className="h-3 w-3" />
            Back to posts
          </Link>
          
          <header className="mt-4">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60 mb-4">
              <time dateTime={post.meta.pubDate}>{formattedDate}</time>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-balance leading-tight">
              {post.meta.title}
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              {post.meta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <Image
                  src="/profile.jpeg"
                  alt="Siddhartha Katiyar"
                  width={32}
                  height={32}
                  className="rounded-full border border-border object-cover"
                />
                <div>
                  <p className="font-semibold text-xs text-foreground/90">Siddhartha Katiyar</p>
                  <p className="text-[10px] text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {post.meta.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-medium text-[9px] uppercase tracking-widest px-1.5 py-0">
                    {tag}
                  </Badge>
                ))}
                {post.meta.tags.length > 5 && (
                  <span className="text-[9px] text-muted-foreground/50 self-center uppercase tracking-widest">
                    +{post.meta.tags.length - 5}
                  </span>
                )}
              </div>
            </div>
          </header>
        </div>

        <div className="max-w-screen-lg mx-auto relative flex flex-col lg:flex-row lg:items-start lg:justify-center gap-12">
          <main className="w-full lg:w-auto max-w-[680px]">
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-base md:prose-lg">
              <MDXRemote 
                source={post.content} 
                options={options as any} 
                components={useMDXComponents({})}
              />
            </div>
            
            <div className="mt-16 pt-10 border-t border-border/50">
              <div className="flex flex-col md:flex-row items-center gap-6 bg-muted/20 p-6 rounded-xl border border-border/50">
                <Image
                  src="/profile.jpeg"
                  alt="Siddhartha Katiyar"
                  width={64}
                  height={64}
                  className="rounded-full border border-border shadow-sm"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold mb-1">Written by Siddhartha Katiyar</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    Software engineer specializing in infrastructure and security. 
                    Building high-performance systems at Jsmon.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <Link href="https://x.com/siddharthakat25" className="text-xs font-medium hover:text-primary transition-colors">Follow on X</Link>
                    <Link href="/about" className="text-xs font-medium hover:text-primary transition-colors">More about me</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <Comments />
            </div>
          </main>

          <aside className="hidden lg:block lg:absolute lg:left-[calc(50%+340px+2rem)] w-[240px] shrink-0">
            <div className="sticky top-24 space-y-8">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
      {post.meta.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.meta.jsonLd) }}
        />
      )}
    </>
  );
}
