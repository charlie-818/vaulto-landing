import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparisons } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Vaulto vs the alternatives — Compare private-market access",
  description:
    "See how Vaulto compares to Forge Global, EquityZen, and Hiive for getting exposure to private companies like SpaceX, OpenAI, and Anthropic before they IPO.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Vaulto vs the alternatives",
    description:
      "Compare Vaulto to Forge Global, EquityZen, and Hiive for pre-IPO exposure.",
    url: "https://vaulto.fi/compare",
    type: "website",
  },
};

export default function CompareIndexPage() {
  const comparisons = getAllComparisons();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          Compare
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Vaulto vs the alternatives
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Most ways to access private companies are built for accredited
          investors, with high minimums and long lockups. Vaulto gives you
          liquid, on-chain exposure to a company&apos;s implied IPO valuation —
          no accreditation, no minimum, exit anytime. See how it stacks up
          against the incumbents.
        </p>
      </header>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:border-blue-500/40 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-blue-500">
              Vaulto vs {c.competitor}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{c.tagline}</p>
            <span className="mt-3 inline-block text-sm font-medium text-blue-500">
              Compare →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
