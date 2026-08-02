"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { Eye } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
}

export function ViewCounter({ slug, trackView = false }: ViewCounterProps) {
  const { data, mutate } = useSWR(`/api/views/${slug}`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (trackView) {
      // We don't await this because we don't want to block rendering
      fetch(`/api/views/${slug}`, {
        method: "POST",
      }).then(() => {
        // Re-fetch to get the updated count
        mutate();
      });
    }
  }, [slug, trackView, mutate]);

  const views = data?.views;

  if (views === undefined) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground/50">
        <Eye className="w-3.5 h-3.5" />
        <span>---</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground/70">
      <Eye className="w-3.5 h-3.5" />
      <span>
        {views.toLocaleString()} {views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
