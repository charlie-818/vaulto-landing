// Static logo files in /public/companies/
export const STATIC_LOGO_MAP: Record<string, string> = {
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
export const COMPANY_DOMAIN_MAP: Record<string, string> = {
  spacex: "spacex.com",
  stripe: "stripe.com",
  ramp: "ramp.com",
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

export function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function resolveLogoUrl(name: string): string | null {
  const n = normalize(name);
  const fname = STATIC_LOGO_MAP[n];
  if (fname) return `/companies/${fname}`;
  const domain = COMPANY_DOMAIN_MAP[n];
  if (domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  return null;
}
