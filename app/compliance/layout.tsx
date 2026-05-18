import Link from "next/link";
import Image from "next/image";
import { getAllComplianceDocs } from "@/lib/compliance";
import { ComplianceSidebar } from "@/components/compliance/ComplianceSidebar";

export const metadata = {
  title: "Compliance — Vaulto",
  description:
    "SEC token regulation knowledge base. Project Crypto five-bucket framework, case law, compliance paths, and global frameworks.",
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllComplianceDocs();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/vaulto-logo-light.png"
              alt="Vaulto"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
            <span className="text-sm text-[var(--muted)]">/ Compliance</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10 lg:py-14">
        <ComplianceSidebar docs={docs.map((d) => ({ slug: d.slug, title: d.title, order: d.order }))} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-[var(--muted)]">
          Compliance reference only — not legal advice. Verify primary sources
          before relying. Engage qualified securities counsel.
        </div>
      </footer>
    </div>
  );
}
