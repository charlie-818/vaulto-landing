import { FAQ_CATEGORIES, SITE_URL } from "./faq-data";
import { API_URL } from "./external-urls";
import { LIVE_MARKET_NAMES } from "./deployments-data";

// Joins names into an English list: "A", "A and B", "A, B, and C".
function formatList(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

// Builds the plain-text body served at /llms.txt.
// Derives live-market names from the on-chain deployment registry so it never
// contradicts lib/deployments-data.ts.
export function buildLlmsTxt(): string {
  const liveMarkets = formatList(LIVE_MARKET_NAMES);
  const marketsSentence = liveMarkets
    ? ` Markets are live for ${liveMarkets}.`
    : "";

  const lines: string[] = [
    "# Vaulto",
    "",
    `> Vaulto is a protocol for trading the outcomes of major pre-IPO events as on-chain ERC-20 tokens on Polygon. It wraps Polymarket prediction-market baskets (when and at what valuation a company goes public) into redeemable long and short tokens.${marketsSentence} Vaulto also runs a read-only data API for private-company information.`,
    "",
    "## Key pages",
    `- [Home](${SITE_URL}/): Overview of Vaulto`,
    `- [FAQ](${SITE_URL}/faq): Common questions about products, mechanics, safety, and the API`,
    `- [Transparency](${SITE_URL}/transparency): On-chain contracts, vaults, and Uniswap V3 pools on Polygon`,
    `- [Compliance](${SITE_URL}/compliance): Regulatory posture and analysis`,
    `- [API](${API_URL}): Read-only REST API for private-company data`,
    "",
    "## FAQ",
  ];

  for (const category of FAQ_CATEGORIES) {
    lines.push("", `### ${category.heading}`);
    for (const item of category.items) {
      lines.push(`- [${item.question}](${SITE_URL}/faq#${item.id}): ${item.answer}`);
    }
  }

  return lines.join("\n") + "\n";
}
