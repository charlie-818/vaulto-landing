import type { Metadata } from "next";
import Link from "next/link";
import { IndexChart } from "@/components/vaulto-index/IndexChart";
import {
  getVaultoIndex,
  getVaultoIndexHistory,
  buildIndexJsonLd,
  formatChange,
  formatLevel,
  INDEX_METHODOLOGY,
  INDEX_NAME,
  INDEX_TICKER,
  INDEX_BASE_VALUE,
  INDEX_CONSTITUENT_COUNT,
  INDEX_REVALIDATE_SECONDS,
} from "@/lib/vaulto-index";

// Server-rendered, revalidated like the rest of the data-backed pages.
export const revalidate = 300;

const DESCRIPTION = `The ${INDEX_NAME} (${INDEX_TICKER}) — an equal-weight index of ${INDEX_CONSTITUENT_COUNT} tokenized private companies traded on Vaulto, published with a base value of ${INDEX_BASE_VALUE}.`;

export const metadata: Metadata = {
  title: `${INDEX_NAME} (${INDEX_TICKER}) — Vaulto`,
  description: DESCRIPTION,
  alternates: { canonical: "/index" },
  openGraph: {
    title: `${INDEX_NAME} (${INDEX_TICKER})`,
    description: DESCRIPTION,
    url: "https://vaulto.fi/index",
    type: "website",
    images: ["/socialbanner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${INDEX_NAME} (${INDEX_TICKER})`,
    description: DESCRIPTION,
    images: ["/socialbanner.png"],
  },
};

function ChangePill({ label, value }: { label: string; value: number }) {
  const positive = value >= 0;
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <span
        className={`text-lg font-semibold ${
          positive ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {formatChange(value)}
      </span>
    </div>
  );
}

export default async function VaultoIndexPage() {
  const [snapshot, history] = await Promise.all([
    getVaultoIndex(),
    getVaultoIndexHistory(),
  ]);

  const jsonLd = buildIndexJsonLd(snapshot);
  const positiveTrend = (snapshot?.change24h ?? 0) >= 0;
  const asOfLabel = snapshot
    ? new Date(snapshot.asOf).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }) + " UTC"
    : null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          Market index
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          {INDEX_NAME}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {DESCRIPTION}
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 lg:p-8">
        {snapshot ? (
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
                Level
              </span>
              <span className="text-4xl font-semibold text-[var(--foreground)]">
                {formatLevel(snapshot.level)}
              </span>
            </div>
            <ChangePill label="24h" value={snapshot.change24h} />
            <ChangePill label="7d" value={snapshot.change7d} />
          </div>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Live index level is not available right now. Please check back
            shortly.
          </p>
        )}

        <div className="mt-6">
          <IndexChart history={history} positive={positiveTrend} />
        </div>

        {asOfLabel && (
          <p className="mt-3 text-xs text-[var(--muted)]">
            As of {asOfLabel}
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Constituents
        </h2>
        {snapshot && snapshot.constituents.length > 0 ? (
          <ul className="mt-6 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]">
            {snapshot.constituents.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--card-hover)]"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {c.name}
                  </span>
                  <span className="flex items-center gap-4 text-sm">
                    {typeof c.change24h === "number" && (
                      <span
                        className={
                          c.change24h >= 0 ? "text-emerald-600" : "text-red-600"
                        }
                      >
                        {formatChange(c.change24h)}
                      </span>
                    )}
                    <span className="text-[var(--muted)]">
                      {typeof c.weight === "number"
                        ? `${(c.weight * 100).toFixed(1)}%`
                        : `${(100 / INDEX_CONSTITUENT_COUNT).toFixed(1)}%`}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">
            The constituent list will appear here once the index API is live.
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Methodology
        </h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          {INDEX_METHODOLOGY.map((m) => (
            <div
              key={m.heading}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
            >
              <dt className="text-sm font-semibold text-[var(--foreground)]">
                {m.heading}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {m.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-12 text-xs text-[var(--muted)]">
        The {INDEX_NAME} is provided for informational purposes only and is not
        investment advice. Index data refreshes approximately every{" "}
        {Math.round(INDEX_REVALIDATE_SECONDS / 60)} minutes.
      </p>
    </main>
  );
}
