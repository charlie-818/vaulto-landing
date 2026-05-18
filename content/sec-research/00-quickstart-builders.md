# Quickstart — A Builder's Decision Tree

*Last researched: 2026-05-18. Read this first. Then verify against the deeper files cited in each step.*

You are a founder or builder. You have (or are about to have) a token. You want to know:

1. **Is my token a security?**
2. **If not — what bucket does it fit, and what do I still owe?**
3. **If yes — what is the compliant path?**

This file is a guided decision tree. It does not replace counsel. It does map the territory.

---

## Step 0 — Three rules to internalize before anything else

1. **Economic reality governs; labels do not.** Calling your token a "utility token" does not make it one. The SEC, CFTC, and courts look at how it works, how you market it, and what buyers reasonably expect. ([01](01-project-crypto-overview.md), [10](10-foundations-howey-reves.md))

2. **Anti-fraud always applies.** Even if your token is *not* a security, lying about it to buyers can still be a §17 / Rule 10b-5 violation. There is no "non-security" sanctuary for fraud.

3. **Project Crypto is interpretation, not statute.** The five-bucket framework reflects how the current SEC will analyze your token. A future administration could shift posture. Build for defensibility under both the interpretation *and* the underlying Howey case law.

---

## Step 1 — Run the Howey test

> A token is a security if it is an "investment contract": **(1) an investment of money, (2) in a common enterprise, (3) with a reasonable expectation of profits, (4) derived primarily from the entrepreneurial or managerial efforts of others.**

Answer each:

- **Prong 1 — Investment of money.** Is anyone paying anything (fiat, crypto, services) for your token? Almost always yes.
- **Prong 2 — Common enterprise.** Do buyers share in a pool, or are their fortunes tied to yours? Almost always yes for token sales.
- **Prong 3 — Expectation of profits.** Look at marketing, vesting, lockups, roadmap, price-support mechanics. Yes → security.
- **Prong 4 — Efforts of others.** Are buyers depending on **you** (founders, foundation, dev team) to build, maintain, market, or operate the network in ways that determine their returns? Yes → security.

If all four are yes: **security** (investment contract). Go to **Step 4**.

If prong 3 or 4 is genuinely no: continue to **Step 2** to find the bucket.

For notes / debt tokens, also run **Reves** ([10](10-foundations-howey-reves.md)) — notes are presumed securities unless you can argue otherwise.

---

## Step 2 — Match a Project Crypto bucket

```
Does the token represent ownership of a pre-existing financial instrument
(stock, bond, fund interest, etc.)?
└─ YES → Bucket 4: Digital Securities. Go to Step 4.

Is the token designed to maintain a stable 1:1 USD value, fully backed by
liquid USD reserves, redeemable on demand, with NO yield, NO governance,
NO ownership claim on issuer?
└─ YES → Bucket 5: Covered Stablecoin. Comply with GENIUS Act (PPSI status).
         See files 06 and 14.

Is the token bought primarily for cultural, aesthetic, collectible,
entertainment, or community value (art, music, in-game items, memes)?
Is buyer NOT expecting profit from your managerial efforts?
└─ YES → Bucket 2: Digital Collectibles. See file 03.

Does the token perform a practical, present-tense function (membership,
ticket, credential, identity, software-license, redeemable for a service)?
└─ YES → Bucket 3: Digital Tools. See file 04.

Is the underlying network BOTH functional (live, doing what it's supposed
to do) AND decentralized (no single party controls it, no dev team's
efforts drive holder returns)?
└─ YES → Bucket 1: Digital Commodity / Network Token. See file 02.

If you can't fit a bucket → assume Bucket 4 (security) until counsel says otherwise.
```

**Failure modes that pull you back to "security":**

- Yield, staking returns, revenue share, or buyback-from-revenue.
- Active development team whose work is expected to drive price.
- Marketing that emphasizes price appreciation, "to the moon," "future utility."
- Team holds large supply with unlock schedule.
- Pre-launch sale to retail before the product is built.
- Centralized governance, treasury, or upgrade authority.

