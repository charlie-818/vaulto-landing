# Foundations — Howey, Reves, and the Investment-Contract Test

*Last researched: 2026-05-18*

The 2026 Project Crypto interpretation ([S8]) is layered on top of two foundational Supreme Court cases that every builder must understand. Project Crypto did **not** replace these — it operationalized them.

## SEC v. W.J. Howey Co., 328 U.S. 293 (1946)

**Facts.** Howey sold parcels of orange groves to investors and contracted with them to cultivate, harvest, and remit profits. Buyers had no role in the citrus business; they got land + a service contract.

**Holding.** That bundle is an "investment contract" — a security — even though "land + service contract" isn't on the §2(a)(1) enumerated list. The Court read "investment contract" broadly to capture any scheme where economic substance matches.

### The Howey test (operative formulation)

A transaction is an investment contract — and therefore a security — if there is:

1. **An investment of money** (or any contribution of value)
2. **In a common enterprise**
3. **With a reasonable expectation of profits**
4. **Derived from the entrepreneurial or managerial efforts of others**

> Note: The original Howey opinion said *"solely"* from the efforts of others. Modern courts have softened that to *"primarily"* or *"predominantly"* — the investor can contribute *some* effort without escaping security treatment. The SEC's 2019 framework (now superseded) and the 2026 interpretation both follow this softened reading.

### Application to crypto (per [S8] and pre-supersedure [S30])

- **Prong 1 — Investment of money.** Almost always satisfied in a token sale: fiat, crypto, or other valuable consideration is exchanged.
- **Prong 2 — Common enterprise.** Courts apply "horizontal commonality" (pooling among investors with pro-rata profit/loss) or "vertical commonality" (investor fortunes tied to promoter's). In token sales, horizontal commonality is usually obvious — proceeds go into a single pool used to build the network.
- **Prong 3 — Expectation of profits.** Look at marketing, roadmaps, statements about price appreciation, lock-ups, vesting, and the reasonable expectation a buyer would form.
- **Prong 4 — Efforts of others.** The key crypto-specific prong. Are token-holder returns dependent on a foundation, dev team, or coordinated promoter? If yes, security. If the network is functional and sufficiently decentralized so that holder returns come from market dynamics or their own use, not from a team — not a security.

Project Crypto's five-bucket framework is, in effect, a structured shortcut for applying the Howey test to common patterns ([S1]).

## Reves v. Ernst & Young, 494 U.S. 56 (1990)

**Facts.** A farmers' cooperative sold uncollateralized, uninsured demand notes to fund operations. The Co-Op went bankrupt. Note-holders sued the auditor under §10(b).

**Holding.** Demand notes were "securities" under the §3(a)(10) definition of "note." The Court adopted the **family-resemblance test** for notes.

### The Reves family-resemblance test

A note is **presumed to be a security** unless it bears a strong family resemblance to one of a judicially crafted list of non-security note types (e.g., consumer financing notes, home mortgages, short-term notes secured by a lien on a small business, character loans to bank customers, short-term notes secured by accounts receivable, notes evidencing loans by commercial banks for current operations).

To assess resemblance — or to add a new category to the non-security list — courts weigh **four factors**:

1. **Motivations** of a reasonable seller and buyer entering the transaction. Investment motive on the buyer's side → security. Commercial/consumer purpose → less likely.
2. **Plan of distribution** — broad, common trading for speculation/investment → security. Narrow, private → less likely.
3. **Reasonable expectations of the investing public** — would the public see this as an investment?
4. **Existence of another regulatory scheme** that reduces risk so the Securities Acts are unnecessary (e.g., banking regulation, ERISA).

No single factor is dispositive; they are weighed as a whole.

### Why Reves matters for crypto

Token-denominated debt instruments — on-chain notes, perpetual notes, lending-protocol receipts, certain stablecoin structures — are **notes** first. They get the Reves analysis, not (only) Howey. The Reves presumption is the **opposite** of Howey: a note is presumed to be a security and you have to argue your way out.

Tokenized fixed-income, BD-issued notes on-chain, and many DeFi lending positions live in Reves territory.

## Other classic doctrines worth knowing

- **Common enterprise** — circuits are split between horizontal (broadest acceptance) and vertical commonality (broad vs. narrow). Most crypto cases satisfy horizontal commonality.
- **"Economic reality" doctrine** — *United Housing Foundation v. Forman*, 421 U.S. 837 (1975). Substance over form. Atkins's framing of "economic reality governs; labels do not" comes from this line.
- **Risk-capital test** — minority test in some states (notably California). Where Howey doesn't capture, the risk-capital test sometimes does.
- **Stock test** — *Landreth Timber Co. v. Landreth*, 471 U.S. 681 (1985). If the instrument is called stock and has stock features, it's a security — no further analysis.

## How 33-11412 fits

The 2026 interpretation ([S8]) is essentially: *here is how the SEC will apply Howey (and where relevant Reves) to crypto, organized into five buckets*. The interpretation superseded the 2019 Corp Fin framework ([S30]) — but the underlying Supreme Court tests remain controlling law.

You cannot "Project Crypto" your way around Howey/Reves. If your token's economic reality fits an investment contract, no five-bucket labeling will save it. Conversely, if the network is genuinely decentralized and functional, Howey's "efforts of others" prong fails and the token is not a security regardless of how you marketed it.

## Primary sources

- Howey opinion: 328 U.S. 293 (1946) — https://supreme.justia.com/cases/federal/us/328/293/ [S40]
- Reves opinion: 494 U.S. 56 (1990) — https://supreme.justia.com/cases/federal/us/494/56/ [S41]
- Forman, 421 U.S. 837 (1975) [S42]
- Landreth Timber, 471 U.S. 681 (1985) [S43]
- 2019 Framework (superseded) [S30]
- 33-11412 [S8]
