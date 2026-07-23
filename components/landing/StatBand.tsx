"use client";

import { useReveal } from "@/components/landing/useReveal";

const STATS = [
  { value: "12", label: "companies" },
  { value: "$10", label: "minimum" },
  { value: "24/7", label: "markets open" },
  { value: "1%", label: "flat fee" },
];

/**
 * Compact stat strip — big serif metric numbers, centered and evenly divided so
 * it reads as one balanced band rather than four mismatched blocks.
 */
export function StatBand() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 text-center ${
              i > 0 ? "sm:border-l sm:border-[var(--border)]" : ""
            } reveal ${isVisible ? "is-visible" : ""}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="metric-number text-4xl sm:text-5xl text-gradient-accent">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-[var(--muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
