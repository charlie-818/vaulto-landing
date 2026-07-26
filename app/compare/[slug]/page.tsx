import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getComparison,
  getCompareSlugs,
  buildCompareJsonLd,
  PLATFORM_URL,
} from "@/lib/compare";
import { MarkdownRenderer } from "@/components/compliance/MarkdownRenderer";

export function generateStaticParams() {
  return getCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title} — Private-market access compared`,
    description: comparison.description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `https://vaulto.fi/compare/${slug}`,
      type: "article",
    },
  };
}

const updatedLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const jsonLd = buildCompareJsonLd(comparison);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/compare" className="hover:text-blue-500">
          Compare
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--foreground)]">
          Vaulto vs {comparison.competitor}
        </span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
          Comparison
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          {comparison.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {comparison.intro}
        </p>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Last updated {updatedLabel(comparison.updated)}
        </p>
      </header>

      <section className="mt-10" aria-labelledby="comparison-table">
        <h2
          id="comparison-table"
          className="text-xl font-semibold text-[var(--foreground)]"
        >
          Vaulto vs {comparison.competitor} at a glance
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--card-bg)]">
                <th className="px-4 py-3 text-left font-semibold text-[var(--muted)]">
                  Feature
                </th>
                <th className="px-4 py-3 text-left font-semibold text-blue-500">
                  Vaulto
                </th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">
                  {comparison.competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-t border-[var(--border)] align-top"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-left font-medium text-[var(--foreground)]"
                  >
                    {row.feature}
                  </th>
                  <td className="px-4 py-3 text-[var(--foreground)]">
                    {row.vaulto}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <MarkdownRenderer>{comparison.body}</MarkdownRenderer>
      </section>

      <section className="mt-12 rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 text-center">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Start on Vaulto
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--muted)]">
          Trade liquid exposure to private-company valuations — no accreditation,
          no minimum, exit anytime. Vaulto is high-risk; only commit what you can
          afford to lose.
        </p>
        <a
          href={PLATFORM_URL}
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Launch Vaulto →
        </a>
      </section>

      <section className="mt-12" aria-labelledby="compare-faq">
        <h2
          id="compare-faq"
          className="text-xl font-semibold text-[var(--foreground)]"
        >
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-[var(--border)]">
          {comparison.faqs.map((faq, i) => (
            <div key={i} id={`faq-${i}`} className="py-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
