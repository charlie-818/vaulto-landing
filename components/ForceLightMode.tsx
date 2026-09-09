"use client";

import { useEffect } from "react";

/**
 * Removes the `dark` class from <html> on mount so the landing page always
 * renders in light mode. Kept as a tiny client island so the rest of the
 * landing page can stay a server component.
 */
export function ForceLightMode() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return null;
}
