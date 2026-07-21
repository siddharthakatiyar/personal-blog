"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
  className?: string;
}

export function ViewCounter({ slug, trackView = false, className }: ViewCounterProps) {
  const { data, error, mutate } = useSWR<{ views: number }>(
    `/api/views/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (trackView) {
      // Check if we already registered a view for this post in the current session
      const hasViewed = sessionStorage.getItem(`viewed-${slug}`);
      
      if (!hasViewed) {
        // Register a view in the background
        fetch(`/api/views/${slug}`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((newData) => {
            // Optimistically update the UI with the new view count
            if (newData && typeof newData.views === 'number') {
              mutate(newData, false);
            }
            // Mark as viewed for this session
            sessionStorage.setItem(`viewed-${slug}`, "true");
          })
          .catch(console.error);
      }
    }
  }, [slug, trackView, mutate]);

  const views = data?.views || 0;
  const isLoading = !data && !error;

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <Icons.eye className="h-3.5 w-3.5" />
      <span>
        {isLoading ? "---" : views.toLocaleString()} views
      </span>
    </span>
  );
}
