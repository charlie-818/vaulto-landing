// Source of truth for the /faq page. Pure data (no JSX) so the same answer
// strings feed both the visible DOM and the FAQPage JSON-LD (which requires
// plain-text answers). Keep answers self-contained and quotable — AI answering
// engines extract individual Q&A passages, so the first sentence must fully
// answer the question.
//
// Grounded in the live Vaulto product (../vaulto-protocol): prediction-market
// implied-valuation exposure on ~18 private companies via Polymarket (Polygon).
// Not the tokenization wrapper.

export type FaqLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FaqItem = {
  id: string; // kebab-case anchor, e.g. "what-is-vaulto"
  question: string;
  answer: string; // plain text — reused verbatim in JSON-LD acceptedAnswer.text
  links?: FaqLink[]; // optional internal/external links shown on-page only
};

export type FaqCategory = {
  id: string;
  heading: string;
  description?: string;
  items: FaqItem[];
};

export const SITE_URL = "https://vaulto.fi";
export const FAQ_UPDATED = "2026-05-30";

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "product",
    heading: "Product & mechanics",
    description: "What Vaulto is, what you can trade, and how positions work.",
    items: [
      {
        id: "what-is-vaulto",
        question: "What is Vaulto?",
        answer:
          "Vaulto lets you trade exposure to the implied valuations of leading private companies — like SpaceX, OpenAI, and Anthropic — before they go public. Each market's exposure is derived from Polymarket prediction-market events and tracks the company's live implied valuation. Unlike traditional private markets, you can buy, sell, or roll your position at any time.",
        links: [
          { label: "Read the whitepaper", href: "https://app.vaulto.fi/whitepaper.pdf", external: true },
        ],
      },
      {
        id: "what-can-i-trade",
        question: "What can I trade on Vaulto today?",
        answer:
          "You can take positions on roughly 18 private companies today, including SpaceX, OpenAI, Anthropic, Stripe, Databricks, Anduril, Perplexity, Kraken, Neuralink, Canva, Lambda, and Epic Games, plus markets such as Discord, Strava, Consensys, Ledger, Fannie Mae, and Freddie Mac. Each tracks the company's implied IPO valuation from Polymarket.",
      },
      {
        id: "long-vs-short",
        question: "What's the difference between long and short?",
        answer:
          "Long and short are the two sides of a position, not separate tokens. Going long means betting a company's valuation will reach a given tier or higher; going short means betting it will land below that tier. You choose a side in the trade widget, and you can flip your view by closing one side and opening the other.",
      },
      {
        id: "what-chain",
        question: "What blockchain does Vaulto run on?",
        answer:
          "Prediction-market positions settle on Polygon using USDC as collateral, routed through the underlying Polymarket markets. You trade from a built-in wallet, so you do not need to set up a separate wallet or bridge funds yourself.",
      },
      {
        id: "how-price-set",
        question: "How is a Vaulto position's price determined?",
        answer:
          "Prices come from the underlying prediction market. Vaulto reads the live odds of a company's IPO-valuation tiers on Polymarket and converts them into an implied valuation, with the Vaulto API serving as the source of truth for that figure. Your position's value moves directly with those live odds.",
      },
      {
        id: "how-to-open",
        question: "How do I open a position?",
        answer:
          "Pick a company, choose a side (long or short), enter a USDC amount, and confirm. Vaulto places the order on the underlying Polymarket market through your built-in wallet, and your position appears once it fills. There is no lockup — you can sell or roll the position whenever you want.",
      },
      {
        id: "how-to-exit",
        question: "How do I sell or exit a position?",
        answer:
          "You can close a position at any time by selling it back on Vaulto, or roll it into a later-dated market. Proceeds settle in USDC. Unlike traditional private markets, you are not locked in until the company goes public — exposure is liquid and tradeable on demand.",
      },
      {
        id: "fees",
        question: "What are Vaulto's fees?",
        answer:
          "Private-company prediction markets carry a fee of about 4% (400 bps) on the traded amount, shown before you confirm an order. There are no recurring, holding, or management fees.",
      },
      {
        id: "need-wallet",
        question: "Do I need my own crypto wallet?",
        answer:
          "No. Vaulto gives you a built-in wallet that you control, so you can start without installing a separate wallet or managing seed phrases. You fund it with USDC, and that balance is used as collateral when you open positions.",
      },
      {
        id: "yield",
        question: "Do Vaulto positions earn yield?",
        answer:
          "No. Vaulto positions are not yield-bearing and are not a savings product. They give pure directional exposure to a company's implied IPO valuation. Their value can rise or fall, and can go to zero when the underlying market resolves.",
      },
    ],
  },
  {
    id: "security",
    heading: "Security & trust",
    description: "Custody, where trades execute, and the main risks.",
    items: [
      {
        id: "custodial",
        question: "Is Vaulto custodial? Does it hold my funds?",
        answer:
          "Vaulto is non-custodial. Trades execute on a public venue — Polymarket on Polygon — and your collateral and positions sit in your own built-in wallet, not on a Vaulto balance sheet. You stay in control of your funds throughout.",
      },
      {
        id: "if-offline",
        question: "What happens if Vaulto goes offline?",
        answer:
          "Your assets stay with you. Positions live on the underlying public markets and in your own wallet, not inside Vaulto, so an outage of the Vaulto app does not lock up or seize your funds. Your USDC and any open positions remain accessible on Polygon directly.",
      },
      {
        id: "audited",
        question: "Is Vaulto safe to use?",
        answer:
          "Vaulto routes trades to an established venue such as Polymarket rather than running its own custody contracts for these positions, which keeps the trust surface small. Even so, this is early software in an inherently high-risk category — only commit what you can afford to lose.",
      },
      {
        id: "where-execute",
        question: "Where do my trades actually execute?",
        answer:
          "Prediction-market positions execute against the Polymarket order book on Polygon, settled in USDC. The Vaulto API supplies the implied-valuation data that drives pricing across the app.",
      },
      {
        id: "risks",
        question: "What are the main risks?",
        answer:
          "Trading private-company exposure is high-risk. A position's value tracks Polymarket's implied valuation and can move sharply or settle to zero when a market resolves. Vaulto depends on Polymarket (Polygon), so it inherits its risks. Vaulto positions are not securities, deposits, or yield products — only commit what you can afford to lose.",
        links: [{ label: "Read the compliance docs", href: "/compliance" }],
      },
    ],
  },
  {
    id: "developers",
    heading: "Developers & API",
    description: "The Vaulto data API for private-company information.",
    items: [
      {
        id: "has-api",
        question: "Does Vaulto have an API?",
        answer:
          "Yes. Vaulto runs a read-only REST API at api.vaulto.ai that serves structured data on private companies — valuations, funding rounds, financial estimates, leadership, and recent news for 150+ companies such as SpaceX, OpenAI, Anthropic, and Stripe.",
        links: [
          { label: "API docs", href: "https://api.vaulto.ai", external: true },
        ],
      },
      {
        id: "api-data",
        question: "What data does the API return?",
        answer:
          "Each company record includes its name and identifiers, latest valuation and total funding, revenue and EBITDA estimates, industry and market peers, headquarters and leadership, funding-round history, and up to ten recent news articles. You can list, filter, and search companies, or fetch one by its kebab-case ID such as 'spacex'.",
      },
      {
        id: "api-auth",
        question: "How do I authenticate with the API?",
        answer:
          "Pass an API key in the x-api-key request header, or as an apiKey query parameter. Create and manage keys from the Vaulto dashboard. Keep keys secret — a key is shown only once when created.",
      },
      {
        id: "api-public",
        question: "Is there a free endpoint I can call without a key?",
        answer:
          "Yes. GET /api/pricing is public and returns current per-request pricing with no key required. Every other endpoint requires an API key.",
      },
      {
        id: "api-rate-limit",
        question: "What are the API rate limits?",
        answer:
          "The default limit is about 100 requests per minute per key. Responses include X-RateLimit-Limit and X-RateLimit-Remaining headers, and a 429 response includes a Retry-After header when you exceed the limit.",
      },
      {
        id: "api-billing",
        question: "How is the API billed?",
        answer:
          "Billing is usage-based and metered per request. Private-company data endpoints cost more than standard endpoints, and each response returns its cost in an X-Request-Cost-USD header. Check live rates at the public GET /api/pricing endpoint.",
      },
      {
        id: "api-sdks",
        question: "Are there official SDKs?",
        answer:
          "Not yet. There are no official SDKs, but the API is a standard JSON REST service with an OpenAPI specification and documented cURL, JavaScript, and Python examples, so it works with any HTTP client. Note that large USD figures are 64-bit integers — use a BigInt-aware JSON parser to avoid precision loss.",
      },
    ],
  },
];

// Build FAQPage + BreadcrumbList JSON-LD for AI answering engines and crawlers.
// Answers are plain text, exactly as shown on-page.
export function buildFaqJsonLd() {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        url: `${SITE_URL}/faq#${item.id}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  };

  return [faqPage, breadcrumb];
}
