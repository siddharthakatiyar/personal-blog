"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Tradeoff({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
      <div className="bg-muted/40 px-4 py-2 border-b border-border/60 text-sm font-semibold tracking-wide uppercase text-muted-foreground flex items-center">
        <span className="w-2 h-2 rounded-full bg-yellow-500/80 mr-3" />
        Tradeoff: {title}
      </div>
      <div className="p-6 text-sm text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-primary/50 pl-6 py-2 text-xl font-medium italic text-muted-foreground">
      {children}
    </blockquote>
  );
}

export function SystemDiagram() {
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30 flex flex-col items-center justify-center font-mono text-sm shadow-sm">
      <div className="flex flex-col items-center space-y-3 w-full max-w-lg">
        <div className="bg-background border border-border px-6 py-3 rounded-lg w-full text-center font-semibold">
          Filesystem Repository
        </div>
        <div className="text-muted-foreground h-6">↓</div>
        <div className="bg-background border border-border px-6 py-3 rounded-lg w-full text-center">
          Tree-sitter Parser
        </div>
        <div className="text-muted-foreground h-6">↓</div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-background border border-border px-4 py-3 rounded-lg text-center">
            AST Extraction
          </div>
          <div className="bg-background border border-border px-4 py-3 rounded-lg text-center">
            Symbol Definitions
          </div>
        </div>
        <div className="text-muted-foreground h-6">↓</div>
        <div className="bg-primary/10 border border-primary/30 px-6 py-3 rounded-lg w-full text-center font-semibold text-primary">
          SQLite FTS5 + Semantic Graph
        </div>
        <div className="text-muted-foreground h-6">↓</div>
        <div className="bg-background border border-border px-6 py-3 rounded-lg w-full text-center">
          Graph Expansion & Containment Dedup
        </div>
        <div className="text-muted-foreground h-6">↓</div>
        <div className="bg-foreground text-background border border-foreground px-6 py-3 rounded-lg w-full text-center font-bold">
          Compressed Token Payload (LLM)
        </div>
      </div>
    </div>
  );
}

export function GraphDiagram() {
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30 font-mono text-xs overflow-hidden shadow-sm relative">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-12">
          <motion.div 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="p-3 border border-primary bg-primary/10 rounded-md text-center shadow-md relative z-10"
          >
            router.post()
          </motion.div>
        </div>
        
        <div className="w-px h-6 bg-border" />
        
        <div className="flex space-x-12">
          <motion.div 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-3 border border-border bg-background rounded-md text-center shadow-md relative z-10"
          >
            login()
          </motion.div>
        </div>
        
        <div className="flex space-x-24">
          <div className="w-px h-6 bg-border -mr-12 transform rotate-45" />
          <div className="w-px h-6 bg-border ml-12 transform -rotate-45" />
        </div>
        
        <div className="flex space-x-8">
          <motion.div 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-3 border border-border bg-background rounded-md text-center shadow-md relative z-10"
          >
            validateJWT()
          </motion.div>
          <motion.div 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-3 border border-border bg-background rounded-md text-center shadow-md relative z-10 opacity-70"
          >
            logRequest()
          </motion.div>
        </div>
        
        <div className="w-px h-6 bg-border -ml-[7.5rem]" />
        
        <div className="flex space-x-8">
          <motion.div 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="p-3 border border-border bg-background rounded-md text-center shadow-md relative z-10 -ml-[7.5rem]"
          >
            config.JWT_SECRET
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-muted-foreground italic font-sans text-sm">
        Retrieval as a graph traversal problem.
      </div>
    </div>
  );
}

export function TokenEfficiencyChart() {
  return (
    <div className="my-12 p-8 border border-border rounded-xl bg-card/30">
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-sm font-medium">Traditional RAG (Grep + Whole File)</span>
            <span className="font-mono text-xs text-muted-foreground">42,000+ tokens</span>
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
            <span className="font-mono text-sm font-medium">ContextOS (Precision Compile)</span>
            <span className="font-mono text-xs text-muted-foreground font-bold">293 tokens</span>
          </div>
          <div className="w-full h-8 bg-muted rounded-md overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "2%" }}
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

export function CodeBlock({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border bg-black shadow-xl">
      {title && (
        <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="text-xs font-mono text-white/50">{title}</div>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-white/90">
        {children}
      </div>
    </div>
  );
}

export function Timeline({ children }: { children?: React.ReactNode }) {
  return <div className="p-4 border rounded-lg text-center text-muted-foreground my-8">{children || "Timeline"}</div>;
}
