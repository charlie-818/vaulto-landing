# Bucket 5 — Stablecoins (Covered Stablecoins)

*Last researched: 2026-05-18*

## Definition

A **Covered Stablecoin** is a stablecoin that ([S11]):

1. Is designed to maintain a **stable value relative to USD on a one-for-one basis**.
2. Is **redeemable** for USD on a one-for-one basis.
3. Is **backed by low-risk, readily liquid assets** with a value that meets or exceeds the redemption value in circulation.

Corp Fin's April 4, 2025 staff statement concluded the offer and sale of Covered Stablecoins **does not involve the offer and sale of securities** within §2(a)(1) of the Securities Act or §3(a)(10) of the Exchange Act ([S11]). Persons involved in creation and redemption do not need to register those transactions with the SEC or rely on an exemption.

## The five marketing factors (Corp Fin's test)

Per [S11], Covered Stablecoins:

1. Maintain a stable value relative to USD.
2. **Do not entitle holders to interest, profit, or other returns.**
3. **Do not reflect investment or ownership interest** in the issuer.
4. **Do not afford governance rights.**
5. **Do not provide financial benefit or loss** tied to any party's performance.

A token failing *any* of the five factors falls outside the "Covered Stablecoin" safe characterization — and the analysis defaults to Howey.

## Explicitly **not** covered

- **Algorithmic stablecoins** (uncollateralized or under-collateralized, peg maintained by mint/burn mechanics).
- **Yield-bearing stablecoins** (pays interest, fee share, or staking-like returns to holders).
- **Non-USD-pegged stablecoins** (EUR, JPY, gold, basket).
- **Stablecoins reflecting an ownership/profit interest** in issuer.

These are *not* automatically securities — but they are *not* covered by the staff statement and must be analyzed individually under Howey.

## Where yield-bearing stablecoins likely land

Yield-bearing dollar-pegged tokens are strong candidates for investment-contract treatment: pooled assets, common enterprise, expected return from issuer's investment management. Often best structured as a registered money-market fund or a Reg D / Reg A+ offering.

## Legislative overlay

The **GENIUS Act** (Guiding and Establishing National Innovation for U.S. Stablecoins) and parallel House stablecoin bills passed Congress in 2025 (status verify in Session 4). The federal regime imposes prudential/banking-style requirements on payment stablecoin issuers — orthogonal to but consistent with the SEC's "not a security" view for Covered Stablecoins. Builders need to comply with the prudential regime *and* avoid features that pull the token out of the Covered Stablecoin lane and into a security.

## Compliance checklist for builders issuing a stablecoin

- [ ] One-for-one USD peg.
- [ ] One-for-one USD redemption available to holders.
- [ ] Reserves: short-duration USD instruments only (cash, T-bills, repo, money-market shares). Reserve > 100% of float.
- [ ] **No yield to holders.** Period.
- [ ] No governance token bundled with the stablecoin (or, if bundled, the governance token is analyzed separately).
- [ ] No ownership/profit claim on issuer.
- [ ] Public reserve attestations (industry standard; regulator expectation).
- [ ] Comply with applicable federal payment-stablecoin statute (GENIUS Act / successor) and state money-transmitter laws.
- [ ] AML/BSA program if issuer is an MSB.

## Examples (illustrative)

- **USDC, USDP, GUSD** — generally fit the Covered Stablecoin pattern, subject to fact-specific analysis.
- **Tether (USDT)** — fact-specific; reserve composition and disclosure quality have been historically contested.
- **DAI** — partially collateralized by other crypto; the question is reserve composition and one-for-one redemption.
- **Yield-bearing "stable" products** (e.g., tokenized money-market fund interests) — securities; live in [Bucket 4](05-bucket-tokenized-securities.md).

## Red flags

- "Earn 4% APY by holding our stablecoin" → yield → not a Covered Stablecoin → likely security.
- "Stake your stablecoin for rewards" → same.
- Reserves include long-duration assets, corporate bonds, or unsecured loans → fails the "low-risk, readily liquid" test.
- Algorithmic peg maintenance (Terra/UST style) → not Covered.

## Anti-fraud reminder

Even though Covered Stablecoins aren't securities, anti-fraud reaches misstatements about reserves, redemption, or peg integrity. The SEC and FTC are both possible enforcers; state AGs too.

## Open questions

- **Tokenized money-market funds** that *look like* stablecoins economically — still securities (BlackRock BUIDL, Franklin FOBXX, etc.).
- **Foreign-currency stablecoins** — covered by no U.S. staff statement; analyze under Howey individually.
- **Hybrid models** (partial collateral + algorithmic component) — high risk; assume not Covered.

## Primary sources

[S6], [S8], [S11] — see [99-sources.md](99-sources.md).
