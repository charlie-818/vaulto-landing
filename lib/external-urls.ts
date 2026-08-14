export const LEGACY_SITES = {
  search: "https://search.vaulto.ai",
  swap: "https://swap.vaulto.ai",
  ramp: "https://ramp.vaulto.ai",
  stake: "https://stake.vaulto.ai",
} as const;

export const WHITEPAPERS = {
  predictionMarket: "https://app.vaulto.fi/whitepaper.pdf",
} as const;

export const API_URL = "https://api.vaulto.ai";

export const CAREERS_URL = "https://hiring-platform-one.vercel.app";

export const SOCIAL_URLS = {
  github: "https://github.com/vaultoai",
  x: "https://x.com/vaultoAI",
  linkedin: "https://linkedin.com/company/vaulto",
  linkedinJobs: "https://linkedin.com/company/vaulto/jobs/",
  instagram: "https://instagram.com/vaulto.fi",
  youtube: "https://youtube.com/@vaultoAI",
} as const;

/**
 * Derives the @handle for X/Twitter from an x.com URL, defaulting to
 * SOCIAL_URLS.x (e.g. "https://x.com/vaultoAI" -> "@vaultoAI"). Strips any
 * trailing slash and query string so metadata attribution stays clean.
 */
export function xHandle(url: string = SOCIAL_URLS.x): string {
  const { pathname } = new URL(url);
  const handle = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return `@${handle}`;
}
