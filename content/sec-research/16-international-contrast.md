# International Contrast — MiCA, UK FCA, MAS, VARA

*Last researched: 2026-05-18*

If you operate cross-border — and almost every token project does — U.S. rules are only one slice. This file maps the four most consequential non-U.S. regimes.

## EU — Markets in Crypto-Assets Regulation (MiCA)

The **most comprehensive crypto regime in the world.** Regulation (EU) 2023/1114. Directly applicable in all 27 EU member states (no transposition needed) ([S82], [S83]).

### Phased application

- **2024-06-30** — Title III & IV: rules for **asset-referenced tokens (ARTs)** and **e-money tokens (EMTs)** in force.
- **2024-12-30** — Full application: **Crypto-Asset Service Providers (CASPs)** and issuers of *other* crypto-assets (most utility tokens).

### MiCA taxonomy

MiCA's classifications do **not** mirror Project Crypto:

| MiCA category | What it covers |
|---------------|----------------|
| **Asset-Referenced Token (ART)** | Stablecoins backed by multiple currencies, baskets, or assets. Strict reserve, governance, redemption rules. |
| **E-Money Token (EMT)** | Single-fiat stablecoins (e.g., USDC, EURT). Treated as e-money under EMD2 + MiCA overlay. |
| **Other crypto-assets** (utility tokens, payment tokens) | Lighter regime; whitepaper requirement; no prior authorization but registration of CASPs. |
| **Crypto-asset out of scope** | Unique non-fungible NFTs (genuinely unique, not part of a large series), already-MiFID-regulated tokenized financial instruments. |

### CASP authorization

To provide crypto-asset services in the EU you need **CASP authorization** from a national competent authority (or be passported in from one).

- Capital requirements: €50K–€150K depending on services.
- Governance, custody, conflict-of-interest, complaint handling.
- 18-month **grandfathering window** (varies by member state — France, Malta, Luxembourg, Estonia took the full window to **July 1, 2026**) for firms already operating under national regimes.

### Whitepaper requirement for offers to the public

For non-ART/EMT crypto-assets offered to the public or admitted to trading, a **MiCA whitepaper** is required. Notification (not pre-approval), but the issuer is liable for content.

### Stablecoin caps

ART/EMT issuers must comply with reserve, redemption-on-demand, and disclosure rules. Significant ART/EMT subject to **transaction-volume caps** (a controversial cap on non-EUR stablecoin use within the EU was much discussed; verify current scope before relying).

### MiCA vs. Project Crypto comparison

- MiCA covers *all* crypto-asset services in one regime; the U.S. splits between SEC (securities), CFTC (commodities), prudential (stablecoins).
- MiCA imposes affirmative authorization; the U.S. interpretive approach lets non-securities trade freely subject to anti-fraud.
- MiCA stablecoin rules are stricter than the U.S. Covered Stablecoin posture in some respects, more permissive in others.

## UK — FCA Cryptoasset Regime (incoming)

Post-Brexit, the UK is implementing its own regime separate from MiCA ([S84]).

### Statutory framework

- **Financial Services and Markets Act 2000 (Cryptoassets) Regulations 2026** — made by Parliament **February 4, 2026**.
- Expected to come into force **October 25, 2027**.
- Applications for authorization open **September 2026**.

### New regulated activities

- Issuing **qualifying stablecoin**.
- **Safeguarding** of qualifying cryptoassets.
- Operating a **qualifying cryptoasset trading platform**.
- **Dealing** in qualifying cryptoassets as principal or agent.
- **Arranging** deals in qualifying cryptoassets.
- **Qualifying cryptoasset staking**.

### Public offers regime

Public offers of qualifying cryptoassets to the UK are **prohibited unless an exemption applies**:

- Small offers up to **£1,000,000**.
- Offers to qualified investors only.
- Fewer than 150 offerees.
- Minimum **£100,000** per investor.
- Offers of qualifying stablecoin by authorized issuers.

### Financial promotions

Already in force separately: the financial-promotions regime (since October 2023) requires crypto promotions to UK consumers to be made or approved by an FCA-authorized firm. Strict content rules; mandatory risk warnings; 24-hour cooling-off period for first-time investors.

