import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllGuides,
  getGuide,
  getGuideSlugs,
  relatedGuides,
  SITE_URL,
} from "@/lib/guides";
import { MarkdownRenderer } from "@/components/compliance/MarkdownRenderer";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: `${guide.title} | Vaulto`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      publishedTime: guide.date,
      modifiedTime: guide.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const related = relatedGuides(guide.slug, getAllGuides());

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(related.length
      ? { relatedLink: related.map((g) => `${SITE_URL}/guides/${g.slug}`) }
      : {}),
    author: { "@type": "Organization", name: "Vaulto" },
    publisher: {
      "@type": "Organization",
      name: "Vaulto",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 2, name: guide.title, item: url },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/guides" className="hover:text-blue-500">
          Guides
        </Link>{" "}
        <span aria-hidden>/</span>{" "}
        <span className="text-[var(--foreground)]">{guide.title}</span>
      </nav>

      <MarkdownRenderer>{guide.body}</MarkdownRenderer>

      {related.length ? (
        <section
          aria-labelledby="related-guides"
          className="mt-12 border-t border-[var(--border)] pt-8"
        >
          <h2
            id="related-guides"
            className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Related guides
          </h2>
          <ul className="mt-4 grid gap-3">
            {related.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group block rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:border-blue-500/40 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-blue-500">
                      {g.title}
                    </h3>
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
        </section>
      ) : null}

      <footer className="mt-12 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
        <p>
          Educational content only — not investment advice. Pre-IPO investing is
          high risk and illiquid.
        </p>
        <Link
          href="/guides"
          className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700"
        >
          ← All guides
        </Link>
      </footer>
    </main>
  );
}
