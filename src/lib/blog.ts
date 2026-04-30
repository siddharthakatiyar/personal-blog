import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "outstatic/content/posts");

export interface PostMeta {
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  status?: string;
  jsonLd?: any;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((file) => 
    !file.startsWith(".") && (file.endsWith(".mdx") || file.endsWith(".md"))
  );
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx?$/, "");
  
  // Try .mdx first, then .md
  let fullPath = path.join(contentDir, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDir, `${realSlug}.md`);
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {
      ...data,
      pubDate: data.publishedAt || data.pubDate || data.date || "",
      tags: data.tags || [],
      status: data.status || "published", // default to published for old posts
    } as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.meta.status !== "draft") // Filter out drafts
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.pubDate > post2.meta.pubDate ? -1 : 1));
  return posts;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.meta.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}
