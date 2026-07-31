import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides, SITE_URL } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Pre-IPO Investing Guides — How to Buy Private Company Stock | Vaulto",
  description:
    "Evergreen guides on how to buy pre-IPO stock in the world's most valuable private companies — SpaceX, OpenAI, Anthropic, and more — before they go public.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Pre-IPO Investing Guides — Vaulto",
    description:
      "How to buy pre-IPO stock in SpaceX, OpenAI, Anthropic, and other private companies before they go public.",
    url: `${SITE_URL}/guides`,
    type: "website",
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/guides/${g.slug}`,
      name: g.title,
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          Guides
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Pre-IPO investing guides
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Plain-English guides to gaining exposure to the world&apos;s most
          valuable private companies before they go public — who can invest, the
          routes available today, and how tokenized pre-IPO access works.
        </p>
      </header>

      <ul className="mt-10 grid gap-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="group block rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:border-blue-500/40 hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-blue-500">
                  {g.title}
                </h2>
                {g.sector ? (
                  <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {g.sector}
                  </span>
                ) : null}
              </div>
              {g.description ? (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {g.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-[var(--muted)]">
        Educational content only — not investment advice. Pre-IPO investing is
        high risk and illiquid. See the{" "}
        <a
          href="/compliance"
          className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          compliance reference
        </a>
        .
      </p>
    </main>
  );
}
