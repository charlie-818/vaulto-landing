// Source of truth for the /glossary page. Pure data (no JSX) so the same
// definition strings feed both the visible DOM and the DefinedTermSet JSON-LD
// (which requires plain-text descriptions). Keep definitions self-contained and
// quotable — AI answering engines and search crawlers extract individual terms,
// so the first sentence must fully define the term.
//
// High-intent private-markets terms that competitors (Forge, EquityZen, Hiive)
// rank for. Distinct from content/sec-research/20-glossary.md, which is an
// SEC-token glossary — no overlap.

import { SITE_URL } from "./faq-data";

export { SITE_URL };

export type GlossaryTerm = {
  id: string; // kebab-case anchor, e.g. "tender-offer"
  term: string;
  definition: string; // plain text — reused verbatim in JSON-LD DefinedTerm.description
};

export const GLOSSARY_UPDATED = "2026-08-01";

export const GLOSSARY_NAME = "Private Markets & Pre-IPO Glossary";
export const GLOSSARY_DESCRIPTION =
  "Plain-language definitions of the private-markets and pre-IPO terms investors run into — tender offers, secondary sales, 409A valuations, SPVs, lockups, and more.";

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "pre-ipo",
    term: "Pre-IPO",
    definition:
      "Pre-IPO describes a private company that has not yet completed an initial public offering, along with any investment in or exposure to that company before it lists. Pre-IPO shares are typically illiquid and held by founders, employees, and early investors until a liquidity event such as an IPO or acquisition.",
  },
  {
    id: "secondary-market",
    term: "Secondary market",
    definition:
      "A secondary market is where existing shares of a private company change hands between investors, rather than the company issuing new shares to raise capital. It lets early shareholders — employees and early investors — sell before an IPO, and lets new buyers gain exposure to companies like SpaceX or OpenAI while they are still private.",
  },
  {
    id: "tender-offer",
    term: "Tender offer",
    definition:
      "A tender offer is a company-sanctioned event in which a buyer offers to purchase shares from existing shareholders at a set price during a fixed window. Private companies use tender offers to give employees and early investors structured liquidity without going public, and the terms are approved by the company rather than negotiated in individual private sales.",
  },
  {
    id: "409a-valuation",
    term: "409A valuation",
    definition:
      "A 409A valuation is an independent appraisal of a private company's common stock used to set the fair market value for employee stock options, named after Section 409A of the U.S. Internal Revenue Code. It is usually lower than the preferred-share price paid by venture investors and is refreshed at least once a year or after a material event like a new funding round.",
  },
  {
    id: "spv",
    term: "SPV (Special Purpose Vehicle)",
    definition:
      "A special purpose vehicle (SPV) is a legal entity — often an LLC — created to pool investors' money into a single asset, most commonly a stake in one private company. Investors buy into the SPV rather than holding the shares directly, which lets a group access an allocation together and simplifies the company's cap table to a single line item.",
  },
  {
    id: "lockup",
    term: "Lockup period",
    definition:
      "A lockup period is a window after a company's IPO during which insiders — employees, founders, and pre-IPO investors — are contractually barred from selling their shares, typically lasting 90 to 180 days. Its purpose is to prevent a flood of insider selling from destabilizing the stock immediately after listing.",
  },
  {
    id: "cap-table",
    term: "Cap table",
    definition:
      "A capitalization table, or cap table, is a record of who owns what in a company — every share, option, warrant, and convertible instrument, and the ownership percentage each represents. Investors review the cap table to understand dilution, liquidation preferences, and how a new investment fits alongside existing stakeholders.",
  },
  {
    id: "carried-interest",
    term: "Carried interest",
    definition:
      "Carried interest is the share of a fund's or SPV's profits paid to its managers as compensation, commonly around 20% of gains above a return threshold. It aligns managers with investors because they only earn the carry if the underlying investments appreciate.",
  },
  {
    id: "right-of-first-refusal",
    term: "Right of first refusal (ROFR)",
    definition:
      "A right of first refusal (ROFR) is a contractual right that lets a company or its existing investors match the terms of any proposed sale of private shares before an outside buyer can complete the purchase. ROFRs are one of the most common transfer restrictions that can delay or block a private secondary sale.",
  },
  {
    id: "preferred-stock",
    term: "Preferred stock",
    definition:
      "Preferred stock is the class of shares venture investors typically receive, carrying rights that common stock does not — such as liquidation preferences, anti-dilution protection, and sometimes board seats. Its per-share price is usually higher than the 409A common-stock value and is what drives a startup's headline post-money valuation.",
  },
  {
    id: "liquidation-preference",
    term: "Liquidation preference",
    definition:
      "A liquidation preference determines the order and amount investors are paid before common shareholders when a company is sold or wound down. A 1x preference returns an investor's original capital first; higher multiples or participating preferences can leave common shareholders with far less than a headline sale price implies.",
  },
  {
    id: "post-money-valuation",
    term: "Post-money valuation",
    definition:
      "Post-money valuation is a company's worth immediately after it receives new investment, equal to the pre-money valuation plus the amount raised. It is the figure most often quoted in funding announcements and is used to calculate what percentage of the company new investors own.",
  },
  {
    id: "implied-valuation",
    term: "Implied valuation",
    definition:
      "An implied valuation is an estimate of a private company's worth derived indirectly — from secondary-market trade prices, prediction-market odds, or comparable public companies — rather than from a formal priced funding round. Vaulto tracks implied valuations for private companies using live Polymarket prediction-market data.",
  },
  {
    id: "dilution",
    term: "Dilution",
    definition:
      "Dilution is the reduction in an existing shareholder's ownership percentage when a company issues new shares, such as during a funding round or when employees exercise options. Even if the number of shares you hold stays the same, dilution shrinks the slice of the company each share represents.",
  },
  {
    id: "accredited-investor",
    term: "Accredited investor",
    definition:
      "An accredited investor is an individual or entity that meets income or net-worth thresholds set by securities regulators, qualifying them to invest in private offerings that are not registered for the public. In the U.S., the common individual tests are over $200,000 in annual income (or $300,000 jointly) or more than $1 million in net worth excluding a primary residence.",
  },
];

// Build DefinedTermSet + BreadcrumbList JSON-LD for AI answering engines and
// crawlers. Each term becomes a DefinedTerm whose url matches the anchor id
// rendered on the page. Definitions are plain text, exactly as shown on-page.
export function buildGlossaryJsonLd() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/glossary`,
    name: GLOSSARY_NAME,
    description: GLOSSARY_DESCRIPTION,
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: GLOSSARY_TERMS.map((term) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/glossary#${term.id}`,
      name: term.term,
      description: term.definition,
      url: `${SITE_URL}/glossary#${term.id}`,
      inDefinedTermSet: `${SITE_URL}/glossary`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
    ],
  };

  return [definedTermSet, breadcrumb];
}
