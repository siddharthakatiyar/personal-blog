import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  description: string;
  pubDate: string;
  slug: string;
  tags: string[];
  readingTime: number;
}

export function BlogCard({ title, description, pubDate, slug, tags, readingTime }: BlogCardProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="block h-full group">
      <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">
            <time dateTime={pubDate}>{formattedDate}</time>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors leading-snug">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-4 pb-6 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {tags?.slice(0, 4).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="font-normal text-[10px] uppercase tracking-wider border-border/60 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {tags?.length > 4 && (
              <span className="text-[10px] text-muted-foreground/50 self-center">
                +{tags.length - 4} more
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
