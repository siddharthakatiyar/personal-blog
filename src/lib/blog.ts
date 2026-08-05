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
  readingTime: number;
  coverImage?: string;
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

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 238);

  return {
    slug: realSlug,
    meta: {
      ...data,
      pubDate: data.publishedAt || data.pubDate || data.date || "",
      tags: data.tags || [],
      status: data.status || "published", // default to published for old posts
      readingTime,
    } as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.meta.status === "published" || post.meta.status === "archived") // Show published and archived posts
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

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 2): Post[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  
  // Score posts by tag overlap
  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    post.meta.tags?.forEach((tag) => {
      if (tags.includes(tag)) score += 1;
    });
    return { post, score };
  });

  // Sort by score (descending), then by date (descending)
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.post.meta.pubDate > b.post.meta.pubDate ? -1 : 1;
  });

  return scoredPosts.slice(0, limit).map((sp) => sp.post);
}
