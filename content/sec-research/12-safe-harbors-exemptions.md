# Safe Harbors and Exemptions — Compliant Paths to Sell a Token-Security

*Last researched: 2026-05-18*

If your token is a security (Bucket 4) — or is being sold as part of an investment contract before the network matures — you must either:

- **Register** the offering with the SEC (Form S-1 for issuers, S-3/S-4 for follow-ons / M&A; mutual fund vehicles use N-1A/N-2; Reg A+ uses Form 1-A); or
- Fit within a **registration exemption**.

This file covers the exemptions builders actually use, plus the two crypto-specific safe harbor *proposals* that are not yet law.

## Quick comparison

| Exemption | Cap (12-month) | Investors | Solicitation | Disclosure | Resale |
|-----------|----------------|-----------|--------------|------------|--------|
| **Reg D 506(b)** | None | ≤35 non-accredited + unlimited accredited | **No** general solicitation | Negotiated; required for non-accredited | Restricted (Rule 144) |
| **Reg D 506(c)** | None | Accredited only; **verify** | **Yes** | Negotiated | Restricted (Rule 144) |
| **Reg A+ Tier 1** | $20M | Anyone | Yes | Form 1-A + state qual. | Generally freely tradeable |
| **Reg A+ Tier 2** | $75M | Anyone (non-accredited limited to 10% income/NW) | Yes | Form 1-A + ongoing | Generally freely tradeable; preempts state |
| **Reg CF** | $5M | Anyone (non-accredited capped) | Limited (via portal) | Form C + ongoing | Restricted 1 year |
| **Reg S** | None | **Non-U.S. persons only** | Outside U.S. | Issuer-set | Distribution-period restrictions |
| **Rule 144A** | None | QIBs only | Yes (to QIBs) | Issuer-set | QIB-to-QIB |

## Rule 506(b) — private placement, no advertising

- No cap on raise size.
- Sell to unlimited accredited investors plus up to 35 sophisticated non-accredited.
- **No general solicitation** — must have pre-existing substantive relationship with offerees.
- If selling to *any* non-accredited, must deliver Reg D-style disclosure (essentially S-1-lite).
- File Form D within 15 days of first sale. Notice filings in each state.

Most early-stage token sales to insiders/angels use 506(b). The "no general solicitation" rule is the trap — public marketing of a token sale blows the exemption.

## Rule 506(c) — private placement *with* advertising

- Same uncapped size as 506(b).
- **Accredited investors only.**
- **Must take reasonable steps to verify** accredited status (not just self-cert).
- General solicitation allowed — public marketing OK.
- 2025 SEC staff guidance ([S60]) eased verification: a **minimum investment of $200,000** (natural persons) or **$1,000,000** (legal entities) combined with written representations now satisfies the verification step.

506(c) is the default modern path for compliant token offerings that need to market broadly. Pair with **Reg S** for non-U.S. buyers.

## Regulation A+ — "mini-IPO"

Form 1-A qualification with the SEC. Two tiers ([S61]):

- **Tier 1**: up to **$20M** in 12 months. State blue-sky qualification still required. Rarely used.
- **Tier 2**: up to **$75M** in 12 months. State blue-sky **preempted**. Non-accredited investor purchase limited to 10% of greater of annual income or net worth. Ongoing reporting (semiannual + annual).

Securities sold are generally freely tradeable from day one — uncommon among exemptions and important for tokenized-security liquidity strategies. Reg A+ has been used for tokenized equity offerings (e.g., INX, Exodus). Qualification typically takes several months; some recent filings have qualified in 50 days.

## Regulation CF — equity crowdfunding

- Up to **$5M** in 12 months ([S62]).
- All investors eligible (non-accredited subject to investment caps).
- Must use a registered **funding portal** or **broker-dealer**.
- Form C filing with SEC and on the portal.
- Audit/review tiering: under $124K issuer-cert; $124K–$618K reviewed; $618K–$1.235M reviewed or audited; over $1.235M audited.
- Ongoing reporting via Form C-AR.
- Securities restricted for one year after issuance.

Reg CF is rarely the right path for token offerings due to the $5M cap and platform constraints, but viable for community-funded projects.

## Regulation S — offshore offerings

For non-U.S. distributions. Three categories with escalating restrictions:

