# Bucket 4 — Digital Securities (Tokenized Securities)

*Last researched: 2026-05-18*

## Definition

Crypto assets that *"represent the ownership of a financial instrument enumerated in the definition of 'security'"* under §2(a)(1) of the Securities Act and §3(a)(10) of the Exchange Act. *"Tokenized securities are and will continue to be securities under the federal securities laws."* — Chair Atkins, 2025-11-12 ([S1])

Per 33-11412, these are securities. Full stop. Putting a security on a blockchain does not change its classification — *"economic reality governs; labels do not"* ([S4]).

## Distinction worth memorizing

- **Tokenized security**: a token that *represents* a pre-existing security (e.g., a tokenized share of stock, a tokenized bond, a tokenized fund interest).
- **Security token**: industry slang. Often loosely used to mean either (a) a tokenized security or (b) a token that *is* a security because it represents an investment contract.
- **Investment-contract token**: a token issued as part of an investment contract under Howey. May or may not survive the maturation transition (see [Bucket 1](02-bucket-digital-commodities.md)).

In this KB:
- "Tokenized security" = pre-existing financial instrument wrapped on-chain.
- "Investment-contract token" = security under Howey because of how it was sold and the surrounding economic reality.

Both are securities. Both live in this bucket while they are securities.

## What counts as a "security" under §2(a)(1)

Non-exhaustive: any note, stock, treasury stock, security future, bond, debenture, evidence of indebtedness, certificate of interest or participation in any profit-sharing agreement, investment contract, certificate of deposit for a security, voting-trust certificate, fractional undivided interest in oil/gas/mineral rights, put, call, straddle, option, etc.

A tokenized version of any of the above is a security.

## Compliance burden — what tokenizing a security entails

If issuing:

- **Registered offering (Form S-1)** OR
- **Exempt offering**: Reg D 506(b), Reg D 506(c), Reg A+ Tier 1 or Tier 2, Reg CF, Reg S, Rule 144A. See [12-safe-harbors-exemptions.md](12-safe-harbors-exemptions.md).

If trading:

- Must trade on a **national securities exchange** or a **registered alternative trading system (ATS)**.
- Intermediaries must be registered **broker-dealers**.
- A **registered transfer agent** must maintain the record of ownership (the SEC has not waived this for on-chain shares — the smart contract may *be* part of the transfer-agent function but the regulated person/entity must still register). See [13-secondary-market-ats.md](13-secondary-market-ats.md).

## Custody

Broker-dealers holding crypto-asset securities for customers must comply with the Customer Protection Rule (Rule 15c3-3). The 2025 broker-dealer FAQs clarified custody and financial-responsibility expectations ([S2]). The earlier SAB 121 posture (treating customer crypto as on-balance-sheet liability) has been retracted in 2025; a successor framework is forthcoming under Project Crypto ([S2]).

## Common tokenized-security patterns

- **Tokenized equity** — on-chain shares of a private company (e.g., Vaulto-Protocol-style synthetic shares of private companies fall in or near this bucket — fact-specific).
- **Tokenized debt** — on-chain bonds, notes, structured products.
- **Tokenized fund interests** — on-chain shares of an investment company, BDC, or fund.
- **Tokenized real-world assets (RWAs)** where the on-chain claim is a security under U.S. law — many RWA structures are securities.

## Anti-fraud and disclosure

Full anti-fraud and disclosure regime applies: Sections 11, 12, and 17 of the '33 Act; Section 10(b) and Rule 10b-5 of the '34 Act; insider-trading rules; market-manipulation rules.

## Compliance checklist

- [ ] Issuance under a registered or exempt path with proper filings (Form S-1, Form D, Form 1-A, Form C, etc.).
- [ ] Investor accreditation/verification if relying on 506(c).
- [ ] Bad-actor checks (Rule 506(d)).
- [ ] Transfer agent engaged and registered.
- [ ] Custody arrangements compliant with broker-dealer rules where applicable.
- [ ] Secondary trading only via registered venues.
- [ ] Disclosure documents accurate; ongoing disclosure obligations (e.g., Reg A+ semiannual/annual) met.
- [ ] State blue-sky compliance (if not preempted).

## Open questions and tensions

- **Smart-contract transfer logic vs registered transfer agent**: how does on-chain transfer reconcile with §17A(c) transfer-agent registration? Expect rulemaking.
- **On-chain shareholder votes** and proxy rules.
- **Tokenized securities trading 24/7** vs market-hours conventions and best-execution duties.
- **Cross-border tokenization** under Reg S vs onshore Reg D in a single token contract.
- **DeFi composability** — putting a tokenized security into an AMM may amount to operating an unregistered exchange.

## Primary sources

[S1], [S2], [S6], [S8] — see [99-sources.md](99-sources.md).
