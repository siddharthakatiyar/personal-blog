"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight - 56, // viewport height minus header height
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToNext}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-all duration-300 hover:text-primary hidden md:block ${
        isVisible ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to content"
    >
      <ChevronDown className="h-6 w-6 text-muted-foreground transition-colors" />
    </button>
  );
}
