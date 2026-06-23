"use client";

import { memo, useEffect, useState } from "react";
import { CompanyLogo } from "@/components/CompanyLogo";

// All resolve to a real logo via components/CompanyLogo.tsx (static asset in
// /public/companies or favicon-proxy domain) — none fall back to a letter badge.
const COMPANIES = [
  "Waymo",
  "OpenAI",
  "Anthropic",
  "Stripe",
  "Anduril",
  "Ramp",
] as const;

const DUR = 32; // seconds — shared by animationDuration AND the negative delay

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Single curved row of company logos (mobile only) — decorative social proof
 * under the hero CTA. Logos ride a gentle ∩ arc via CSS `offset-path`
 * (.hero-arc-logo in globals.css); per-logo phase + negative delay pre-advance
 * each logo so the row reads as an evenly-spaced, seamlessly-wrapping stream.
 * Adapted from the protocol sign-in SignInLogoArcs, reduced to one name-less,
 * larger-chip row. Pure CSS, no animation deps.
 */
export const CompanyLogoArc = memo(function CompanyLogoArc() {
  // Canonical order on SSR/first paint (no hydration mismatch), shuffle on mount.
  const [companies, setCompanies] = useState<readonly string[]>(COMPANIES);
  useEffect(() => {
    setCompanies(shuffle(COMPANIES));
  }, []);

  return (
    <div
      aria-hidden
      className="hero-arc pointer-events-none relative w-full select-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/* Fixed-width centered arc box; width matches the offset-path coords. */}
      <div className="relative mx-auto h-[120px] w-[360px]">
        {companies.map((name, i) => {
          const phase = (i / companies.length) * 100;
          return (
            <div
              key={name}
              className="hero-arc-logo"
              style={{
                offsetDistance: `${phase.toFixed(2)}%`,
                animationDuration: `${DUR}s`,
                animationDelay: `-${((phase / 100) * DUR).toFixed(2)}s`,
              }}
            >
              <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white opacity-[0.6] shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05]">
                <CompanyLogo name={name} size={60} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
