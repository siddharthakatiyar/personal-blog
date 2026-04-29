import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://siddhartha.dev"; // Update this with actual URL
  
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.meta.pubDate),
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
