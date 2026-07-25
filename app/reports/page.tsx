import type { Metadata } from "next";
import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export const metadata: Metadata = {
  title: "Reports — Vaulto Private Markets Data",
  description:
    "Data reports on private markets, built on Vaulto's implied-valuation dataset. Valuations, liquidity, and price discovery for the world's most valuable pre-IPO companies.",
  openGraph: {
    title: "Reports — Vaulto Private Markets Data",
    description:
      "Data reports on private markets, built on Vaulto's implied-valuation dataset.",
    url: "https://vaulto.fi/reports",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reports — Vaulto Private Markets Data",
    description:
      "Data reports on private markets, built on Vaulto's implied-valuation dataset.",
  },
};

function formatDate(date?: string): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ReportsIndexPage() {
  const reports = getAllReports();

  return (
    <div>
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
          Private Markets Data
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Reports
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] max-w-2xl">
          Data journalism on the world&apos;s most valuable private companies,
          built on Vaulto&apos;s own implied-valuation dataset.
        </p>
      </header>

      <section className="grid gap-3">
        {reports.map((report) => {
          const date = formatDate(report.date);
          return (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:border-blue-500/40 hover:shadow-sm"
            >
              {date && (
                <p className="text-xs text-[var(--muted)]">{date}</p>
              )}
              <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)] group-hover:text-blue-500">
                {report.title}
              </h2>
              {report.description && (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {report.description}
                </p>
              )}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
