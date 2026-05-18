import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getComplianceDoc,
  getComplianceSlugs,
  getAllComplianceDocs,
} from "@/lib/compliance";
import { MarkdownRenderer } from "@/components/compliance/MarkdownRenderer";
import Link from "next/link";

export function generateStaticParams() {
  return getComplianceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComplianceDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Vaulto Compliance`,
    description: doc.description,
  };
}

export default async function ComplianceDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getComplianceDoc(slug);
  if (!doc) notFound();

  const all = getAllComplianceDocs().filter((d) => d.slug !== "99-sources");
  const idx = all.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div>
      <MarkdownRenderer>{doc.body}</MarkdownRenderer>

      <nav className="mt-12 grid gap-3 sm:grid-cols-2 border-t border-[var(--border)] pt-8">
        {prev ? (
          <Link
            href={`/compliance/${prev.slug}`}
            className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-colors hover:border-blue-500/40"
          >
            <p className="text-xs text-[var(--muted)]">← Previous</p>
            <p className="mt-1 text-sm font-medium text-[var(--foreground)] group-hover:text-blue-500">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/compliance/${next.slug}`}
            className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 text-right transition-colors hover:border-blue-500/40"
          >
            <p className="text-xs text-[var(--muted)]">Next →</p>
            <p className="mt-1 text-sm font-medium text-[var(--foreground)] group-hover:text-blue-500">
              {next.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
