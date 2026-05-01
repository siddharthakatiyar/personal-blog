interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border/60 bg-muted/30 px-5 py-4 backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70">
        {label}
      </p>
      <p className="text-xl font-bold tracking-tight text-foreground leading-tight">
        {value}
      </p>
      {sub && (
        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{sub}</p>
      )}
    </div>
  );
}

export function StatCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 my-6 sm:grid-cols-4">
      {children}
    </div>
  );
}
