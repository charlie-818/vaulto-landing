# Federal Market-Structure Legislation — FIT21, CLARITY, GENIUS

*Last researched: 2026-05-18*

Project Crypto is interpretive guidance — it operates within existing statutes. Congress has parallel work in flight that would *codify* the regime. This file covers what is law, what is pending, and what they mean for builders.

## Status snapshot (May 2026)

| Bill | Subject | Status as of May 2026 |
|------|---------|----------------------|
| **GENIUS Act** | Payment stablecoin regulation | **Law** (signed 2025-07-18) |
| **CLARITY Act** | Digital asset market structure (SEC/CFTC division) | Passed House 2025-07-17; cleared Senate Banking Committee 2026-05-14; Senate floor pending |
| **FIT21** (predecessor) | Market structure | Passed House 2024-05-22; died in 118th Congress; logic absorbed into CLARITY |
| **Anti-CBDC Surveillance State Act** | Bars retail Fed CBDC | Bundled into CLARITY |

## GENIUS Act — Payment stablecoin law

The **Guiding and Establishing National Innovations for U.S. Stablecoins Act**, signed by President Trump on **July 18, 2025** ([S70], [S71], [S72]).

### What it does

Creates the **first federal regulatory regime for payment stablecoins** in the U.S. Aligns with the SEC's "Covered Stablecoin" view (not a security under federal securities law) by giving stablecoin issuers a prudential home outside the securities regulators.

### Core requirements for issuers

- **100% reserve backing** in liquid assets (USD, short-duration U.S. Treasuries, etc.).
- **Monthly public disclosure** of reserve composition.
- **Permitted Payment Stablecoin Issuer (PPSI)** status — only PPSIs can issue. Non-PPSIs prohibited.
- **Bank Secrecy Act** applicability — AML, sanctions, CIP.
- **Marketing restrictions** — no claims of FDIC insurance, government backing, or legal tender status.
- **Seize/freeze/burn capability** — technical ability to comply with lawful orders.

### Effective date

The earlier of (a) 18 months after enactment (≈ January 2027) **or** (b) 120 days after primary federal regulators issue implementing rules.

### Builder implications

- Stablecoin issuance is no longer a free-form activity. Operating a stablecoin in the U.S. without PPSI status will be unlawful once GENIUS is effective.
- The "Covered Stablecoin" SEC staff statement ([S11]) and the GENIUS Act are **complementary** — SEC stays out of stablecoins; banking/prudential regulators (OCC, Fed, FDIC, state banking departments) move in.
- Foreign stablecoins offered into the U.S. likely require pathway through GENIUS as well (extraterritorial application; verify rule).
- **No yield to holders.** GENIUS preserves the no-yield posture that keeps stablecoins out of the securities lane.

## CLARITY Act — Digital Asset Market Structure (pending)

The **Digital Asset Market Clarity Act of 2025** (H.R. 3633, 119th Congress) ([S73], [S74]). Passed the House on **July 17, 2025** (294–134). Cleared Senate Banking Committee on **May 14, 2026** (15–9). Awaits Senate floor as of May 18, 2026.

### What it does

Codifies the SEC/CFTC jurisdictional split that FIT21 (predecessor, 2024) first attempted. Creates three statutory categories:

1. **Restricted digital asset** — SEC jurisdiction. Default category.
2. **Digital commodity** — CFTC jurisdiction. Requires a "functional and decentralized" blockchain.
3. **Permitted payment stablecoin** — Defers to GENIUS Act / prudential regulator. SEC or CFTC may share market-conduct oversight depending on the intermediary.

### Decentralization standard (carryover from FIT21)

A blockchain is "decentralized" for digital-commodity status if, among other tests:

- No person has **unilateral authority** to control the blockchain or its use.
- No issuer or affiliated person controls **20%+** of the digital asset's supply or voting power.

### Builder implications (if enacted)

- The "graduation" path Atkins's Project Crypto previews via interpretation becomes **statutory**.
- A token that starts as a restricted digital asset (SEC) can transition to a digital commodity (CFTC) on satisfying the decentralization test.
- ATSs operating under SEC jurisdiction can dual-register or pass tokens to CFTC-regulated venues once the asset transitions.
- The 20% concentration test gives a hard cap on team/foundation token holdings — major design consideration for new launches.

### Risks if CLARITY does not pass

The current state — Atkins's interpretation + GENIUS — is the regulatory floor. Builders can rely on interpretive guidance, but a future administration could rescind it. CLARITY would lock the SEC/CFTC division into statute, making the framework durable across administrations.

## FIT21 — historical anchor

**Financial Innovation and Technology for the 21st Century Act** (H.R. 4763, 118th Congress) ([S75]). Passed House **May 22, 2024** (279–136). Died in the Senate when the 118th Congress ended. Conceptual content carried into CLARITY.

Notable: passed over Biden administration and SEC Chair Gensler opposition. The 71 House Democrats who voted yes signaled the bipartisan baseline that CLARITY now builds on.

## Other relevant bills (briefly)

- **Lummis-Gillibrand "Responsible Financial Innovation Act"** — Senate-side counterpart with similar SEC/CFTC division; influential on negotiation but not currently the lead vehicle.
- **Blockchain Regulatory Certainty Act** — clarifies that non-custodial blockchain developers and miners/validators are not money transmitters.
- **Securities Clarity Act** — distinguishes the "investment contract" from the "asset" subject of the contract; codifies the Ripple programmatic-vs-institutional logic.

## Practical posture for builders

- **Treat GENIUS as binding now.** Plan stablecoin operations against the PPSI framework even before the effective date.
- **Treat CLARITY as likely but not certain.** Design tokens to satisfy the 20% concentration test and the "functional + decentralized" standard — useful even if CLARITY stalls, because Atkins's interpretive framework asks similar questions.
- **Watch the Senate vote window.** As of May 2026 the next floor action is anticipated in June.
- **CFTC jurisdiction is real.** Once a token is a "digital commodity," CFTC enforcement and venue registration matter as much as SEC compliance did before.

## Primary sources

[S70]–[S75] — see [99-sources.md](99-sources.md).
