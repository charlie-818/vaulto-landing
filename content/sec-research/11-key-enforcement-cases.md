# Key Enforcement Cases — The Crypto Securities Litigation Era

*Last researched: 2026-05-18*

This file maps the major SEC enforcement actions against crypto issuers and exchanges from 2017–2026 and what each one teaches builders. The 2024–2025 wave of dismissals largely cleared the docket as Project Crypto took shape, but the case law remains binding precedent on the questions presented.

## SEC v. LBRY, 1:21-cv-00260 (D.N.H. Nov. 7, 2022)

- **Facts.** LBRY sold LBC tokens directly through its app (no ICO) to fund development of a blockchain-based content network. Tokens had utility (publishing, tipping, paywall) and were also distributed as compensation/incentives.
- **Holding (summary judgment for SEC).** LBC was a security. LBRY's offerings were unregistered §5 violations ([S50]).
- **Reasoning.** LBRY only contested Howey's "efforts of others" prong. The court found LBRY's marketing and conduct led purchasers to expect appreciation tied to LBRY's continued development efforts.
- **Why it matters.** First time a federal court held a digital asset *sold without an ICO* was a security. Marketing matters. "Utility" framing does not insulate.
- **Update.** SEC and LBRY later acknowledged secondary-market sales of LBC were not securities transactions — consistent with Project Crypto's investment-contract-can-end doctrine.

## SEC v. Ripple Labs, 20-cv-10832 (S.D.N.Y. July 13, 2023)

Judge Analisa Torres. The first major court ruling to distinguish between sale channels of the *same* token ([S51]).

| Sale type | Holding | Why |
|-----------|---------|-----|
| **Institutional sales** ($728M) — direct, written contracts to sophisticated investors | **Securities** | Sophisticated buyers understood Ripple would use proceeds to develop XRP, satisfying "efforts of others." |
| **Programmatic sales** ($757M) — on exchanges, anonymous buyers | **Not securities** | Anonymous exchange buyers had no privity with Ripple and could not reasonably expect to receive Ripple's efforts in return. |
| **Other distributions** (employee comp, third-party services) | **Not securities** | No "investment of money." |

**Lessons:**
- *Same token, different sale channel, different result.* Classification is per-transaction, not per-token.
- Promotional context to buyers controls.
- Project Crypto's "investment contract can end" doctrine flows directly from this case's logic — and from the 2024 SEC v. Coinbase reasoning that secondary buyers might still be security purchasers, which was contested ground.
- SEC dropped its appeal in 2025.

## SEC v. Terraform Labs, 23-cv-01346 (S.D.N.Y. Dec. 28, 2023)

Judge Jed Rakoff granted summary judgment to the SEC ([S52]).

- **Tokens at issue.** UST (algorithmic stablecoin), LUNA, wLUNA, MIR.
- **Holding.** All four were securities under Howey. Investment of money, common enterprise, expectation of profits from Terraform's efforts.
- **The Anchor Protocol fact pattern.** Terra marketed UST + Anchor (a 20% fixed yield protocol). The court treated the UST-plus-yield structure as a unified investment scheme.
- **Rejection of Ripple distinction.** Rakoff explicitly declined to follow Torres's institutional/programmatic divide, holding that *Howey makes no such distinction*. The split between SDNY judges left ambiguity until Project Crypto's interpretation.

