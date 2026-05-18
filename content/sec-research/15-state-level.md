# State-Level Frameworks

*Last researched: 2026-05-18*

Federal securities law does most of the work, but state-level regimes meaningfully alter the operating picture — for money transmission, custody, DAO liability, and offering compliance.

## Money transmitter law (the default state regime)

Almost every state requires a **money transmitter license (MTL)** to transmit value on behalf of others. Crypto exchanges, custodial wallets, and many on/off-ramps trigger MTL requirements.

- ~49 separate state regimes plus DC, Puerto Rico.
- **Multistate Money Services Business Licensing Agreement Program (MMLA)** via CSBS streamlines but does not unify.
- Federal **MSB registration with FinCEN** under the BSA is required in addition.
- Treatment of crypto-only firms varies widely — some states (Texas, Wyoming, Pennsylvania) historically exempted pure crypto-to-crypto activity; others (New York, California) regulate it expressly.

## New York — BitLicense

Issued by the **New York Department of Financial Services (NYDFS)** under 23 NYCRR 200, in force since 2015. Required to engage in any "virtual currency business activity" with NY residents or from NY.

- Application fee: $5,000. Estimated total cost to obtain: **$250K–$1M** including legal, compliance buildout, and cybersecurity ([S80]).
- Approval timeline: **12–24+ months**.
- Compliance obligations: capital, custody, cybersecurity (23 NYCRR 500), AML, consumer protection, BitLicense disclosures, change-of-control review.
- **Limited Purpose Trust Charter** as an alternative for entities that prefer trust supervision (Paxos, Gemini, NYDIG, Coinbase Custody Trust).

NY is the most expensive and stringent state regime. For consumer-facing crypto activity at scale, BitLicense or trust charter is non-negotiable.

## Wyoming — crypto-friendly stack

The most builder-friendly state. Wyoming created a layered framework:

### Special Purpose Depository Institution (SPDI)

State-chartered depository for digital assets. **100% reserve** (no fractional reserve). Allowed to hold customer fiat and digital assets in fiduciary capacity. Eligible for Fed master account on a case-by-case basis (Custodia litigation pending). Examples: Custodia, Kraken Bank.

### DAO LLC

Wyoming's **Decentralized Autonomous Organization Supplement** to its LLC Act ([S81]). A DAO can register as an LLC, granting members limited liability.

- Two forms: **member-managed** and **algorithmically-managed**.
- Algorithmically-managed DAO LLC requires the governing smart contract system to be **operational at filing**.
- Default voting and dissolution rules in the statute can be overridden by smart-contract logic.

### Wyoming Stable Token Act

Enables a state-issued Wyoming Stable Token. Status: implementation phase, not at scale.

### Other Wyoming features

- Property-rights statute classifying digital assets as personal property.
- Bailment treatment for custody (custodian does not own the digital asset).
- Series LLC available.
- No state income tax.

## California — DFPI Money Transmission and CCFPL

California's **Department of Financial Protection and Innovation (DFPI)** regulates money transmission and exercises broad consumer-financial authority under the California Consumer Financial Protection Law (CCFPL). The **Digital Financial Assets Law (DFAL)** — effective **July 1, 2026** (delayed once) — creates a California-specific virtual currency license. Material constraint for builders touching California consumers.

## Texas — Department of Banking

Texas regulates crypto exchanges via the Money Services Act. Historically distinguished between sovereign-currency-to-crypto (regulated) and crypto-to-crypto (less regulated), but practical posture has tightened. Texas remains relatively crypto-friendly with active mining industry.

## Other state regimes worth knowing

- **Montana** — minimal state-level requirements; popular for early operations.
- **Tennessee** — Decentralized Organization Act (DO Act) for DAOs.
- **Vermont** — Blockchain-Based LLCs (BBLLCs).
- **Florida** — relatively crypto-permissive; key for retail outreach.
- **Illinois, Connecticut, Hawaii, Louisiana, Nevada, Washington** — varying explicit virtual currency regimes; verify before consumer-facing activity.

## State blue-sky law (offerings)

Federal preemption matrix for token offerings:

| Federal exemption | State blue-sky |
|-------------------|----------------|
| Reg D 506(b)/(c) | **Preempted** (notice filing only) |
| Reg A+ Tier 1 | **Not preempted** — state qualification required |
| Reg A+ Tier 2 | **Preempted** (notice filing) |
| Reg CF | **Preempted** (notice filing) |
| Reg S | Generally not in state scope (offshore) |
| Registered '33 Act offerings | **Preempted** for covered securities |

Failing to file required state notice filings can trigger state-level enforcement even on preempted offerings.

## Custody — state trust charters

Outside Wyoming SPDIs, several states offer **trust company charters** suitable for crypto custody:

- New York (Limited Purpose Trust).
- South Dakota (favorable trust law).
- Nevada.
- New Hampshire.

Trust charters are an alternative to broker-dealer custody for institutional custodians (Anchorage, Paxos, BitGo, Gemini).

## DAO liability — beyond Wyoming

Most state common law does not address DAOs. Default treatment of an unincorporated DAO is **general partnership** — every member jointly and severally liable for the DAO's obligations. Wyoming, Tennessee, Vermont, and a handful of foreign jurisdictions (Marshall Islands DAO LLC, Cayman foundation company) offer entity wrappers that solve this.

Sand-up rule: **wrap your DAO in something before deploying material code or token treasury.** Unwrapped DAOs have lost in court (CFTC v. Ooki DAO, 2022 — service of process via chat box, default judgment).

## Practical state-level posture for builders

- [ ] Identify every state you will serve customers in (residency, IP geolocation).
- [ ] Map money transmission triggers per state.
- [ ] Get FinCEN MSB registration if you transmit funds (custodial/exchange operations).
- [ ] If serving New York: BitLicense or trust charter, or geofence.
- [ ] If serving California: DFAL license once effective (July 1, 2026).
- [ ] For DAO operations: file Wyoming DAO LLC, Tennessee DO, or equivalent.
- [ ] For custody: SPDI, trust charter, or registered broker-dealer.
- [ ] State notice filings for Reg D / Reg A+ Tier 2 in every state where investors reside.

## Primary sources

[S80], [S81] — see [99-sources.md](99-sources.md).
