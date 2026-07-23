"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook. Returns a ref to attach to the element and a boolean that
 * flips true the first time the element intersects the viewport, then the
 * observer disconnects (one-shot, no ongoing cost). Extracted from the pattern
 * that used to live inline in FeatureSection.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
