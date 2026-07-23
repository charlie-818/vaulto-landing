"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { Button } from "@/components/landing/Button";
import { useReveal } from "@/components/landing/useReveal";
import { SHOWCASE_COMPANIES, type Valuation } from "@/lib/showcase-companies";
import { PLATFORM_URL } from "@/lib/config";

function formatUsd(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2).replace(/\.?0+$/, "")}T`;
  if (n >= 1e9) {
    const b = n / 1e9;
    return `$${b >= 100 ? Math.round(b) : Number(b.toFixed(1))}B`;
  }
  if (n >= 1e6) return `$${Math.round(n / 1e6)}M`;
  return `$${n.toLocaleString()}`;
}

/**
 * The tradable-companies catalog — highest-weight content block. A grid of the
 * ~18 private companies, each a card that links straight into the app. Pricing
 * is shown as an honest "Live · implied valuation" label, never a fabricated
 * static number (there is no public price feed).
 */
export function CompaniesShowcase({
  valuations = {},
}: {
  valuations?: Record<string, Valuation>;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          <span className="text-[var(--muted)]">Trade the names </span>
          <span className="text-gradient-accent">that never hit the public market</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[var(--muted)]">
          The most valuable private companies in the world — one tap to take a
          long or short position on where the market thinks they&apos;re headed.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {SHOWCASE_COMPANIES.map((c, i) => {
          const v = valuations[c.symbol];
          return (
          <a
            key={c.symbol}
            href={`${PLATFORM_URL}/${c.slug}`}
            className={`group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent-cyan)]/50 reveal ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
          >
            <div className="flex items-center gap-3">
              <CompanyLogo name={c.name} size={40} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[var(--foreground)]">{c.name}</div>
                <div className="font-mono text-xs text-[var(--muted)]">{c.symbol}</div>
              </div>
            </div>
            {v ? (
              <div className="mt-auto text-lg font-semibold text-[var(--foreground)]">
                {formatUsd(v.valuationUsd)}
              </div>
            ) : (
              <div className="mt-auto" />
            )}
          </a>
          );
        })}
      </div>

      <p className="mt-6 hidden sm:block text-xs text-[var(--muted)]">
        Prices are implied valuations derived from live prediction-market odds — they move
        continuously and can fall as well as rise.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Button href={`${PLATFORM_URL}/sign-in`}>Launch Platform</Button>
        <a
          href={PLATFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline text-sm font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
        >
          View all markets →
        </a>
      </div>
    </div>
  );
}
