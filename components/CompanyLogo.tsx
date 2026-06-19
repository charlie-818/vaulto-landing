"use client";

import { useState } from "react";

// Static logo files in /public/companies/
const STATIC_LOGO_MAP: Record<string, string> = {
  spacex: "spacex.png",
  anthropic: "anthropic.png",
  waymo: "waymo.png",
  databricks: "databricks.png",
  bytedance: "bytedance.svg",
  fanniemae: "fanniemae.png",
  ssi: "ssi.jpg",
  safesuperintelligence: "ssi.jpg",
};

// Domain map for Google favicon fallback
const COMPANY_DOMAIN_MAP: Record<string, string> = {
  spacex: "spacex.com",
  stripe: "stripe.com",
  openai: "openai.com",
  anthropic: "anthropic.com",
  databricks: "databricks.com",
  discord: "discord.com",
  bytedance: "tiktok.com",
  canva: "canva.com",
  plaid: "plaid.com",
  figma: "figma.com",
  anduril: "anduril.com",
  andurilindustries: "anduril.com",
  perplexity: "perplexity.ai",
  neuralink: "neuralink.com",
  lambda: "lambdalabs.com",
  kraken: "kraken.com",
  epicgames: "epicgames.com",
  kalshi: "kalshi.com",
  polymarket: "polymarket.com",
  waymo: "waymo.com",
  nvidia: "nvidia.com",
  palantir: "palantir.com",
  tesla: "tesla.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  meta: "meta.com",
};

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveLogoUrl(name: string): string | null {
  const n = normalize(name);
  const fname = STATIC_LOGO_MAP[n];
  if (fname) return `/companies/${fname}`;
  const domain = COMPANY_DOMAIN_MAP[n];
  if (domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  return null;
}

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export function CompanyLogo({ name, size = 32, className = "" }: Props) {
  const [errored, setErrored] = useState(false);
  const logoUrl = resolveLogoUrl(name);

  if (!logoUrl || errored) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] text-sm font-medium shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {name.trim()[0]?.toUpperCase() ?? "?"}
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logoUrl}
      alt={`${name} logo`}
      width={size}
      height={size}
      decoding="async"
      loading="lazy"
      className={`rounded-full object-cover shrink-0 ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
