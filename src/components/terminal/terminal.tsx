"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  terminalData,
  availableCommands,
  filesystem,
  projects,
  type FSNode,
} from "@/lib/terminal-data";
import { TerminalOutput } from "./terminal-output";
import { TerminalToolbar } from "./terminal-toolbar";
import { sounds } from "@/lib/sounds";
import { SoundToggle } from "@/components/sound-toggle";

// ─── Types ──────────────────────────────────────────────────────────

type OutputItem = string | { type: string; id?: string; items?: string[] };

type HistoryItem = {
  command: string;
  cwd: string;
  output?: OutputItem;
  isBoot?: boolean;
};

interface TerminalProps {
  onBootComplete?: () => void;
}

// ─── Filesystem Helpers ─────────────────────────────────────────────

function resolvePath(cwd: string, target: string): string {
  if (target === "~" || target === "") return "~";
  if (target === "..") {
    if (cwd === "~") return "~";
    const parts = cwd.split("/");
    parts.pop();
    return parts.join("/") || "~";
  }
  if (target.startsWith("~/")) return target;
  if (cwd === "~") return `~/${target}`;
  return `${cwd}/${target}`;
}

function getNode(path: string): FSNode | null {
  if (path === "~") return { type: "dir", children: filesystem };
  const parts = path.replace(/^~\//, "").split("/");
  let node: FSNode = { type: "dir", children: filesystem };
  for (const part of parts) {
    if (node.type !== "dir") return null;
    const child: FSNode | undefined = node.children[part];
    if (!child) return null;
    node = child;
  }
  return node;
}

function getLsItems(path: string): string[] {
  const node = getNode(path);
  if (!node || node.type !== "dir") return [];
  return Object.entries(node.children).map(([name, n]) =>
    n.type === "dir" ? `${name}/` : name
  );
}

// ─── Component ──────────────────────────────────────────────────────

export function Terminal({ onBootComplete }: TerminalProps = {}) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState("~");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on every change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, input]);

  // Boot sequence
  useEffect(() => {
    let isCancelled = false;

    const bootSequence = async () => {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

      setHistory([{ command: "Initializing portfolio...", cwd: "~", isBoot: true }]);
      await delay(300);
      if (isCancelled) return;

      setHistory((h) => [
        ...h,
        { command: "Loading profile...\n[                    ] 0%", cwd: "~", isBoot: true },
      ]);

      const barLength = 20;
      for (let i = 1; i <= 10; i++) {
        await delay(30);
        if (isCancelled) return;
        const progress = i * 10;
        const filled = Math.floor((progress / 100) * barLength);
        const bar = "█".repeat(filled) + " ".repeat(barLength - filled);
        setHistory((h) => {
          const newH = [...h];
          newH[newH.length - 1] = {
            command: `Loading profile...\n[${bar}] ${progress}%`,
            cwd: "~",
            isBoot: true,
          };
          return newH;
        });
      }

      await delay(200);
      if (isCancelled) return;

      setHistory((h) => [
        ...h,
        { command: "Starting services...", cwd: "~", isBoot: true },
      ]);

      const services = ["✓ PostgreSQL", "✓ Redis", "✓ Queue Workers", "✓ AI Context Engine"];
      for (const service of services) {
        await delay(150);
        if (isCancelled) return;
        setHistory((h) => {
          const newH = [...h];
          newH[newH.length - 1] = {
            command: newH[newH.length - 1].command + `\n${service}`,
            cwd: "~",
            isBoot: true,
          };
          return newH;
        });
      }

      await delay(400);
      if (isCancelled) return;

      setHistory((h) => [
        ...h,
        { command: "Welcome.\n\nType `help` to explore.", cwd: "~", isBoot: true },
      ]);
      setIsBooting(false);
      if (onBootComplete) {
        onBootComplete();
      }
    };

    bootSequence();
    return () => {
      isCancelled = true;
    };
  }, []);

  const prompt = cwd === "~" ? "siddhartha@work ~ %" : `siddhartha@work ${cwd} %`;

  const focusInput = () => inputRef.current?.focus();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sounds?.init();
    
    if (e.key === "Enter") {
      if (input.trim() === "") {
        setHistory((h) => [...h, { command: "", cwd }]);
        return;
      }
      executeCommand(input.trim());
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const spaceIdx = input.indexOf(" ");

      if (spaceIdx === -1) {
        // Complete command names
        const lower = input.toLowerCase();
        const matches = availableCommands.filter(
          (c) => c.startsWith(lower) && c !== lower
        );
        if (matches.length === 1) setInput(matches[0]);
      } else {
        // Complete arguments contextually
        const baseCmd = input.slice(0, spaceIdx).toLowerCase();
        const partial = input.slice(spaceIdx + 1).toLowerCase();

        if (baseCmd === "cd") {
          const dirs = getLsItems(cwd)
            .filter((i) => i.endsWith("/"))
            .map((i) => i.slice(0, -1)); // strip trailing /
          const match = dirs.find((d) => d.toLowerCase().startsWith(partial));
          if (match) setInput(`cd ${match}`);
        } else if (baseCmd === "cat") {
          const files = getLsItems(cwd).filter((i) => !i.endsWith("/"));
          const match = files.find((f) => f.toLowerCase().startsWith(partial));
          if (match) setInput(`cat ${match}`);
        } else if (baseCmd === "open") {
          const ids = projects.map((p) => p.id);
          const match = ids.find((id) => id.startsWith(partial));
          if (match) setInput(`open ${match}`);
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      setHistory((h) => [...h, { command: `${input}^C`, cwd }]);
      setInput("");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sounds?.init();
    sounds?.playKeytick();
    setInput(e.target.value);
  };

  const executeCommand = async (cmd: string) => {
    setCommandHistory((h) => [...h, cmd]);
    const cmdCwd = cwd; // capture at time of execution
    setHistory((h) => [...h, { command: cmd, cwd: cmdCwd }]);
    setIsExecuting(true);

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const parts = cmd.trim().split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: OutputItem = "";
    let newCwd: string | null = null;

    switch (base) {
      // ── Navigation ────────────────────────────────────────────────
      case "cd": {
        if (!arg || arg === "~") {
          newCwd = "~";
          output = "";
        } else {
          const target = resolvePath(cwd, arg);
          const node = getNode(target);
          if (!node) {
            output = `cd: ${arg}: No such file or directory`;
          } else if (node.type !== "dir") {
            output = `cd: ${arg}: Not a directory`;
          } else {
            newCwd = target;
            output = "";
          }
        }
        break;
      }

      case "ls": {
        const targetPath = arg ? resolvePath(cwd, arg) : cwd;
        const items = getLsItems(targetPath);
        if (items.length === 0 && getNode(targetPath)?.type !== "dir") {
          output = `ls: ${targetPath}: No such file or directory`;
        } else {
          output = { type: "ls", items };
        }
        break;
      }

      case "pwd": {
        output = cwd === "~" ? "/home/siddhartha" : `/home/siddhartha/${cwd.replace(/^~\//, "")}`;
        break;
      }

      case "cat": {
        if (!arg) {
          output = "usage: cat <filename>";
          break;
        }
        const filePath = resolvePath(cwd, arg);
        const node = getNode(filePath);
        if (!node) {
          output = `cat: ${arg}: No such file or directory`;
        } else if (node.type === "dir") {
          output = `cat: ${arg}: Is a directory`;
        } else {
          // Special case: resume.pdf triggers a download
          if (arg === "resume.pdf" || filePath.endsWith("resume.pdf")) {
            output = "Opening resume.pdf...\n\n✓ Success";
            setTimeout(() => {
              window.open(
                "https://drive.google.com/uc?export=download&id=1329MhUVB6r8BQlW9ZNsfXzXcp71cB9Pl",
                "_blank"
              );
            }, 500);
          } else {
            output = node.content;
          }
        }
        break;
      }

      // ── Info Commands ─────────────────────────────────────────────
      case "whoami": {
        output = terminalData.whoami;
        break;
      }

      case "stats": {
        await delay(200);
        output = terminalData.stats;
        break;
      }

      case "status": {
        await delay(200);
        output = terminalData.status;
        break;
      }

      case "help": {
        output = `Available commands

about        Learn about me
experience   Career timeline
projects     Things I've built
skills       Tech stack
stats        Numbers & current focus
status       What I'm doing right now
blog         Latest articles
resume       Download resume
github       Open GitHub
linkedin     Open LinkedIn
contact      Email me
clear        Clear terminal
theme        Toggle theme

Shell commands
whoami  pwd  ls  cd  cat

Shortcuts
open contextos  open throttlex  open jsmon`;
        break;
      }

      case "about": {
        output = terminalData.about;
        break;
      }

      case "experience": {
        output = terminalData.experience;
        break;
      }

      case "skills": {
        output = terminalData.skills;
        break;
      }

      case "projects": {
        await delay(400);
        output = `Projects

> ContextOS
  AI Context Engine

> ThrottleX
  Distributed Rate Limiter

> Jsmon
  Attack Surface Management

Type  open <name>  for details.
e.g.  open contextos`;
        break;
      }

      case "open": {
        const projectId = arg.toLowerCase();
        const project = projects.find((p) => p.id === projectId);
        if (!project) {
          output = `open: ${arg}: project not found`;
        } else {
          output = { type: "project", id: project.id };
        }
        break;
      }

      case "blog": {
        setHistory((h) => {
          const newH = [...h];
          newH[newH.length - 1] = {
            ...newH[newH.length - 1],
            output: "Fetching posts... [████████████████████] 100%",
          };
          return newH;
        });

        try {
          const res = await fetch("/api/terminal-blog");
          const posts = await res.json();
          
          if (!posts.length) {
            output = "No posts found.";
            break;
          }
          
          let out = "Latest Articles\n\n";
          posts.forEach((p: any) => {
            const date = new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase();
            out += `${date}  •  ${p.readingTime} min read\n`;
            out += `${p.title}\n`;
            out += `> open-post ${p.slug}\n\n`;
          });
          
          out += "Type  open-post <slug>  to read.";
          output = out;
        } catch (e) {
          output = "Failed to fetch posts.";
        }
        break;
      }

      case "open-post": {
        if (!arg) {
          output = "Usage: open-post <slug>\ne.g. open-post building-distributed-queues";
          break;
        }
        await delay(300);
        output = `Opening post: ${arg}...\n\n✓ Redirecting`;
        setTimeout(() => { window.open(`/blog/${arg}`, "_blank"); }, 500);
        break;
      }

      case "resume": {
        await delay(300);
        output = "Opening resume.pdf...\n\n✓ Success";
        setTimeout(() => {
          window.open(
            "https://drive.google.com/uc?export=download&id=1329MhUVB6r8BQlW9ZNsfXzXcp71cB9Pl",
            "_blank"
          );
        }, 500);
        break;
      }

      case "github": {
        await delay(300);
        output = "Opening GitHub...\n\n✓ Redirecting";
        setTimeout(() => { window.open("https://github.com/siddharthakatiyar", "_blank"); }, 500);
        break;
      }

      case "linkedin": {
        await delay(300);
        output = "Opening LinkedIn...\n\n✓ Redirecting";
        setTimeout(() => { window.open("https://www.linkedin.com/in/siddharthakatiyar/", "_blank"); }, 500);
        break;
      }

      case "contact": {
        output = "siddharthakatiyar25@gmail.com";
        setTimeout(() => { window.location.href = "mailto:siddharthakatiyar25@gmail.com"; }, 500);
        break;
      }

      case "clear": {
        setHistory([]);
        setCwd("~");
        setIsExecuting(false);
        return;
      }

      case "theme": {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", !isDark);
        output = `Theme set to ${isDark ? "light" : "dark"} mode.`;
        break;
      }

      // ── Easter Eggs ───────────────────────────────────────────────
      case "sudo": {
        if (cmd.toLowerCase().includes("hire")) {
          await delay(500);
          output = "Permission granted.\n\nOffer accepted.\n\n:)";
        } else {
          output = `sudo: ${arg}: command not found`;
        }
        break;
      }

      case "coffee": {
        output = "Brewing...\n\n█████████████\n\nReady ☕";
        break;
      }

      case "make": {
        if (arg === "coffee") {
          output = "Error\n\nDependency\ncoffee-machine\nnot found.";
        } else {
          output = `make: *** No rule to make target '${arg}'. Stop.`;
        }
        break;
      }

      case "42": {
        output = "Correct.";
        break;
      }

      case "rm": {
        if (cmd.includes("-rf") && cmd.includes("/")) {
          await delay(800);
          output = "Nice try.";
        } else {
          output = `rm: ${arg}: No such file or directory`;
        }
        break;
      }

      case "neofetch": {
        output = `       ______
      / ____/
     / /__
    / ___/
   /_/

OS:       Fedora KDE
Editor:   Cursor
Terminal: Ghostty
Languages: Go, Java, C++
Focus:    Distributed Systems`;
        break;
      }

      case "fortune": {
        const quotes = [
          `"Premature optimization is the root of all evil."\n\n— Donald Knuth`,
          `"Make it work, make it right, make it fast."\n\n— Kent Beck`,
          `"The art of programming is the art of organizing complexity."\n\n— Dijkstra`,
          `"In theory there is no difference between theory and practice.\nIn practice there is."\n\n— Yogi Berra`,
        ];
        output = quotes[Math.floor(Math.random() * quotes.length)];
        break;
      }

      case "exit":
      case "logout": {
        output = "There is no escape. ;)";
        break;
      }

      case "man": {
        output = `man: ${arg || "what"}: no manual entry. Try 'help' instead.`;
        break;
      }

      case "echo": {
        output = arg || "";
        break;
      }

      case "date": {
        output = new Date().toString();
        break;
      }

      case "uname": {
        output = "PortfolioOS 2.0.0 siddhartha.work";
        break;
      }

      default: {
        output = `command not found: ${base}\nType 'help' to see available commands.`;
      }
    }

    // Apply cwd change if navigation succeeded
    if (newCwd !== null) setCwd(newCwd);

    setHistory((h) => {
      const newH = [...h];
      newH[newH.length - 1] = { ...newH[newH.length - 1], output };
      return newH;
    });
    setIsExecuting(false);
  };

  return (
    <div
      className="w-full h-[500px] bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden flex flex-col shadow-2xl font-mono text-sm group transition-all"
      onClick={focusInput}
    >
      {/* macOS window controls */}
      <div className="h-10 bg-muted/50 border-b border-border/50 flex items-center px-4 shrink-0 relative">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-sans tracking-wide pointer-events-none">
          siddhartha — bash — 80x24
        </div>
        <div className="ml-auto">
          <SoundToggle />
        </div>
      </div>

      {/* Terminal scrollback */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        {history.map((item, i) => (
          <div key={i} className="space-y-2">
            {/* Boot messages render differently */}
            {item.isBoot ? (
              <div className="whitespace-pre-wrap text-muted-foreground">{item.command}</div>
            ) : (
              <div className="flex items-start gap-2 text-foreground">
                <span className="text-primary font-bold shrink-0">{item.cwd === "~" ? "siddhartha@work ~ %" : `siddhartha@work ${item.cwd} %`}</span>
                <span className="whitespace-pre-wrap">{item.command}</span>
              </div>
            )}
            {item.output !== undefined && (
              <div className="pl-0 pt-1">
                <TerminalOutput content={item.output} />
              </div>
            )}
          </div>
        ))}

        {/* Active input line */}
        {!isBooting && !isExecuting && (
          <div className="flex items-center gap-2 text-foreground relative">
            <span className="text-primary font-bold shrink-0">{prompt}</span>
            <span className="whitespace-pre">{input}</span>
            <span className="w-2.5 h-4 bg-foreground animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 opacity-0 cursor-text"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        )}
      </div>
      <TerminalToolbar inputRef={inputRef} />
    </div>
  );
}