---

## Step 3 — If non-security, what do you still owe?

Even if your token clears Howey, **none of these go away**:

- **Anti-fraud** — Section 17 of the '33 Act, Rule 10b-5, state consumer protection laws, FTC.
- **AML / BSA** — if you transmit value, you are likely a Money Services Business and must register with FinCEN + state MTLs.
- **OFAC / sanctions** — applies to all U.S. persons regardless of asset classification.
- **Tax** — IRS treats crypto as property; many activities are taxable events. (Out of scope here.)
- **CFTC commodity rules** — Bucket 1 digital commodities can fall under CEA. Fraud and manipulation rules apply. Derivatives on them (futures, swaps, options) are CFTC-regulated.
- **State money transmission** — separate licensing per state. NY BitLicense if you serve NY residents. ([15](15-state-level.md))
- **Consumer-protection law** — FTC, state AGs, CFPB.
- **Foreign regulators** if you have foreign users. MiCA, FCA, MAS, VARA. ([16](16-international-contrast.md))

If you are operating an **exchange, brokerage, custody, or trading venue** — these regulations apply *regardless of whether the tokens traded are securities*. Listing only non-security tokens does **not** spare you from broker-dealer / MSB / state licensing.

---

## Step 4 — If a security, pick a compliant offering path

Detailed in [12-safe-harbors-exemptions.md](12-safe-harbors-exemptions.md). Decision tree:

```
Who are you selling to, how much, and do you need to market publicly?

Accredited only, any amount, want to market broadly?
└─ Reg D 506(c) [+ Reg S for offshore]
    Verify accreditation (2025 rule: $200K min for individuals,
    $1M for entities + written rep).

Accredited + ≤35 sophisticated non-accredited, any amount, NO public marketing?
└─ Reg D 506(b)

Retail (anyone), ≤ $75M, want secondary-tradeable, OK with 1-A filing?
└─ Reg A+ Tier 2

Retail community, ≤ $5M, comfortable with portal?
└─ Reg CF

Offshore (no U.S. persons)?
└─ Reg S Category 3 (for most U.S. issuers)
    Watch flowback risk on fungible tokens.

QIB-to-QIB institutional?
└─ Rule 144A

Want to register fully?
└─ Form S-1 (issuer) / S-3, S-4 (follow-on, M&A)
```

For secondary trading of the security token, you also need:

- **A registered ATS or national exchange** (no permissionless DEXs for tokenized securities).
- **A registered transfer agent.**
- **Broker-dealer intermediation** with appropriate custody.
- **Bad-actor (Rule 506(d)) checks** before every closing.
- **Transfer restrictions** baked into the smart contract (Rule 144 holding periods, whitelists for accredited gating, Reg S compliance period).

See [13-secondary-market-ats.md](13-secondary-market-ats.md).

---

## Step 5 — Are you operating as more than just an issuer?

If yes, additional regimes apply:

