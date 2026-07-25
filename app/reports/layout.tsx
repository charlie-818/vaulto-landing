export const metadata = {
  title: "Reports — Vaulto",
  description:
    "Data reports on private markets, built on Vaulto's implied-valuation dataset.",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">
        <main className="min-w-0">{children}</main>
      </div>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto max-w-3xl px-6 text-center text-sm text-[var(--muted)]">
          Estimates for informational purposes only — not investment advice.
          Verify primary sources before relying.
        </div>
      </footer>
    </div>
  );
}
