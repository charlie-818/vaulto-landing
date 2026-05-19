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
