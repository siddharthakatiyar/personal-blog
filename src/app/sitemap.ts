import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.siddhartha.work";
  
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.meta.pubDate ? new Date(post.meta.pubDate) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const routes = ["", "/blog", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...routes, ...posts];
}
