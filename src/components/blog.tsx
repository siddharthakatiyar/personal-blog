import React from 'react';
import { Callout as OriginalCallout } from './callout';

export const Callout = OriginalCallout;

export function ChapterBreak() {
  return (
    <div className="flex items-center justify-center my-16 opacity-50">
      <div className="h-[1px] w-12 bg-foreground/20" />
      <div className="mx-4 text-xl font-serif italic text-foreground/40">❧</div>
      <div className="h-[1px] w-12 bg-foreground/20" />
    </div>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-primary pl-6 py-2 text-xl font-medium italic text-muted-foreground">
      {children}
    </blockquote>
  );
}

export function Terminal({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border bg-black shadow-xl">
      <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {title && <div className="text-xs font-mono text-white/50">{title}</div>}
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-white/90">
        {children}
      </div>
    </div>
  );
}

export function Timeline({ children }: { children?: React.ReactNode }) {
  return <div className="p-4 border rounded-lg text-center text-muted-foreground my-8">{children || "Timeline Component"}</div>;
}

export function BenchmarkCard({ children }: { children?: React.ReactNode }) {
  return <div className="p-4 border rounded-lg text-center text-muted-foreground my-8">{children || "BenchmarkCard Component"}</div>;
}

export function ArchitectureDiagram({ children }: { children?: React.ReactNode }) {
  return <div className="p-4 border rounded-lg text-center text-muted-foreground my-8">{children || "ArchitectureDiagram Component"}</div>;
}
