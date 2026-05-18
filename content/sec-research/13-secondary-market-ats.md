# Secondary Markets — ATS, Broker-Dealers, Custody, Transfer Agents

*Last researched: 2026-05-18*

A compliant *primary* issuance is necessary but not sufficient. Once a token-security exists, every secondary trade is subject to a parallel regime: where can it trade, who can intermediate, who custodies it, and who keeps the ownership records.

This is the area where 2025–2026 saw the most rulemaking churn under Project Crypto. The picture below is current as of May 2026 — verify before relying.

## Where can a security token trade?

A "security" can be traded only on:

1. A **national securities exchange** registered under §6 of the Exchange Act (NYSE, Nasdaq, etc.).
2. A **registered alternative trading system (ATS)** operating under Regulation ATS (Rule 300 et seq.) and registered as a broker-dealer.
3. Off-exchange via registered **broker-dealers** for negotiated trades.

Bilateral P2P trading of an *unrestricted* security between non-affiliates is legal but rare in token markets.

Trading an unregistered token-security on an unregistered venue exposes both venue and traders to §5 (registration) and §15 (broker-dealer) liability — the core of the 2023–2024 enforcement wave against Coinbase, Binance, and Kraken.

## Alternative Trading System (ATS) basics

An ATS is a non-exchange trading venue that matches buyers and sellers in securities. To operate one:

- Register as a **broker-dealer** with the SEC and join FINRA.
- File **Form ATS** with the SEC; refile with material changes.
- Comply with Regulation ATS rules on transparency, fair access (if >5% market share), and recordkeeping.
- Operate within the **subscriber-only** rule (no general public access).

**Registered crypto-asset ATSs** (illustrative, not endorsement): tZERO, INX Securities, Securitize Markets, Prometheum, North Capital Private Securities. Operating list changes — verify with FINRA's ATS list.

### Project Crypto's planned ATS modernization

Per Atkins's Project Crypto speeches and the December 2025 Trading & Markets guidance ([S65]):

- The SEC intends to **modernize Reg ATS** to accommodate 24/7 trading, on-chain settlement, and crypto-native order books.
- Exchange Act amendments are anticipated to permit "super-app" intermediaries to combine brokerage, custody, and trading in one entity.
- Until those rules adopt, ATSs must still operate under existing Reg ATS.

## Broker-Dealer registration and the "exchange" line

A platform that brings together "multiple buyers and multiple sellers" of securities using "established, non-discretionary methods" can be either an **exchange** (§6) or an **ATS** (Reg ATS) — choice is the operator's, but operating as either without registration violates §5 of the Exchange Act.

Acting as **intermediary in securities transactions** (matching buyers/sellers, holding customer funds/securities, soliciting orders) generally requires **broker-dealer registration under §15(a)**. The Coinbase, Binance, and Kraken cases all turned on this.

Project Crypto preserves these gates. What Project Crypto changes: it lets one broker-dealer perform the **full range** of crypto-asset-securities activities — trading, custody, lending — under a single registration, rather than the prior "special-purpose broker-dealer" sandbox that artificially limited scope.

## Custody — the SAB 121 → SAB 122 transition

**SAB 121** (April 2022, prior administration): required entities safeguarding customer crypto to gross up balance sheets — recognize a liability and corresponding asset. This effectively pushed banks and broker-dealers *out* of crypto custody.

**SAB 122** (January 23, 2025): **rescinded** SAB 121 ([S66]). Replaced with contingency accounting (ASC 450-20 / IAS 37). Banks and broker-dealers can again custody crypto without the punitive gross-up.

**Caveat:** SAB 122 does not eliminate the "control" analysis. If the custodian *controls* the asset (vs. holding as bailee), it may still be deemed accounting owner and required to recognize the asset/liability.

## Broker-Dealer custody of crypto-asset securities (Rule 15c3-3)

**December 2025 Trading & Markets staff statement** ([S65]): the staff will **not object** to a broker-dealer deeming itself to have "physical possession" of a crypto-asset security under Rule 15c3-3 (Customer Protection Rule) when:

