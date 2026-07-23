"use client";

import { Button } from "@/components/landing/Button";
import { useReveal } from "@/components/landing/useReveal";
import { SOCIAL_URLS, API_URL } from "@/lib/external-urls";

const PILLARS = [
  {
    title: "Price Oracle AMM",
    desc: "Uniswap V3-style concentrated liquidity with built-in MEV protection.",
  },
  {
    title: "Cross-chain",
    desc: "Move tokens between Polygon and BNB Chain in seconds via Wormhole NTT.",
  },
  {
    title: "Public data API",
    desc: "Read-only valuations, funding and financials for 150+ private companies.",
  },
  {
    title: "Open-source",
    desc: "Contracts, the AMM and ETF tooling live on GitHub — read, verify, or fork.",
  },
];

// Minimal, full-width block matching the WhyVaulto layout for consistency.
export function Infrastructure() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div className="relative overflow-hidden">
      {/* Background glow — matches the Price Discovery section */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/4 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/5 blur-3xl" />
      </div>
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
        <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Built for depth
        </span>
        <h2 className="mt-6 font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          <span className="text-[var(--display-muted)]">More than a trade — </span>
          <span className="text-gradient-accent">an on-chain toolkit</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[var(--muted)]">
          The pricing engine, liquidity, cross-chain rails and data behind Vaulto are
          open-source and verifiable — inspect them, build on them, or audit them yourself.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className={`rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 reveal ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <h3 className="text-lg font-semibold text-blue-500">{p.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Button href={SOCIAL_URLS.github} variant="secondary" external>
          View on GitHub
        </Button>
        <Button href={API_URL} variant="secondary" external>
          API docs
        </Button>
      </div>
      </div>
    </div>
  );
}
