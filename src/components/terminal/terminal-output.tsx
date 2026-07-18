import React from "react";
import { terminalData } from "@/lib/terminal-data";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface TerminalOutputProps {
  content: string | { type: string; id?: string };
}

export function TerminalOutput({ content }: TerminalOutputProps) {
  if (typeof content === "string") {
    // If it's the neofetch easter egg
    if (content.includes("OS: Fedora KDE")) {
      return (
        <pre className="text-primary font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </pre>
      );
    }
    // Standard text output
    return (
      <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
        {content}
      </div>
    );
  }

  // Handle rich UI cards
  if (content.type === "project" && content.id) {
    const project = terminalData.projects.find((p) => p.id === content.id);
    if (!project) return null;

    return (
      <div className="my-4 p-4 border border-primary/20 rounded-lg bg-primary/5 backdrop-blur-sm max-w-md">
        <h3 className="text-primary font-bold text-lg mb-1">{project.title}</h3>
        <p className="text-foreground font-medium mb-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-muted/50 border border-border px-2 py-0.5 rounded text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {project.linkText}
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    );
  }

  return null;
}
