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
import { useMDXComponents } from "../../../../mdx-components";

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
      <article className="container mx-auto max-w-screen-2xl px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-3/4 max-w-3xl">
            <header className="mb-10">
              <div className="text-muted-foreground mb-4">{formattedDate}</div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {post.meta.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {post.meta.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <Image
                  src="/profile.jpeg"
                  alt="Siddhartha Katiyar"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Siddhartha Katiyar</p>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote 
                source={post.content} 
                options={options as any} 
                components={useMDXComponents({})}
              />
            </div>
            
            <Comments />
          </div>

          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
