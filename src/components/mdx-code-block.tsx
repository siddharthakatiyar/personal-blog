"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CopyButton } from "./copy-button";

export function MDXCodeBlock() {
  const [blocks, setBlocks] = useState<
    Array<{ element: Element; text: string }>
  >([]);

  useEffect(() => {
    // Find all rehype-pretty-code figures
    const figures = document.querySelectorAll("figure[data-rehype-pretty-code-figure]");
    
    const parsedBlocks = Array.from(figures).map((figure) => {
      // Find the inner pre block to get text content, or default to figure's textContent
      const pre = figure.querySelector("pre");
      const text = pre?.textContent || figure.textContent || "";
      
      return {
        element: figure,
        text,
      };
    });

    setBlocks(parsedBlocks);
  }, []);

  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) =>
        createPortal(
          <div className="absolute top-3 right-3 z-10">
            <CopyButton text={block.text} />
          </div>,
          block.element
        )
      )}
    </>
  );
}
