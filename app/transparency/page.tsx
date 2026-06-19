import type { Metadata } from "next";
import Image from "next/image";
import { CompanyLogo } from "@/components/CompanyLogo";
import { AddressPill } from "@/components/transparency/AddressPill";
import {
  ASSETS,
  COMING_SOON,
  DEPLOYMENTS_UPDATED,
  INTEGRATIONS,
  NETWORK,
  POOL_ROWS,
  PROTOCOL_CONTRACTS,
  UNISWAP,
  polygonscanAddress,
  polygonscanToken,
  type Asset,
  type AssetStatus,
} from "@/lib/deployments-data";

export const metadata: Metadata = {
  title: "Vaulto — On-chain Contracts & Deployments",
  description:
    "Every Vaulto smart contract on Polygon: tokenized company vaults, long/short token pairs, Uniswap V3 pools, the core protocol contracts, and collateral integrations — each with a verifiable Polygonscan link.",
  alternates: { canonical: "/transparency" },
  openGraph: {
    title: "Vaulto — On-chain Contracts & Deployments",
    description:
      "Verifiable, on-chain proof: tokenized company vaults, long/short tokens, Uniswap V3 pools, and protocol contracts on Polygon.",
    url: "https://vaulto.fi/transparency",
    type: "website",
    images: ["/socialbanner.png"],
  },
};

const updatedLabel = new Date(DEPLOYMENTS_UPDATED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const STATUS: Record<AssetStatus, { label: string; dot: string; chip: string }> = {
  live: {
    label: "Live",
    dot: "bg-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-600",
  },
  staged: {
    label: "Staged",
    dot: "bg-amber-500",
    chip: "bg-amber-500/10 text-amber-600",
  },
  "coming-soon": {
    label: "Coming soon",
    dot: "bg-[var(--muted)]",
    chip: "bg-[var(--badge-bg)] text-[var(--muted)]",
  },
};

function StatusBadge({ status }: { status: AssetStatus }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CompanyLogo name={asset.slug} size={40} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {asset.name}
              </h3>
              <span className="rounded bg-[var(--badge-bg)] px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-[var(--muted)]">
                {asset.category}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)]">
              {asset.symbolBase}_L · {asset.symbolBase}_S
            </p>
          </div>
        </div>
        <StatusBadge status={asset.status} />
      </div>

      <dl className="mt-3 divide-y divide-[var(--border)] border-t border-[var(--border)]">
        <Row label={`Long · ${asset.symbolBase}_L`}>
          {asset.longToken && (
            <AddressPill address={asset.longToken} href={polygonscanToken(asset.longToken)} />
          )}
        </Row>
        <Row label={`Short · ${asset.symbolBase}_S`}>
          {asset.shortToken && (
            <AddressPill address={asset.shortToken} href={polygonscanToken(asset.shortToken)} />
          )}
        </Row>
        <Row label="Vault">
          {asset.vault && (
            <AddressPill address={asset.vault} href={polygonscanAddress(asset.vault)} />
          )}
        </Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="text-sm text-[var(--muted)]">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function SeedingSoon() {
  return <span className="text-xs text-[var(--muted)]">Seeding soon</span>;
}

function SectionHead({ eyebrow, title, blurb }: { eyebrow: string; title: string; blurb?: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </h2>
      {blurb && <p className="mt-2 text-sm text-[var(--muted)]">{blurb}</p>}
    </div>
  );
}

