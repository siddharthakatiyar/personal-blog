import { cn } from "@/lib/utils";
import { Info, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
}

export function Callout({ children, type = "info", title }: CalloutProps) {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  };

  const styles = {
    info: "bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50",
    warning: "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50",
    error: "bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50",
    success: "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50",
  };

  return (
    <div className={cn("my-6 flex gap-4 rounded-lg border p-4", styles[type])}>
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      <div className="flex flex-col gap-1">
        {title && <div className="font-bold text-sm uppercase tracking-tight">{title}</div>}
        <div className="prose-sm prose-neutral dark:prose-invert">{children}</div>
      </div>
    </div>
  );
}
