export function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function ComparisonHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-border/60 bg-muted/40 text-[11px] uppercase tracking-widest font-semibold text-muted-foreground/70">
        {children}
      </tr>
    </thead>
  );
}

export function ComparisonRow({ children }: { children: React.ReactNode }) {
  return (
    <tbody>
      <tr className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors [&>td]:px-4 [&>td]:py-3 [&>td:first-child]:font-medium [&>td:first-child]:text-foreground/80 [&>td:not(:first-child)]:text-muted-foreground">
        {children}
      </tr>
    </tbody>
  );
}
