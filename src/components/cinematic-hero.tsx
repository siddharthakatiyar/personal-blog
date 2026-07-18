"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "./terminal/terminal";
import { ScrollIndicator } from "./scroll-indicator";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicHero() {
  const [isBooted, setIsBooted] = useState(false);

  // Lock scroll on body during boot sequence
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isBooted) {
      document.body.style.overflow = "";
    }
  }, [isBooted]);

  return (
    <section className="relative container mx-auto max-w-screen-2xl px-4 md:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] snap-start snap-always py-20 lg:py-0 overflow-hidden">
      
      {/* Full screen overlay to block header/footer/particles during boot */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background"
          />
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className={`flex w-full items-center justify-center gap-12 ${isBooted ? 'flex-col lg:flex-row' : 'flex-col'}`}
      >
        
        {/* Left Column: Text */}
        <AnimatePresence>
        {isBooted && (
          <motion.div 
            layout
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-center lg:text-left flex-1 mt-10 lg:mt-0 relative z-[110]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Building reliable systems for the AI era.
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-10 font-medium">
              SDE at Jsmon &middot; Competitive Programmer &middot; Writing about systems, databases, and AI engineering
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button render={<Link href="/about" />} size="lg" nativeButton={false}>
                More about me
              </Button>
              <Button render={<Link href="/blog" />} variant="outline" size="lg" nativeButton={false}>
                My Blog
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Right Column: Terminal */}
        <motion.div 
          layout
          initial={{ scale: 1.3 }}
          animate={{ scale: isBooted ? 1 : 1.3 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full ${isBooted ? 'lg:w-[600px] xl:w-[700px]' : 'max-w-[700px]'} flex-shrink-0 relative z-[110]`}
        >
          <div className="relative group">
            <div className={`absolute -inset-1 bg-linear-to-r from-primary/30 to-primary-foreground/30 blur-xl group-hover:opacity-40 transition duration-1000 rounded-xl ${isBooted ? 'opacity-20' : 'opacity-50'}`} />
            <div className="relative">
              <Terminal onBootComplete={() => setTimeout(() => setIsBooted(true), 1000)} />
            </div>
          </div>
        </motion.div>
        
      </motion.div>
      
      <AnimatePresence>
      {isBooted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 relative z-[110]"
        >
          <ScrollIndicator />
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
