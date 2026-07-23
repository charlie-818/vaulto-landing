// Static list of the private companies tradable on Vaulto, used by the landing
// companies showcase. `slug` is the Vaulto implied-valuations API key used to
// fetch each company's LIVE Polymarket-implied valuation (see
// lib/company-valuations.ts) — not the static funding-round valuation.

export type ShowcaseCompany = {
  name: string; // display name (also the CompanyLogo lookup key)
  symbol: string; // Vaulto ticker
  category: string; // sector chip
  slug: string; // Vaulto implied-valuations API slug
};

// Live implied valuation fetched from the Vaulto API (see company-valuations.ts).
export type Valuation = { valuationUsd: number; valuationAsOf?: string };

export const SHOWCASE_COMPANIES: ShowcaseCompany[] = [
  { name: "OpenAI", symbol: "vOPENAI", category: "AI", slug: "openai" },
  { name: "Anthropic", symbol: "vANTHROPIC", category: "AI", slug: "anthropic" },
  { name: "Stripe", symbol: "vSTRIPE", category: "Fintech", slug: "stripe" },
  { name: "Databricks", symbol: "vDATABRICKS", category: "AI", slug: "databricks" },
  { name: "Anduril", symbol: "vANDURIL", category: "Defense", slug: "anduril" },
  { name: "Perplexity", symbol: "vPERPLEXITY", category: "AI", slug: "perplexity" },
  { name: "Kraken", symbol: "vKRAKEN", category: "Crypto", slug: "kraken" },
  { name: "Neuralink", symbol: "vNEURALINK", category: "Neurotech", slug: "neuralink" },
  { name: "Canva", symbol: "vCANVA", category: "Software", slug: "canva" },
  { name: "Lambda", symbol: "vLAMBDA", category: "AI", slug: "lambda" },
  { name: "Epic Games", symbol: "vEPIC", category: "Gaming", slug: "epic-games" },
  { name: "Discord", symbol: "vDISCORD", category: "Software", slug: "discord" },
];
