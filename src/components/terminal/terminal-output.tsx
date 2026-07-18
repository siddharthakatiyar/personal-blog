import React from "react";
import { projects, type Project } from "@/lib/terminal-data";

interface TerminalOutputProps {
  content: string | { type: string; id?: string };
}

// Renders `ls` output with directory/file coloring
function LsOutput({ items }: { items: string[] }) {
  return (
    <div className="font-mono text-sm leading-relaxed grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 max-w-sm">
      {items.map((item) => (
        <span
          key={item}
          className={item.endsWith("/") ? "text-blue-400 font-semibold" : "text-muted-foreground"}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// Renders a rich project card with clickable links
function ProjectCard({ project }: { project: Project }) {
  const linkEntries = Object.entries(project.links).filter(([, url]) => !!url);

  return (
    <div className="my-2 p-4 border border-primary/20 rounded-lg bg-primary/5 backdrop-blur-sm max-w-md">
      <h3 className="text-primary font-bold text-base mb-0.5">{project.title}</h3>
      <p className="text-foreground text-sm mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-muted/50 border border-border px-2 py-0.5 rounded text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {linkEntries.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          {linkEntries.map(([label, url]) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary underline-offset-4 hover:underline capitalize"
              onClick={(e) => e.stopPropagation()}
            >
              [{label}]
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function TerminalOutput({ content }: TerminalOutputProps) {
  if (typeof content === "string") {
    return (
      <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
        {content}
      </div>
    );
  }

  if (content.type === "project" && content.id) {
    const project = projects.find((p) => p.id === content.id);
    if (!project) return null;
    return <ProjectCard project={project} />;
  }

  if (content.type === "ls" && "items" in content) {
    return <LsOutput items={(content as { type: string; items: string[] }).items} />;
  }

  return null;
}