export default function TransparencyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      {/* Header */}
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          On-chain
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Contracts &amp; deployments
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Every Vaulto contract is deployed on Polygon and verifiable on-chain.
          Below are the tokenized company vaults and their long / short token
          pairs, the Uniswap V3 pools, the core protocol contracts, and the
          collateral assets — each linked to Polygonscan.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-hover)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={NETWORK.logo} alt="" className="h-4 w-4" />
            {NETWORK.name} · {NETWORK.chainId}
          </span>
          <span className="text-xs text-[var(--muted)]">Last updated {updatedLabel}</span>
        </div>
      </header>

      {/* Tokenized assets */}
      <section className="mt-12">
        <SectionHead
          eyebrow="Tokenized assets"
          title="Company vaults & tokens"
          blurb="Each asset is a vault that mints a long and a short token tracking a private company's implied valuation."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {ASSETS.map((asset) => (
            <AssetCard key={asset.slug} asset={asset} />
          ))}
        </div>
      </section>

      {/* Liquidity — Uniswap V3 pools */}
      <section className="mt-14">
        <SectionHead
          eyebrow="Liquidity"
          title="Uniswap V3 pools"
          blurb={`${UNISWAP.config.dex} · ${UNISWAP.config.fee} fee · ${UNISWAP.config.pair} · ${UNISWAP.config.init} · ${UNISWAP.config.range} range.`}
        />
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--badge-bg)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                <th className="px-4 py-3 font-semibold">Asset</th>
                <th className="px-4 py-3 font-semibold">Leg</th>
                <th className="px-4 py-3 font-semibold">Pair</th>
                <th className="px-4 py-3 font-semibold">Fee</th>
                <th className="px-4 py-3 font-semibold">Pool</th>
              </tr>
            </thead>
            <tbody>
              {POOL_ROWS.map((p) => (
                <tr
                  key={`${p.slug}-${p.leg}`}
                  className="border-t border-[var(--border)] transition-colors hover:bg-[var(--card-hover)]"
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <CompanyLogo name={p.slug} size={22} />
                      <span className="font-medium text-[var(--foreground)]">{p.asset}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{p.leg}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{p.symbol} / USDC</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{UNISWAP.config.fee}</td>
                  <td className="px-4 py-3">
                    {p.pool ? (
                      <AddressPill address={p.pool} href={polygonscanAddress(p.pool)} />
                    ) : (
                      <SeedingSoon />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Uniswap infra
          </span>
          {UNISWAP.infra.map((c) => (
            <span key={c.address} className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
              {c.name}
              <AddressPill address={c.address} href={polygonscanAddress(c.address)} />
            </span>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="mt-14">
        <SectionHead
          eyebrow="Pipeline"
          title="Coming soon"
          blurb="Registered for rollout — contracts and pools deploy next."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COMING_SOON.map((c) => (
            <div
              key={c.slug}
              className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-3"
            >
              <CompanyLogo name={c.slug} size={32} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                <p className="truncate text-xs text-[var(--muted)]">{c.symbolBase} · {c.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protocol contracts */}
      <section className="mt-14">
        <SectionHead
          eyebrow="Protocol"
          title="Core contracts"
          blurb="Shared infrastructure backing every vault."
        />
        <ContractTable rows={PROTOCOL_CONTRACTS} />
      </section>

      {/* Collateral & integrations */}
      <section className="mt-14">
        <SectionHead
          eyebrow="Integrations"
          title="Collateral & external protocols"
        />
        <ContractTable rows={INTEGRATIONS} />
      </section>

      <p className="mt-12 text-xs text-[var(--muted)]">
        Addresses are on {NETWORK.name} mainnet (chain {NETWORK.chainId}). Staged
        assets are deployed but operate under pilot caps. Always verify on
        Polygonscan before interacting.
      </p>
    </main>
  );
}

function ContractTable({ rows }: { rows: { name: string; address: string; description: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--badge-bg)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <th className="px-4 py-3 font-semibold">Contract</th>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Address</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr
              key={c.address}
              className="border-t border-[var(--border)] transition-colors hover:bg-[var(--card-hover)]"
            >
              <td className="px-4 py-3 font-medium text-[var(--foreground)]">{c.name}</td>
              <td className="px-4 py-3 text-[var(--muted)]">{c.description}</td>
              <td className="px-4 py-3">
                <AddressPill address={c.address} href={polygonscanAddress(c.address)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
