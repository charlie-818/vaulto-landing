# Bucket 3 — Digital Tools

*Last researched: 2026-05-18*

## Definition

Crypto assets that *"perform a practical function, such as a membership, ticket, credential, title instrument, or identity badge"* — Chair Atkins, 2025-11-12 ([S1])

Per 33-11412, digital tools are not securities ([S6]).

## What this covers

- Membership tokens (access to a community, gym, club, software)
- Event tickets and access passes
- Credentials (proof of completion, professional badges, KYC attestations)
- Identity badges, DIDs, soul-bound tokens
- Title instruments (digital deeds, certificates of ownership of *physical* assets where the token is the access/control mechanism, not an investment claim)
- Loyalty / rewards points denominated on-chain

## Qualification

A digital tool is one where:

1. The token's primary function is **practical use**, not investment.
2. The buyer expects to **use** the token (or transfer it for use by another), not to profit from someone else's efforts.

## Examples (illustrative)

- A coffee-shop loyalty token redeemable for free drinks.
- A conference ticket NFT with on-chain anti-scalping logic.
- A KYC credential issued by an attesting authority and usable across dapps.
- A software-license token granting access to a SaaS product.

## Boundary cases — pulled into other buckets

- **Tool tokens that accrue revenue share or yield** → likely [Bucket 4 — Digital Securities](05-bucket-tokenized-securities.md).
- **Tool tokens marketed as "appreciating in value because the team is building"** → likely security under Howey.
- **Tool tokens where supply is tightly managed by the issuer to drive price** → fact-intensive; risk of security characterization.
- **Tickets sold above-face with issuer-orchestrated resale market** → may invite Section 5 (registration) scrutiny if the resale market is the value driver.

## Compliance checklist

- [ ] Token has clear, articulable utility at the time of sale.
- [ ] Marketing is about utility, not appreciation.
- [ ] No yield, revenue share, or governance over treasury.
- [ ] Resale market exists only as a convenience; issuer does not orchestrate price.
- [ ] Discounts on bulk purchase don't disguise an investment-contract pre-sale ("buy 10,000 tickets at 90% off and resell later") — that structure leans security.

## Why this bucket is bigger than it looks

Real-world tokenization use cases — supply-chain provenance, identity, ticketing, software entitlement, asset-backed access — often slot here, not into the security bucket. Builders working in B2B or consumer-utility settings should consider whether the digital tools framing fits before defaulting to "let's tokenize a security."

## Open questions

- **Composability problem**: a tool token used as collateral in a DeFi protocol gets re-issued as a yield-bearing claim — does that downstream activity affect upstream classification? Generally no, but issuer's involvement in the downstream protocol matters.
- **Hybrid tokens** (utility + governance + yield) frequently fail the "single bucket" assumption — choose the dominant economic reality.

## Primary sources

[S1], [S6], [S8] — see [99-sources.md](99-sources.md).