## Singapore — MAS Payment Services Act + FSM Act DTSP

The **Monetary Authority of Singapore (MAS)** runs two overlapping regimes ([S85]).

### Payment Services Act (PSA) — Digital Payment Token (DPT) services

License required to deal in or facilitate exchange of DPTs in/from Singapore. Tiered licenses by transaction volume.

- Subject to AML/CFT (Notice PSN02).
- Limited consumer marketing — MAS posture has been hostile to mass-market crypto promotion.

### Financial Services and Markets Act 2022 — Digital Token Service Provider (DTSP)

In force **June 30, 2025**. Captures Singapore-based providers serving customers **exclusively outside Singapore** — closing the offshore-from-Singapore loophole.

- MAS has stated it will **rarely grant** DTSP licenses for purely offshore activity because of ML risk and supervision difficulty.
- Practical effect: many offshore-only operations have relocated out of Singapore (Dubai, Hong Kong).

### Tokenized capital-markets products

Securities tokens fall under the Securities and Futures Act (SFA) and are regulated like other securities. MAS's **Project Guardian** is the institutional tokenization sandbox — used by major banks for tokenized funds and FX.

## UAE — VARA (Dubai) + ADGM + SCA

The UAE is a multi-regulator stack ([S86]):

### Dubai — Virtual Assets Regulatory Authority (VARA)

Specialty regulator for virtual assets in Dubai (excluding DIFC). Activity-specific rulebooks:

- **Exchange**, **Custody**, **Broker-Dealer**, **Lending**, **Advisory**, **Issuance**.
- Each rulebook covers prudential, conduct, AML, technology risk, market abuse.
- **Public register** of licensed VASPs maintained on VARA's site.

### Federal-level: SCA (Securities and Commodities Authority)

Regulates onshore (mainland) virtual asset activity outside Dubai. **August 2025 cooperation agreement** with VARA: mutual recognition of licenses, coordinated supervision.

### ADGM (Abu Dhabi Global Market) and DIFC (Dubai International Financial Centre)

Common-law free zones with their own regulators (FSRA in ADGM; DFSA in DIFC). Both have mature virtual-asset frameworks. ADGM was the first major jurisdiction to license a crypto exchange (2018, MidChains).

### Central Bank of UAE

**Federal Decree-Law No. 6 of 2025** added "providing payment services using virtual assets" to regulated financial activities — bringing crypto-payment providers within CBUAE oversight.

## Quick comparative table

| Aspect | U.S. (current) | EU MiCA | UK (incoming) | Singapore | UAE/Dubai |
|--------|---------------|---------|---------------|-----------|-----------|
| Single comprehensive regime? | No (SEC/CFTC/banking split) | Yes | Yes (in force 2027) | Layered (PSA + FSMA + SFA) | Multi-regulator |
| Authorization for trading platforms | Reg ATS (modernizing) | CASP | Qualifying platform | DPT/DTSP license | VARA / FSRA / DFSA |
| Stablecoin regime | GENIUS Act (PPSI) | ART/EMT | Qualifying stablecoin | DPT or e-money rules | CBUAE + VARA |
| Utility-token public sale | Not a security → no securities rules; consumer law applies | MiCA whitepaper required | Authorized firm involvement | DPT services rules | VARA Issuance Rulebook |
| Public marketing | Generally permitted for non-securities | Strict (whitepaper liability) | Strict (s.21 FSMA approval) | Hostile to retail promotion | Permitted if licensed |

## Practical cross-border guidance

- **U.S. + EU**: pair U.S. Reg D 506(c) for U.S. accredited investors with MiCA whitepaper + CASP authorization for EU.
- **Avoiding the U.S.** does not mean avoiding U.S. law. The SEC asserts extraterritorial jurisdiction where U.S. investors are involved.
- **Geofencing** is operationally hard for permissionless protocols. Smart-contract-enforced jurisdictional restrictions, paired with credible front-end blocking, are the current best-effort approach.
- **Tax residency** of the issuing entity affects both regulatory and tax outcomes — Cayman foundation, Swiss Verein, Singapore holding, Wyoming LLC all have different cost/benefit profiles.

## Primary sources

[S82]–[S86] — see [99-sources.md](99-sources.md).
