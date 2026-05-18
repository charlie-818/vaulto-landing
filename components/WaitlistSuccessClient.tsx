"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchLeaderboard, type LeaderboardEntry } from "@/lib/waitlist-client";

export function WaitlistSuccessClient() {
  const search = useSearchParams();
  const name = search.get("name") || "there";
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    fetchLeaderboard()
      .then(setLeaderboard)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Image
          src="/vaulto-logo-light.png"
          alt="Vaulto"
          width={140}
          height={40}
          className="mx-auto mb-8 h-10 w-auto"
        />
        <h1 className="mb-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          You&apos;re on the list, {decodeURIComponent(name)}.
        </h1>
        <p className="mb-10 text-base sm:text-lg text-[var(--muted)]">
          We&apos;ll be in touch as soon as we open access. In the meantime, share
          your referral link to climb the leaderboard.
        </p>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-left">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
            Top of the waitlist
          </h2>
          {loading ? (
            <p className="text-sm text-[var(--muted)]">Loading…</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Leaderboard temporarily unavailable.
            </p>
          ) : (
            <ol className="space-y-2">
              {leaderboard.slice(0, 10).map((entry) => (
                <li
                  key={entry.rank}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    #{entry.rank} {entry.firstName}
                  </span>
                  <span className="font-mono text-[var(--muted)]">
                    {entry.bonusPoints} pts
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
