# Bucket 1 — Digital Commodities (Network Tokens)

*Last researched: 2026-05-18*

## Definition

Crypto assets *"intrinsically linked to and derive their value from a programmatic operation of a crypto system that is 'functional' and 'decentralized,' rather than from the expectation of profits arising from the essential managerial efforts of others."* — Chair Atkins, 2025-11-12 ([S1])

Per 33-11412, digital commodities are not securities. The CFTC has expressed it will administer the Commodity Exchange Act consistent with this view, meaning certain digital commodities may fall within the CEA "commodity" definition and CFTC jurisdiction ([S6]).

## The two-part gate

A token qualifies as a digital commodity only if its underlying network is:

1. **Functional** — the protocol does what it is intended to do; users can transact, validate, or otherwise use it for its stated purpose.
2. **Decentralized** — no single person or coordinated group exerts essential managerial effort on which token-holder profits depend. (This is the operational legacy of the 2018 Hinman speech, now elevated into the SEC's formal interpretation.)

Both gates must be open. A functional but centrally-controlled network fails. A decentralized but non-functional network fails.

## Examples (illustrative, not adjudicated)

- **Bitcoin (BTC)** — long understood by both SEC and CFTC to be a non-security commodity.
- **Ether (ETH)** — Hinman's 2018 speech declared current sales of ETH not securities transactions; the 2026 framework affirms the direction.
- **Proof-of-Work mining rewards** — Corp Fin's March 2025 statement confirmed PoW mining activities are not securities offerings ([S10]).
- **Protocol staking rewards** — Corp Fin's May 2025 statement: staking is "administrative or ministerial," not entrepreneurial, and not an offer of securities ([S12]).

## Investment-contract origin and maturation

A token can be **issued via an investment contract** (a security offering under Howey) and later **mature** into a digital commodity once the network is functional and decentralized and the issuer's promotional/managerial role has receded ([S1], [S2]).

Practical consequence: a sale of the *original investment contract* may need to comply with securities laws; later sales of the *underlying token* on secondary markets — once maturation has occurred — may not. The interpretation acknowledges this transition explicitly ([S8]).

## Compliance checklist for builders aiming at this bucket

- [ ] Network is live and feature-complete (or has a clear, narrow technical roadmap whose execution does not drive token price).
- [ ] No central party controls validation, governance changes, or treasury.
- [ ] Token holders' expected returns come from *use of* and *participation in* the network, not from a team's promised work.
- [ ] Marketing materials avoid promises of returns, price targets, buybacks, or "team will deliver value" framing.
- [ ] Documented decentralization: validator distribution, code commits diversity, governance vote distribution, treasury independence.
- [ ] Original distribution: if there was a token sale, it was structured as a compliant securities offering or designed around the forthcoming startup exemption ([S5]).

## Red flags that pull you back toward a security

- Pre-launch sale with team retaining large unlock schedule.
- "Buyback and burn" tied to revenue.
- Roadmap promises of future features the team must build.
- Single-foundation control of upgrades.
- Yield, staking returns, or fee distributions characterized as investor returns.

## Open questions

- **How decentralized is "decentralized enough"?** No bright-line metric in 33-11412. Expect litigation and rulemaking to refine.
- **Mature-network exemption** — Atkins has previewed it; mechanics are not final ([S5]).
- **What about wrapped or bridged versions** of a digital commodity? Generally take the classification of the underlying, but custodial wrappers introduce complications.

## Primary sources

[S1], [S6], [S8], [S10], [S12] — see [99-sources.md](99-sources.md).
