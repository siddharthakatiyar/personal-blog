import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  
  // Return only what's needed for the terminal to keep the payload small
  const terminalPosts = posts.slice(0, 5).map(post => ({
    title: post.meta.title,
    slug: post.slug,
    readingTime: post.meta.readingTime,
    date: post.meta.pubDate,
  }));

  return Response.json(terminalPosts);
}
