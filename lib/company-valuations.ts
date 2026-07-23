// Server-only: fetches LIVE Polymarket-implied valuations from the Vaulto API
// (/api/implied-valuations) and maps them to the showcase tickers by slug.
// This is the same number the trading platform shows — derived from live
// Polymarket odds — NOT the static funding-round `valuationUsd`.
//
// Requires VAULTO_API_TOKEN (never a NEXT_PUBLIC_ var — the key stays
// server-side). Falls back to an empty map when the token is missing or the
// request fails, so the showcase still renders (cards show the "implied
// valuation" label instead of a number).

import { SHOWCASE_COMPANIES, type Valuation } from "./showcase-companies";
import { API_URL } from "./external-urls";

// The /api/implied-valuations endpoint returns { companies: IvEntry[] }.
type IvEntry = {
  companySlug?: string;
  impliedValuationUsd?: number | null;
  timestamp?: string | null;
};

export async function getShowcaseValuations(): Promise<Record<string, Valuation>> {
  const token = process.env.VAULTO_API_TOKEN;
  const base = process.env.VAULTO_API_URL || API_URL;
  if (!token) return {};

  let entries: IvEntry[] = [];
  try {
    const res = await fetch(`${base}/api/implied-valuations`, {
      headers: { "Content-Type": "application/json", "x-api-key": token },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate: 300 }, // 5-min ISR, matching the API's server cache
    });
    if (!res.ok) return {};
    const json = await res.json();
    entries = Array.isArray(json.companies) ? json.companies : Array.isArray(json) ? json : [];
  } catch {
    return {};
  }

  const bySlug = new Map(entries.map((e) => [e.companySlug, e]));
  const out: Record<string, Valuation> = {};
  for (const sc of SHOWCASE_COMPANIES) {
    const entry = bySlug.get(sc.slug);
    const v = entry?.impliedValuationUsd;
    if (typeof v === "number" && v > 0) {
      out[sc.symbol] = { valuationUsd: v, valuationAsOf: entry?.timestamp ?? undefined };
    }
  }
  return out;
}
