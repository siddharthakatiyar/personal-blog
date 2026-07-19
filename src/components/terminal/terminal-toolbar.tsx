import React from "react";
import { CornerDownLeft, Keyboard, Terminal, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalToolbarProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function TerminalToolbar({ inputRef }: TerminalToolbarProps) {
  const handleKey = (key: string) => {
    if (!inputRef.current) return;
    
    // Create and dispatch keyboard event
    const event = new KeyboardEvent("keydown", {
      key: key,
      bubbles: true,
      cancelable: true,
    });
    
    inputRef.current.dispatchEvent(event);
    inputRef.current.focus();
  };

  return (
    <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 px-4 border-t border-border/20 bg-[#111113]/95 backdrop-blur-sm sticky bottom-0 z-20 scrollbar-none">
      <button
        onClick={() => handleKey("Tab")}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/30 hover:bg-secondary/60 text-xs font-mono text-muted-foreground transition-colors border border-border/10"
      >
        <Keyboard className="w-3.5 h-3.5" />
        Tab
      </button>
      
      <button
        onClick={() => handleKey("ArrowUp")}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary/30 hover:bg-secondary/60 text-xs font-mono text-muted-foreground transition-colors border border-border/10"
        aria-label="History Up"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleKey("ArrowDown")}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary/30 hover:bg-secondary/60 text-xs font-mono text-muted-foreground transition-colors border border-border/10"
        aria-label="History Down"
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleKey("Enter")}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/20 hover:bg-primary/30 text-primary text-xs font-mono transition-colors border border-primary/20"
      >
        <CornerDownLeft className="w-3.5 h-3.5" />
        Enter
      </button>

      <div className="w-px h-4 bg-border/40 mx-1 flex-shrink-0" />

      <button
        onClick={() => {
          if (!inputRef.current) return;
          const ctrlCEvent = new KeyboardEvent("keydown", {
            key: "c",
            ctrlKey: true,
            bubbles: true,
            cancelable: true,
          });
          inputRef.current.dispatchEvent(ctrlCEvent);
          inputRef.current.focus();
        }}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary/30 hover:bg-secondary/60 text-xs font-mono text-muted-foreground transition-colors border border-border/10"
      >
        ^C
      </button>
    </div>
  );
}