- **Category 1** — foreign issuer with no substantial U.S. market interest. Most permissive.
- **Category 2** — reporting issuers offshore. Moderate restrictions.
- **Category 3** — non-reporting U.S. issuers (where most U.S. crypto projects land). 1-year distribution compliance period; legend requirements; resale restrictions.

**Crypto-specific Reg S risk** ([S63]): token fungibility makes flowback hard to police. Offshore-sold tokens that cycle back to U.S. exchanges via market-makers or omnibus accounts may extend or contaminate the restricted period. Many builders pair **Reg S (offshore) + Reg D 506(c) (U.S. accredited)** to legally cover both populations from a single token issuance.

## Rule 144A

QIB-to-QIB resales. Useful for institutional-only tokenized debt and structured products. Not relevant for retail token issuance.

## Crypto-specific safe-harbor *proposals* (not yet law)

### Peirce Token Safe Harbor 2.0 (April 2021) — historical anchor

Commissioner Hester Peirce's proposal ([S64]): a **three-year grace period** during which an initial development team distributes tokens to build out a functional or decentralized network, exempt from §5 registration on the primary offer and sale, provided:

- Good-faith intent to reach **Network Maturity** (functional and/or decentralized) within three years.
- Required disclosures: source code, transaction history, token economics, development plan, prior token sales.
- **Exit Report** at three years — either outside-counsel analysis of decentralization/functionality, or registration of the token under §12 of the Exchange Act.
- Anti-fraud rules apply throughout.

Safe Harbor 2.0 was never adopted as a rule. It is the **conceptual ancestor** of Atkins's 2026 startup-exemption proposal.

### Atkins "Regulation Crypto Assets" startup + mature-network exemptions (March 2026) — preview

Per Chair Atkins's March 17, 2026 speech ([S5]) accompanying interpretive release 33-11412:

**Startup exemption (proposed):**
- Time-limited (around 4 years).
- Capped raise (around $5M order of magnitude).
- Non-exclusive — can stack with other exemptions.
- Principles-based disclosures about the investment contract and underlying crypto asset.
- Notice filing on entry and on exit.

**Mature-network exemption (proposed):**
- For sufficiently decentralized protocols whose tokens should be non-securities outright.
- Targets the Bucket 1 (digital commodities) endgame from the front side: a recognized "graduation" path.

**Both are speech proposals, not adopted rules.** Builders cannot rely on them today. Rulemaking requires Commission vote, proposing release, notice-and-comment, adopting release, and effective date. Watch the Federal Register through 2026–2027.

## Practical decision pattern for builders

```
Is your token a security (Bucket 4 or pre-maturity investment contract)?
│
├─ Yes → Need registered offering or exemption
│       │
│       ├─ Accredited investors only, can verify, want to market publicly
│       │   → Reg D 506(c) + Reg S (offshore)
│       │
│       ├─ Insiders + accredited angels, private only
│       │   → Reg D 506(b)
│       │
│       ├─ Retail, ≤ $75M, want secondary-tradeable
│       │   → Reg A+ Tier 2
│       │
│       └─ Retail community fund, ≤ $5M
│           → Reg CF
│
└─ No → Bucket 1/2/3/5 → No registration of the token itself
        But: anti-fraud applies; secondary venues still regulated;
        operating an exchange / broker-dealer still requires registration
        regardless of whether the tokens traded are securities.
```

## Bad-actor and ongoing-compliance gotchas

- **Rule 506(d) "bad actor" disqualification.** Any director, officer, GP, manager, 20%+ holder, or promoter with disqualifying events (certain felonies, SEC bars, court injunctions) **disqualifies** the issuer from 506. Must check every covered person before each closing.
- **Rule 144** restricted-securities resales — 6 months (reporting issuers) or 12 months (non-reporting) holding period; volume and manner-of-sale limits for affiliates.
- **State blue-sky** — Reg D and Reg A Tier 2 preempt; Reg A Tier 1 and Reg CF require notice filings; Reg S generally outside U.S. blue-sky.
- **Form D** filing for every Reg D offering, within 15 days of first sale.
- **Investment Company Act and Investment Advisers Act** — separate analysis. If your token represents a pooled vehicle, you may also trip the '40 Acts.

## Primary sources

[S5], [S60]–[S64] — see [99-sources.md](99-sources.md).
