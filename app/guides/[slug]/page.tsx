import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { buildArticleLd, getGuide, getGuideSlugs, SITE_URL } from "@/lib/guides";
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

  const articleLd = buildArticleLd(guide, url);

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
