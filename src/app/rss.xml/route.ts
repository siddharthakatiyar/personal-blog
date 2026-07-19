import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Siddhartha Katiyar | Developer Blog</title>
    <link>https://www.siddhartha.work</link>
    <description>Technical deep-dives on backend infrastructure, database engineering, and security tooling.</description>
    <language>en-us</language>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.meta.title}</title>
      <link>https://www.siddhartha.work/blog/${post.slug}</link>
      <guid>https://www.siddhartha.work/blog/${post.slug}</guid>
      <pubDate>${new Date(post.meta.pubDate).toUTCString()}</pubDate>
      <description><![CDATA[${post.meta.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
