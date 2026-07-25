import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getReport, getReportSlugs } from "@/lib/reports";
import { MarkdownRenderer } from "@/components/compliance/MarkdownRenderer";

const BASE_URL = "https://vaulto.fi";

export function generateStaticParams() {
  return getReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return {};
  const url = `${BASE_URL}/reports/${report.slug}`;
  const images = report.image ? [report.image] : undefined;
  return {
    title: `${report.title} — Vaulto`,
    description: report.description,
    openGraph: {
      title: report.title,
      description: report.description,
      url,
      type: "article",
      ...(report.date ? { publishedTime: report.date } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: report.title,
      description: report.description,
      ...(images ? { images } : {}),
    },
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  const url = `${BASE_URL}/reports/${report.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: report.title,
    ...(report.description ? { description: report.description } : {}),
    ...(report.date ? { datePublished: report.date } : {}),
    ...(report.image ? { image: `${BASE_URL}${report.image}` } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Vaulto" },
    publisher: { "@type": "Organization", name: "Vaulto" },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarkdownRenderer>{report.body}</MarkdownRenderer>

      <nav className="mt-12 border-t border-[var(--border)] pt-8">
        <Link
          href="/reports"
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          ← All reports
        </Link>
      </nav>
    </div>
  );
}