**Lessons:**
- Algorithmic stablecoins marketed with yield are securities. (Project Crypto's "Covered Stablecoin" carve-out explicitly *excludes* algorithmic and yield-bearing structures — Terraform is the cautionary tale.)
- Bundling a stable-looking asset with a yield protocol creates one investment contract.
- Different judges, different results — until interpretive guidance harmonizes.

## SEC v. Coinbase, 23-cv-04738 (S.D.N.Y. Mar. 27, 2024; dismissed Feb. 28, 2025)

Judge Katherine Polk Failla denied most of Coinbase's motion to dismiss ([S53]).

- **Holding on secondary markets.** Crypto transactions on secondary markets **cannot be categorically excluded** from constituting investment contracts. Coinbase's reliance on Ripple's programmatic-sales reasoning was rejected at the pleadings stage.
- **Staking-as-a-service.** SEC stated a plausible claim that Coinbase's staking program was an investment contract.
- **Dismissal.** February 28, 2025: SEC and Coinbase jointly stipulated dismissal *with prejudice*. No precedent overturned; the *holdings* remain on the books even though the case ended.

**Lessons:**
- Until 33-11412, the secondary-market question was genuinely open. Project Crypto's "investment contract can end" framing is now the SEC's official answer.
- Custodial staking-as-a-service is the riskiest staking model. Protocol-direct staking is fine ([S12]); pooled custodial yield is not.

## SEC v. Binance, 1:23-cv-01599 (D.D.C. June 28, 2024; dismissed May 29, 2025)

Judge Amy Berman Jackson allowed the bulk of claims to proceed but dismissed several ([S54]):

- **BNB primary sales** — claims survived.
- **BNB secondary sales** — **dismissed**. The court held the SEC had not plausibly alleged that secondary-market buyers expected Binance to use *their* contribution to generate profits.
- **BUSD** — **dismissed**. The court found implausible the allegation that Binance promised BUSD ecosystem development would lead buyers to expect price appreciation — by definition, a stablecoin's value is meant to remain constant.
- **Simple Earn** — claims survived. Yield product = investment contract.
- **Dismissal.** SEC stipulated dismissal with prejudice on May 29, 2025.

**Lessons:**
- A stablecoin marketed as stable does not, by itself, support an "expectation of profits" Howey prong — supports Project Crypto's Covered Stablecoin bucket.
- Custodial yield products are securities; on-chain non-custodial protocols are not (consistent with the May 2025 protocol-staking statement).

## SEC v. Kraken (Payward) — two cases

**2023 settlement** ([S55]). Kraken's staking-as-a-service program: $30M disgorgement + immediate cessation of the U.S. program. Settled — no court ruling.

**2023 separate suit** (operating as unregistered exchange/broker/dealer/clearing agency). Dismissed without prejudice in **March 2025** — no admissions, no penalties. Kraken restarted U.S. on-chain staking.

**Lessons:**
- 2023 staking settlement remains the SEC's strongest available position on custodial pooled staking products. The 2025 Corp Fin staking statement carved out *protocol* staking but did **not** retract the custodial-yield concerns.
- Settlements have less precedential weight than litigated holdings.

## Other notable matters (briefly)

- **SEC v. Telegram (TON), 2020** — preliminary injunction against the TON public-sale tranche; private SAFTs to accredited investors were the security, and the planned public distribution was an extension of that single offering. Lesson: SAFTs do not cleanse a downstream public distribution.
- **SEC v. Kik (Kin), 2020** — summary judgment for SEC; SAFT + public sale = single integrated offering of a security.
- **SEC v. BlockFi, 2022** — $100M settlement; interest-bearing crypto accounts are investment contracts. The yield-account playbook is settled.
- **In re Voyager / Celsius (bankruptcy/enforcement)** — same theme: yield accounts = securities.
- **DAO Report (2017)** — SEC's first crypto pronouncement; DAO tokens were securities. Historical anchor.

## Synthesis: enforcement era → Project Crypto

Pattern across cases:

| Activity | Treatment |
|----------|-----------|
| Issuer raises capital to build a network and promises holders will benefit | **Security** (Howey met) |
| Custodial pooled yield product | **Security** |
| Algorithmic / yield-bearing stablecoin | **Security** |
| Plain payment stablecoin (1:1, no yield, fully reserved) | **Not a security** (Binance BUSD ruling + Covered Stablecoin statement) |
| Protocol staking (non-custodial) | **Not a security** (Corp Fin May 2025) |
| PoW mining | **Not a security** (Corp Fin Mar 2025) |
| Meme coins (cultural, no managerial promise) | **Not a security** (Corp Fin Feb 2025) |
| Mature, decentralized network token | **Not a security** (Project Crypto codified) |
| Secondary sale of a token whose investment contract has matured | **Not a security** (now interpretive policy) |

Project Crypto's interpretive release is best read as the SEC's attempt to formalize the *lessons learned* from this litigation era — preserving the wins, conceding the losses, and giving builders a clearer map.

## Primary sources

[S50]–[S55] — case opinions and dockets indexed in [99-sources.md](99-sources.md).