| Activity | Required registration |
|----------|----------------------|
| Operating a venue that matches buyers and sellers of securities | Exchange (§6) or ATS + broker-dealer |
| Soliciting orders, holding customer assets, executing trades | Broker-dealer (§15) |
| Investment advisory for compensation | Investment Adviser (state or SEC) |
| Pooled investment vehicle | Investment Company Act ('40 Act) — major regime |
| Custody of customer crypto-securities | Broker-dealer or qualified custodian |
| Transmitting value | FinCEN MSB + state MTLs / BitLicense |
| Issuing a payment stablecoin | PPSI under GENIUS Act |
| Foreign-user-facing activity | MiCA CASP, UK FCA authorization, MAS DPT/DTSP, VARA license |

---

## Step 6 — Red-flag checklist

Run this against any token plan. Each "yes" is a security-risk signal:

- [ ] Pre-launch sale to retail before product is functional.
- [ ] Team retains 20%+ of supply with unlock vesting.
- [ ] Marketing references price targets, ROI, or "moon."
- [ ] Token grants share of revenue, fees, or buybacks.
- [ ] Staking returns funded by issuer rather than by protocol.
- [ ] Yield on a stablecoin.
- [ ] Algorithmic stablecoin without full collateral.
- [ ] Roadmap with team-built features tied to token value.
- [ ] Single foundation controls upgrades or treasury.
- [ ] Listing on non-registered exchange marketed to U.S. retail.
- [ ] Public sale tranche following an accredited SAFT (Telegram / Kik trap).
- [ ] Bundling a "utility token" with a yield protocol (Terra trap).
- [ ] DAO operating without an entity wrapper (general-partnership liability).

If three or more are checked, get securities counsel before issuance.

---

## Step 7 — Safer paths the SEC has explicitly endorsed (Project Crypto era)

You stand on the firmest ground if you fit one of:

- **Pure payment stablecoin** under GENIUS Act PPSI rules ([06](06-bucket-stablecoins.md), [14](14-fit21-and-legislation.md)).
- **Functional + decentralized network token** with no managerial role for any team ([02](02-bucket-digital-commodities.md)).
- **In-game / membership / credential utility** with restricted transferability and no profit framing ([04](04-bucket-digital-tools.md), TurnKey Jet / Pocketful of Quarters precedent — [17](17-no-action-letters.md)).
- **Tokenized security** issued through a registered or exempt offering and traded on a registered ATS ([05](05-bucket-tokenized-securities.md), [12](12-safe-harbors-exemptions.md), [13](13-secondary-market-ats.md)).
- **PoW mining** or **non-custodial protocol staking** (Corp Fin 2025 statements — [17](17-no-action-letters.md)).
- **Cultural / collectible NFT** with no team-led financial mechanics ([03](03-bucket-digital-collectibles.md)).

## Step 8 — Things still uncertain

Reserve judgment / get specialist advice on:

- **DeFi protocols** as exchanges or brokers — Project Crypto has not yet resolved this.
- **Cross-chain bridges and wrapped tokens** — security status of the wrapped form is fact-specific.
- **Liquid staking derivatives** — non-custodial OK ([S2]); custodial pooled yield is risky.
- **Tokenized real-world assets (RWAs)** when the on-chain claim differs from the off-chain right — analyze under Howey.
- **Airdrops to U.S. users** — investment of money may still be satisfied by required-action distributions.
- **Token graduation** from investment-contract origin to digital commodity — Atkins says it can happen; mechanics not yet rulemaking-final.

---

## Final move: build a compliance memo

Before launch, produce an internal memo answering:

1. Which bucket does the token fit, and why? (cite [10](10-foundations-howey-reves.md), Project Crypto interpretation [S8], relevant case law)
2. What U.S. registration/exemption path are we using, if any?
3. What state and foreign regimes apply, and what licenses do we hold / need?
4. What ongoing disclosure and reporting obligations apply?
5. What transfer restrictions are coded into the contract?
6. Who is the registered transfer agent (if applicable)?
7. What custody arrangement protects buyer assets?
8. Red-flag audit: have we cleared the Step 6 list?

This memo, signed by counsel, is your defensible position if challenged.

## Where to go next

- Framework: [01-project-crypto-overview.md](01-project-crypto-overview.md)
- Your bucket: [02](02-bucket-digital-commodities.md) / [03](03-bucket-digital-collectibles.md) / [04](04-bucket-digital-tools.md) / [05](05-bucket-tokenized-securities.md) / [06](06-bucket-stablecoins.md)
- Case law: [10-foundations-howey-reves.md](10-foundations-howey-reves.md), [11-key-enforcement-cases.md](11-key-enforcement-cases.md)
- Compliance paths: [12](12-safe-harbors-exemptions.md), [13](13-secondary-market-ats.md)
- Legislation: [14](14-fit21-and-legislation.md)
- Jurisdictions: [15](15-state-level.md), [16](16-international-contrast.md)
- Staff guidance: [17](17-no-action-letters.md)
- Vocabulary: [20-glossary.md](20-glossary.md)
- Citations: [99-sources.md](99-sources.md)
