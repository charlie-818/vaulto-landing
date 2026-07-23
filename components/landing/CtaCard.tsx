"use client";

import { Button } from "@/components/landing/Button";
import { useReveal } from "@/components/landing/useReveal";
import { PLATFORM_URL } from "@/lib/config";
import { WHITEPAPERS, SOCIAL_URLS } from "@/lib/external-urls";

const CHIPS: { label: string; href: string; external: boolean }[] = [
  { label: "Read the whitepaper →", href: WHITEPAPERS.predictionMarket, external: true },
  { label: "View on GitHub →", href: SOCIAL_URLS.github, external: true },
  { label: "See it on-chain →", href: "/transparency", external: false },
];

/**
 * Final CTA — Wispr's big outlined rounded-card close, reframed with a
 * "verify us yourself" transparency twist (their playful "ask an AI about us"
 * row becomes on-chain trust links for a trading protocol).
 */
export function CtaCard() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-[32px] border-2 border-[var(--foreground)] bg-[var(--card-bg)] px-6 py-14 text-center sm:px-16 sm:py-20 reveal ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <h2 className="font-display font-semibold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-[var(--display-muted)]">Don&apos;t take our word for it. </span>
          <span className="text-gradient-accent">Check the chain.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-[var(--muted)] sm:text-lg">
          Every position settles on public infrastructure. Read the mechanics, inspect the
          contracts, or just start trading.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CHIPS.map((chip) => (
            <a
              key={chip.label}
              href={chip.href}
              {...(chip.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-pill border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
            >
              {chip.label}
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={`${PLATFORM_URL}/sign-in`}>Launch Platform</Button>
        </div>
        <p className="mt-5 text-xs text-[var(--muted)]">
          Free early access. Non-custodial. Your funds stay yours.
        </p>
      </div>
    </div>
  );
}
