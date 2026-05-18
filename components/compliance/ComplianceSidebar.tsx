"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarDoc = {
  slug: string;
  title: string;
  order: number;
};

function sectionLabel(order: number): string | null {
  if (order === 0) return "Start here";
  if (order >= 1 && order <= 6) return "The five buckets";
  if (order >= 10 && order <= 11) return "Foundations & case law";
  if (order >= 12 && order <= 13) return "Compliance paths";
  if (order >= 14 && order <= 16) return "Legislation & jurisdictions";
  if (order === 17) return "Staff guidance";
  if (order === 20) return "Glossary";
  if (order >= 99) return "Sources";
  return null;
}

export function ComplianceSidebar({ docs }: { docs: SidebarDoc[] }) {
  const pathname = usePathname();
  const grouped: Array<{ label: string; items: SidebarDoc[] }> = [];
  for (const doc of docs) {
    const label = sectionLabel(doc.order);
    if (!label) continue;
    const last = grouped[grouped.length - 1];
    if (last && last.label === label) last.items.push(doc);
    else grouped.push({ label, items: [doc] });
  }

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-20">
        <Link
          href="/compliance"
          className={`mb-4 block text-sm font-semibold ${
            pathname === "/compliance"
              ? "text-[var(--foreground)]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          Overview
        </Link>
        <nav className="space-y-5">
          {grouped.map((section) => (
            <div key={section.label}>
              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-[var(--muted)]">
                {section.label}
              </p>
              <ul className="space-y-1.5">
                {section.items.map((doc) => {
                  const href = `/compliance/${doc.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={href}
                        className={`block text-sm leading-snug transition-colors ${
                          active
                            ? "font-medium text-[var(--foreground)]"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
