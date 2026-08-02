import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Vaulto",
  description:
    "The page you were looking for doesn't exist. Head back to Vaulto to trade pre-IPO tokens, read the FAQ, or browse our investing guides.",
};

const links = [
  { href: "/", label: "Home", description: "Trade tokenized pre-IPO stock" },
  { href: "/faq", label: "FAQ", description: "How Vaulto works" },
  { href: "/guides", label: "Guides", description: "Pre-IPO investing guides" },
];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
          404
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Try one of these instead.
        </p>
      </header>

      <ul className="mt-10 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:border-blue-500/40 hover:shadow-sm"
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-blue-500">
                {link.label}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {link.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