- The BD controls the private keys (or equivalent) through secure protocols.
- The BD has policies, procedures, and controls reasonably designed to safeguard the asset.
- The BD maintains the asset segregated from its own.
- Standard recordkeeping (Rules 17a-3, 17a-4) is followed.

The prior **2020 Special Purpose Broker-Dealer Statement** is being phased out as the general framework absorbs crypto-asset securities into regular BD activity ([S65]).

## Transfer agents and on-chain shareholder records

§17A(c) of the Exchange Act requires a **registered transfer agent** to maintain ownership records for any "qualifying security." Tokenized securities are qualifying securities — so a registered transfer agent must be in the picture.

Open question: can the smart contract itself *be* the transfer agent's record-keeping system? In practice, modern tokenized-equity issuers engage a **registered transfer agent who maintains the on-chain registry**, with off-chain mirrors for SEC reporting. The transfer agent is the regulated person; the chain is its tool.

Project Crypto has signaled openness to **transfer-agent rule modernization** for distributed-ledger record-keeping but no proposing release as of May 2026.

## Trading desks, market makers, and DeFi

- **Market-making in a token-security** = dealer activity. Requires broker-dealer registration unless within a recognized exception.
- **Operating an AMM pool of a token-security** is, on its face, operating an unregistered exchange and likely an unregistered dealer. The legal status of permissionless DeFi protocols for token-securities is unsettled — most counsel currently advise against listing token-securities on public AMMs.
- **Tokenized-security secondary trading is best executed via a registered ATS** with on-chain settlement coordinated through a registered transfer agent.

## Cross-border secondary trading

- A token sold under **Reg S** carries distribution-compliance-period restrictions; secondary on a non-U.S. venue is generally permissible, but flowback to U.S. holders or U.S. venues during the restricted period contaminates the offering.
- A token sold under **Reg D** is *restricted security* under Rule 144 — secondary trading requires the resale exemption / Rule 144 conditions.
- **Rule 144** trumps token fungibility for compliance purposes — but is hard to enforce on-chain without whitelisting / transfer restrictions baked into the contract. Most tokenized-security implementations use **ERC-1400 / ERC-3643 / ERC-20 + transfer hook** patterns to enforce holder whitelists at the contract level.

## Operational checklist for issuers and venues

For an issuer of a token-security planning secondary liquidity:

- [ ] Engage a **registered transfer agent**.
- [ ] List on a **registered ATS** (or seek national exchange listing — rare for early-stage tokenized issuance).
- [ ] Smart contract enforces transfer restrictions (Rule 144, accredited gating, Reg S compliance period).
- [ ] Custody arrangements via SEC-registered broker-dealer or qualified custodian.
- [ ] Ongoing disclosure obligations met (Reg A+ Tier 2 semiannual/annual, Form D updates, Reg CF Form C-AR).
- [ ] No marketing the token on unregistered venues.

For a venue:

- [ ] Registered as broker-dealer, FINRA member.
- [ ] Form ATS on file; updated for any material change.
- [ ] AML/BSA program; CIP; OFAC screening.
- [ ] Custody compliant with Rule 15c3-3 and the December 2025 staff statement.
- [ ] Books-and-records under Rules 17a-3, 17a-4 (now allows electronic record-keeping per November 2022 amendments).

## Open questions

- **24/7 settlement** under T+1 conventions — Project Crypto signals accommodation, no rule yet.
- **On-chain proxy and corporate-actions** — proxy rules (Reg 14A) assume off-chain mailing; tokenized voting needs rule conformance or relief.
- **DeFi composability of token-securities** — current consensus: too risky. Pending rulemaking may carve out.
- **Cross-listed tokens** across multiple ATSs and jurisdictions — settlement, best-execution, NMS implications unresolved.

## Primary sources

[S2], [S6], [S65], [S66] — see [99-sources.md](99-sources.md).
