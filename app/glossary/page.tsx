import type { Metadata } from "next";
import {
  GLOSSARY_TERMS,
  GLOSSARY_UPDATED,
  buildGlossaryJsonLd,
} from "@/lib/glossary-data";

export const metadata: Metadata = {
  title: "Private Markets & Pre-IPO Glossary — Vaulto",
  description:
    "Plain-language definitions of private-markets and pre-IPO terms — tender offer, secondary market, 409A valuation, SPV, lockup, cap table, liquidation preference, and more.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Private Markets & Pre-IPO Glossary",
    description:
      "Definitions of the private-markets and pre-IPO terms investors run into — tender offers, secondary sales, 409A valuations, SPVs, and lockups.",
    url: "https://vaulto.fi/glossary",
    type: "website",
  },
};

const updatedLabel = new Date(GLOSSARY_UPDATED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function GlossaryPage() {
  const jsonLd = buildGlossaryJsonLd();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          Reference
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Private markets &amp; pre-IPO glossary
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Plain-language definitions of the terms you run into when investing in
          private companies before they go public — from tender offers and
          secondary sales to 409A valuations, SPVs, and lockups. New to Vaulto?
          Start with the{" "}
          <a
            href="/faq"
            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            FAQ
          </a>
          .
        </p>
        <p className="mt-4 text-xs text-[var(--muted)]">Last updated {updatedLabel}</p>

        <nav aria-label="Glossary terms" className="mt-6 flex flex-wrap gap-2">
          {GLOSSARY_TERMS.map((term) => (
            <a
              key={term.id}
              href={`#${term.id}`}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--card-hover)]"
            >
              {term.term}
            </a>
          ))}
        </nav>
      </header>

      <dl className="mt-12 space-y-10">
        {GLOSSARY_TERMS.map((term) => (
          <div key={term.id} id={term.id} className="scroll-mt-24">
            <dt className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
              <a href={`#${term.id}`} className="hover:underline">
                {term.term}
              </a>
            </dt>
            <dd className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              {term.definition}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
