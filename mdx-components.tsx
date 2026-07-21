import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

import { Callout } from "@/components/callout";
import { StatCard, StatCards } from "@/components/stat-card";
import { ComparisonTable, ComparisonHeader, ComparisonRow } from "@/components/comparison-table";
import { ChapterBreak, PullQuote, Terminal, Timeline, BenchmarkCard, ArchitectureDiagram } from "@/components/blog";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-xl border border-border my-8"
        {...(props as ImageProps)}
      />
    ),
    h1: () => null, // The title is already rendered by the page header
    hr: () => (
      <div className="flex justify-center items-center my-12">
        <span className="flex gap-4 items-center justify-center text-muted-foreground/30">
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        </span>
      </div>
    ),
    Callout,
    StatCard,
    StatCards,
    ComparisonTable,
    ComparisonHeader,
    ComparisonRow,
    ChapterBreak,
    PullQuote,
    Terminal,
    Timeline,
    BenchmarkCard,
    ArchitectureDiagram,
    ...components,
  };
}
