"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Notebook({ date, children }: { date?: string, children: React.ReactNode }) {
  return (
    <div className="my-10 relative bg-[#fdfaf6] dark:bg-white/5 border border-border/50 rounded-lg p-6 shadow-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-400/50" />
      {date && (
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/40 pb-2">
          {date}
        </div>
      )}
      <div className="font-serif text-lg italic text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function Reflection({ children }: { children: React.ReactNode }) {
  return <Notebook>{children}</Notebook>;
}

export function Evolution() {
  const steps = [
    "Markdown",
    "Search",
    "Search + AST",
    "Search + Graph",
    "Context Compiler",
    "ContextOS"
  ];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30 flex flex-col items-center justify-center min-h-[300px]">
      <div className="space-y-4 text-center">
        <AnimatePresence mode="popLayout">
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              {index > 0 && (
                <div className="h-8 w-px bg-primary/30 my-2" />
              )}
              <div className={`px-6 py-3 rounded-lg border font-mono text-sm shadow-sm transition-colors ${
                index === steps.length - 1 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background border-border"
              }`}>
                {step}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {currentStep < steps.length - 1 && (
        <button 
          onClick={() => setCurrentStep(prev => prev + 1)}
          className="mt-8 px-4 py-2 text-xs uppercase tracking-widest border border-border rounded-full hover:bg-muted transition-colors"
        >
          Next Evolution
        </button>
      )}
      {currentStep === steps.length - 1 && (
        <button 
          onClick={() => setCurrentStep(0)}
          className="mt-8 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export function RetrievalPipeline() {
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="bg-background border border-border px-8 py-4 rounded-lg w-full text-center shadow-sm">
          User Query
        </div>
        <motion.div 
          animate={{ height: ["0%", "100%"] }} 
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-background border border-border px-4 py-6 rounded-lg text-center text-sm">
            Lexical Search (BM25)
          </div>
          <div className="bg-background border border-border px-4 py-6 rounded-lg text-center text-sm">
            Graph Traversal (AST)
          </div>
        </div>
        <motion.div 
          animate={{ height: ["0%", "100%"] }} 
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
        <div className="bg-primary text-primary-foreground border-primary px-8 py-4 rounded-lg w-full text-center shadow-lg font-medium">
          Context Payload
        </div>
      </div>
    </div>
  );
}

export function ClaudeGrowth() {
  const steps = [
    { label: "Week 1", count: 200, emoji: "📄" },
    { label: "Week 2", count: 1200, emoji: "📝" },
    { label: "Week 3", count: 5000, emoji: "📚" },
    { label: "Week 5", count: 10000, emoji: "🏗️" },
    { label: "Week 8", count: 16000, emoji: "😬" },
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="text-4xl">{steps[currentStep].emoji}</div>
            <div className="text-sm font-mono text-muted-foreground">{steps[currentStep].label}</div>
            <div className="text-4xl font-bold tracking-tighter">
              {steps[currentStep].count.toLocaleString()} <span className="text-xl text-muted-foreground font-normal">tokens</span>
            </div>
            
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden mt-8">
              <motion.div 
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (steps[currentStep].count / 16000) * 100)}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-12 gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? "bg-primary" : "bg-primary/20 hover:bg-primary/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TokenComparison() {
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30">
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-sm font-medium">Grep (Flat Search)</span>
            <span className="font-mono text-xs text-muted-foreground">4,300 tokens</span>
          </div>
          <div className="w-full h-8 bg-muted rounded-md overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-red-500/80"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-sm font-medium">ContextOS (Graph Traversal)</span>
            <span className="font-mono text-xs text-muted-foreground font-bold">1,055 tokens</span>
          </div>
          <div className="w-full h-8 bg-muted rounded-md overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "24.5%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute top-0 left-0 h-full bg-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
