import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  description: string;
  pubDate: string;
  slug: string;
  tags: string[];
}

export function BlogCard({ title, description, pubDate, slug, tags }: BlogCardProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="block h-full group">
      <Card className="h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">{formattedDate}</div>
          <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors leading-snug">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Content reserved for future use if needed */}
        </CardContent>
        <CardFooter className="pt-0 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="font-normal text-[10px] uppercase tracking-wider border-border/60 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
