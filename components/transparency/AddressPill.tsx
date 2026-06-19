"use client";

import { useState } from "react";

const MONO = { fontFamily: "'Space Grotesk', ui-monospace, monospace" };

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

type Props = {
  address: string;
  href: string;
  className?: string;
};

export function AddressPill({ address, href, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — link still works */
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs ${className}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`${address} — view on Polygonscan`}
        style={MONO}
        className="tabular-nums text-[var(--foreground)] transition-colors hover:text-blue-600"
      >
        {truncate(address)}
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy address"}
        title={copied ? "Copied" : "Copy address"}
        className="grid h-4 w-4 place-items-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </button>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on Polygonscan"
        title="View on Polygonscan"
        className="grid h-4 w-4 place-items-center text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    </span>
  );
}
