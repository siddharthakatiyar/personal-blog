"use client";
import React, { useState, useEffect, useRef } from "react";
import { terminalData, availableCommands } from "@/lib/terminal-data";
import { TerminalOutput } from "./terminal-output";

// Types
type HistoryItem = {
  command: string;
  output?: string | { type: string; id?: string };
  isError?: boolean;
};

interface TerminalProps {
  onBootComplete?: () => void;
}

export function Terminal({ onBootComplete }: TerminalProps = {}) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, input, isBooting]);

  // Boot sequence
  useEffect(() => {
    let isCancelled = false;
    
    const bootSequence = async () => {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      
      setHistory([{ command: "Initializing portfolio..." }]);
      await delay(300);
      if (isCancelled) return;
      
      setHistory(h => [...h, { command: "Loading profile...\n[                    ] 0%" }]);
      
      const barLength = 20;
      for (let i = 1; i <= 10; i++) {
        await delay(30);
        if (isCancelled) return;
        const progress = i * 10;
        const filled = Math.floor((progress / 100) * barLength);
        const bar = "█".repeat(filled) + " ".repeat(barLength - filled);
        
        setHistory(h => {
          const newH = [...h];
          newH[newH.length - 1] = { command: `Loading profile...\n[${bar}] ${progress}%` };
          return newH;
        });
      }
      
      await delay(200);
      if (isCancelled) return;
      
      setHistory(h => [...h, { command: "Starting services..." }]);
      
      const services = [
        "✓ PostgreSQL",
        "✓ Redis",
        "✓ Queue Workers",
        "✓ AI Context Engine"
      ];
      
      for (const service of services) {
        await delay(150);
        if (isCancelled) return;
        setHistory(h => {
          const newH = [...h];
          newH[newH.length - 1] = { command: newH[newH.length - 1].command + `\n${service}` };
          return newH;
        });
      }
      
      await delay(400);
      if (isCancelled) return;
      
      setHistory(h => [...h, { command: "Welcome.\n\nType `help` to explore." }]);
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

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim() === "") {
        setHistory([...history, { command: "" }]);
        return;
      }
      executeCommand(input.trim());
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
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
      const match = availableCommands.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "c" && e.ctrlKey) {
      setHistory([...history, { command: `${input}^C` }]);
      setInput("");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const executeCommand = async (cmd: string) => {
    setCommandHistory([...commandHistory, cmd]);
    setHistory(h => [...h, { command: cmd }]);
    setIsExecuting(true);
    
    const lowerCmd = cmd.toLowerCase();
    let output: string | { type: string; id?: string } = "";

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    switch (lowerCmd) {
      case "help":
        output = `Available commands

about       Learn about me
experience  Career timeline
projects    Things I've built
skills      Tech stack
blog        Latest articles
resume      Download resume
github      Open GitHub
linkedin    Open LinkedIn
contact     Email
clear       Clear terminal
theme       Toggle theme`;
        break;
      case "about":
        output = terminalData.about;
        break;
      case "experience":
        output = terminalData.experience;
        break;
      case "projects":
        await delay(400);
        output = `Projects

> ContextOS
  AI Context Engine
  npm • GitHub • Docs

> ThrottleX
  Distributed Rate Limiter

> Jsmon
  Attack Surface Management
  Backend Infrastructure

Type

open contextos

for details.`;
        break;
      case "open contextos":
        output = { type: "project", id: "contextos" };
        break;
      case "open throttlex":
        output = { type: "project", id: "throttlex" };
        break;
      case "open jsmon":
        output = { type: "project", id: "jsmon" };
        break;
      case "skills":
        output = terminalData.skills;
        break;
      case "resume":
        await delay(300);
        output = `Opening resume.pdf...\n\n✓ Success`;
        setTimeout(() => {
          window.open("https://drive.google.com/uc?export=download&id=1329MhUVB6r8BQlW9ZNsfXzXcp71cB9Pl", "_blank");
        }, 500);
        break;
      case "github":
        await delay(300);
        output = `Opening GitHub...\n\n✓ Redirecting`;
        setTimeout(() => {
          window.open("https://github.com/siddharthakatiyar", "_blank");
        }, 500);
        break;
      case "linkedin":
        await delay(300);
        output = `Opening LinkedIn...\n\n✓ Redirecting`;
        setTimeout(() => {
          window.open("https://www.linkedin.com/in/siddharthakatiyar/", "_blank");
        }, 500);
        break;
      case "blog":
        await delay(300);
        output = `Redirecting to blog...\n\n✓ Success`;
        setTimeout(() => {
          window.location.href = "/blog";
        }, 500);
        break;
      case "contact":
        output = `Opening mail client...\nIf nothing happens, email me at: siddharthakatiyar25@gmail.com`;
        setTimeout(() => {
          window.location.href = "mailto:siddharthakatiyar25@gmail.com";
        }, 500);
        break;
      case "clear":
        setHistory([]);
        setIsExecuting(false);
        return;
      case "theme":
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.add("dark");
        }
        output = `Theme toggled to ${isDark ? "light" : "dark"} mode.`;
        break;
      case "sudo hire siddhartha":
        await delay(500);
        output = `Permission granted.\n\nOffer accepted.\n\n:)`;
        break;
      case "coffee":
        output = `Brewing...\n\n█████████████\n\nReady ☕`;
        break;
      case "make coffee":
        output = `Error\n\nDependency\ncoffee-machine\nnot found.`;
        break;
      case "42":
        output = `Correct.`;
        break;
      case "rm -rf /":
        await delay(800);
        output = `Nice try.`;
        break;
      case "neofetch":
        output = `       ______
      / ____/
     / /__
    / ___/
   /_/

OS: Fedora KDE
Editor: Cursor
Terminal: Ghostty
Languages: Go, Java, C++
Focus: Distributed Systems`;
        break;
      case "fortune":
        output = `"Premature optimization is the root of all evil."\n\nDonald Knuth`;
        break;
      default:
        output = `command not found: ${cmd}`;
    }

    setHistory(h => {
      const newH = [...h];
      newH[newH.length - 1].output = output;
      return newH;
    });
    setIsExecuting(false);
  };

  return (
    <div 
      className="w-full h-[500px] bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden flex flex-col shadow-2xl font-mono text-sm group transition-all"
      onClick={focusInput}
    >
      {/* Mac window controls */}
      <div className="h-10 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <div className="flex-1 text-center text-xs text-muted-foreground font-sans tracking-wide">
          siddhartha — bash — 80x24
        </div>
      </div>

      {/* Terminal content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        {history.map((item, i) => (
          <div key={i} className="space-y-2">
            {!isBooting && item.command && !item.command.includes("Initializing") && !item.command.includes("Loading") && !item.command.includes("Starting") && !item.command.includes("Welcome") && (
              <div className="flex items-center gap-2 text-foreground">
                <span className="text-primary font-bold">siddhartha@work ~ %</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.command.includes("Initializing") || item.command.includes("Loading") || item.command.includes("Starting") || item.command.includes("Welcome") ? (
              <div className="whitespace-pre-wrap text-muted-foreground">{item.command}</div>
            ) : null}
            {item.output && (
              <div className="pl-0">
                <TerminalOutput content={item.output} />
              </div>
            )}
          </div>
        ))}

        {!isBooting && !isExecuting && (
          <div className="flex items-center gap-2 text-foreground relative">
            <span className="text-primary font-bold shrink-0">siddhartha@work ~ %</span>
            <span className="whitespace-pre">{input}</span>
            <span className="w-2.5 h-4 bg-foreground animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 opacity-0 cursor-text"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}
