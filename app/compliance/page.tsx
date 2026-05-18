import Link from "next/link";
import { getAllComplianceDocs } from "@/lib/compliance";

export const metadata = {
  title: "Compliance — Vaulto SEC Token Knowledge Base",
  description:
    "Builder-focused reference on SEC token regulation. Project Crypto five-bucket framework, foundational case law, compliance paths, and jurisdictional contrast.",
};

export default function ComplianceIndexPage() {
  const docs = getAllComplianceDocs().filter((d) => d.slug !== "99-sources");

  return (
    <div>
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
          SEC Token Regulation
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          A builder&apos;s reference for tokenized assets
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] max-w-2xl">
          Organized around the SEC&apos;s &quot;Project Crypto&quot; five-bucket
          classification framework. Verify every primary source before relying.
          Not legal advice.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          The five buckets at a glance
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <BucketCard title="Digital Commodities" slug="02-bucket-digital-commodities" body="Value from a functional + decentralized network. Not a security." />
          <BucketCard title="Digital Collectibles" slug="03-bucket-digital-collectibles" body="Cultural / use-value tokens. Not a security." />
          <BucketCard title="Digital Tools" slug="04-bucket-digital-tools" body="Membership, ticket, credential, identity. Not a security." />
          <BucketCard title="Digital Securities" slug="05-bucket-tokenized-securities" body="On-chain financial instruments. Is a security." />
          <BucketCard title="Stablecoins" slug="06-bucket-stablecoins" body="USD-pegged, fully reserved, no yield. Not a security." />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
          All documents
        </h2>
        <ul className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-[var(--card-bg)]">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/compliance/${doc.slug}`}
                className="group flex items-center justify-between px-4 py-3 transition-colors hover:bg-[var(--card-hover)]"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-blue-500">
                    {doc.title}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{doc.slug}</p>
                </div>
                <span className="text-[var(--muted)] group-hover:text-blue-500">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function BucketCard({ title, slug, body }: { title: string; slug: string; body: string }) {
  return (
    <Link
      href={`/compliance/${slug}`}
      className="group rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4 transition-all hover:border-blue-500/40 hover:shadow-sm"
    >
      <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-blue-500">
        {title}
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{body}</p>
    </Link>
  );
}
