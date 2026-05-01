"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const indicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show if the section is mostly visible and we haven't scrolled too far past the top of it
        // Since the parent is snap-always, we can assume it's the current section
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.8);
      },
      { threshold: [0, 0.1, 0.5, 0.8, 0.9, 1] }
    );

    if (indicatorRef.current?.parentElement) {
      observer.observe(indicatorRef.current.parentElement);
    }

    const handleScroll = () => {
      if (!indicatorRef.current?.parentElement) return;
      const rect = indicatorRef.current.parentElement.getBoundingClientRect();
      // Hide if we've scrolled more than 50px into the section
      if (rect.top < -50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToNext = () => {
    if (!indicatorRef.current?.parentElement) return;
    const rect = indicatorRef.current.parentElement.getBoundingClientRect();
    window.scrollBy({
      top: rect.bottom - 56, // Scroll to the end of the current section
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={indicatorRef}
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
