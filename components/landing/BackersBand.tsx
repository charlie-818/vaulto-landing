import { ReactNode } from "react";

/**
 * Pre-CTA social-proof band on a charcoal section. Logos sit on light tiles so
 * light-designed marks (incl. dark-text ones like Every/PitchBook) stay legible
 * on the dark background. Real assets only — no fabricated proof.
 */
export function BackersBand() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        Trusted foundations
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
        <Cluster label="Backed by">
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/ucla-blue.png" alt="UCLA Venture" className="h-8 w-auto" />
          </LogoTile>
        </Cluster>

        <Cluster label="Featured in">
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/every.svg" alt="Every" className="h-4 w-auto" />
          </LogoTile>
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/pitchbook.png" alt="PitchBook" className="h-4 w-auto" />
          </LogoTile>
        </Cluster>

        <Cluster label="Built on">
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/polygon.svg" alt="Polygon" className="h-6 w-auto" />
          </LogoTile>
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/bnb-chain.svg" alt="BNB Chain" className="h-6 w-auto" />
          </LogoTile>
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/base.svg" alt="Base" className="h-6 w-auto" />
          </LogoTile>
          <LogoTile>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/partners/privy.png" alt="Privy" className="h-5 w-auto" />
          </LogoTile>
        </Cluster>
      </div>

      <p className="mt-10 text-center text-sm text-[var(--muted)]">
        Backed by UCLA Venture. Built on Polygon, BNB Chain, Base and Wormhole — the chains
        and infrastructure you already trust.
      </p>
    </div>
  );
}

function Cluster({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
    </div>
  );
}

function LogoTile({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-4 shadow-sm">
      {children}
    </span>
  );
}
