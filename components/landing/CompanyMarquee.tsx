"use client";

import React, { memo, useEffect, useState } from "react";
import { CompanyLogo } from "@/components/CompanyLogo";

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MARQUEE_COMPANIES = [
  "SpaceX",
  "Anthropic",
  "OpenAI",
  "Anduril",
  "Databricks",
  "Stripe",
  "Kalshi",
  "Polymarket",
  "Figma",
  "Discord",
  "Canva",
  "Plaid",
];

/**
 * Memoized marquee item to isolate logo state changes
 * from affecting the parent marquee animation
 */
const MarqueeItem = memo(function MarqueeItem({ company }: { company: string }) {
  return (
    <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 md:gap-4 mr-10 sm:mr-14 md:mr-20">
      <CompanyLogo name={company} size={32} className="sm:w-10 sm:h-10 md:w-11 md:h-11" />
      <span
        className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-[var(--foreground)]"
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        {company}
      </span>
    </div>
  );
});

/**
 * Isolated marquee component with GPU-accelerated animation
 * Wrapped in React.memo to prevent parent re-renders from affecting it
 */
export const CompanyMarquee = memo(function CompanyMarquee() {
  // Render canonical order on SSR / first paint to avoid hydration mismatch,
  // then shuffle once on the client so each visit shows a new order.
  const [companies, setCompanies] = useState<readonly string[]>(MARQUEE_COMPANIES);
  useEffect(() => {
    setCompanies(shuffle(MARQUEE_COMPANIES));
  }, []);

  return (
    <div
      className="hero-marquee animate-fade-in-up animation-delay-600 absolute bottom-[calc(32svh+env(safe-area-inset-bottom))] sm:bottom-20 lg:bottom-24 left-0 right-0 z-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 5%, black 25%, black 75%, transparent 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 5%, black 25%, black 75%, transparent 95%, transparent 100%)",
      }}
    >
      {/* Single track containing two identical copies. Keyframe translates
          -50% = exactly one full list width, so copy B slides into copy A's
          spot with no snap. */}
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {companies.map((company, i) => (
          <MarqueeItem key={`a-${company}-${i}`} company={company} />
        ))}
        <div aria-hidden="true" className="flex">
          {companies.map((company, i) => (
            <MarqueeItem key={`b-${company}-${i}`} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
});
