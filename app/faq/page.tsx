import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQ_CATEGORIES, FAQ_UPDATED, buildFaqJsonLd } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Vaulto FAQ — Tokenized Pre-IPO Outcomes Explained",
  description:
    "Answers to common questions about Vaulto: trading pre-IPO outcomes as on-chain tokens, fees, how to mint and redeem, custody and safety, and the developer data API.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Vaulto FAQ",
    description:
      "How Vaulto works — trading pre-IPO outcomes as tokens, fees, safety, and the developer API.",
    url: "https://vaulto.fi/faq",
    type: "website",
  },
};

const updatedLabel = new Date(FAQ_UPDATED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function FaqPage() {
  const jsonLd = buildFaqJsonLd();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          Help
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Everything you need to know about trading pre-IPO outcomes on Vaulto —
          how positions work, fees and minimums, custody and safety, and the
          developer data API. For regulatory detail, see the{" "}
          <a
            href="/compliance"
            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            compliance docs
          </a>
          .
        </p>
        <p className="mt-4 text-xs text-[var(--muted)]">Last updated {updatedLabel}</p>

        <nav aria-label="FAQ categories" className="mt-6 flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--card-hover)]"
            >
              {category.heading}
            </a>
          ))}
        </nav>
      </header>

      <div className="mt-12">
        <FaqAccordion categories={FAQ_CATEGORIES} />
      </div>
    </main>
  );
}
