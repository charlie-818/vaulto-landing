import { FAQ_CATEGORIES, SITE_URL } from "@/lib/faq-data";
import { API_URL } from "@/lib/external-urls";

// Served at /llms.txt as text/plain. Built from the FAQ data so it stays in sync.
// Gives AI agents a concise, linked map of canonical answers and key resources.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    "# Vaulto",
    "",
    "> Vaulto is a protocol for trading the outcomes of major pre-IPO events as on-chain ERC-20 tokens on Polygon. It wraps Polymarket prediction-market baskets (when and at what valuation a company goes public) into redeemable long and short tokens. The first market is Anthropic. Vaulto also runs a read-only data API for private-company information.",
    "",
    "## Key pages",
    `- [Home](${SITE_URL}/): Overview of Vaulto`,
    `- [FAQ](${SITE_URL}/faq): Common questions about products, mechanics, safety, and the API`,
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

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
