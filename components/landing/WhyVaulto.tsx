"use client";

import { Button } from "@/components/landing/Button";
import { useReveal } from "@/components/landing/useReveal";
import { PLATFORM_URL } from "@/lib/config";

const BENEFITS = [
  {
    title: "Start from $10",
    desc: "Take fractional exposure with USDC — no accreditation required.",
  },
  {
    title: "Liquid, always",
    desc: "No lockup. Sell or roll your position 24/7; proceeds settle in USDC.",
  },
  {
    title: "You hold the funds",
    desc: "Non-custodial — your collateral and positions sit in a built-in wallet you control.",
  },
];

// Full-width objection-handling block. Replaces the old FeatureSection + price
// ticker (redundant with the tradable-markets grid) — the four benefits now
// spread across the page.
export function WhyVaulto() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-3xl">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          <span className="text-[var(--display-muted)]">Private-market access, </span>
          <span className="text-gradient-accent">without the private-market lockup</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[var(--muted)]">
          No accreditation, no six-figure minimums, no waiting for an IPO. Just an open
          position you actually control.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <div
            key={b.title}
            className={`rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 reveal ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <h3 className="text-lg font-semibold text-blue-500">{b.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{b.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 hidden sm:block max-w-3xl text-sm text-[var(--muted)]">
        Trading private-company exposure is high-risk. Vaulto positions are not securities,
        deposits, or yield products — only commit what you can afford to lose.
      </p>
      <div className="mt-6 hidden sm:flex flex-wrap items-center gap-5">
        <Button href={`${PLATFORM_URL}/sign-in`}>Launch Platform</Button>
      </div>
    </div>
  );
}
