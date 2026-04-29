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
      <Card className="h-full flex flex-col transition-all hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <div className="text-sm text-muted-foreground mb-2">{formattedDate}</div>
          <CardTitle className="group-hover:text-primary transition-colors leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Content reserved for future use if needed */}
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
