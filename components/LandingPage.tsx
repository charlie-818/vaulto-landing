"use client";

import { useEffect } from "react";
import { HeroSection } from "./landing/HeroSection";
import { FeatureSection } from "./landing/FeatureSection";
import { Section } from "./landing/Section";
import { StatBand } from "./landing/StatBand";
import { CompaniesShowcase } from "./landing/CompaniesShowcase";
import { WhyVaulto } from "./landing/WhyVaulto";
import { BasketBuilder, ExposureFlow } from "./landing/FeatureVisuals";
import { LandingFooter } from "./landing/LandingFooter";
import { PLATFORM_URL } from "@/lib/config";
import { WHITEPAPERS } from "@/lib/external-urls";
import type { Valuation } from "@/lib/showcase-companies";

// Two-tone serif headline helper: muted-gray lead + blue→cyan gradient tail,
// mirroring the hero and Wispr's "Don't type, just speak" split.
function TwoTone({ lead, accent }: { lead: string; accent: string }) {
  return (
    <>
      <span className="text-[var(--display-muted)]">{lead} </span>
      <span className="text-gradient-accent">{accent}</span>
    </>
  );
}

export function LandingPage({
  valuations = {},
}: {
  valuations?: Record<string, Valuation>;
}) {
  // Force light mode on landing
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="landing-page-light min-h-screen bg-[var(--background)]" style={{ zoom: 0.9 }}>
      <HeroSection />

      {/* Fast credibility — real numbers only (desktop only) */}
      <Section tone="cream" className="hidden sm:block">
        <StatBand />
      </Section>

      {/* Highest-weight content: the tradable catalog */}
      <Section tone="dark">
        <CompaniesShowcase valuations={valuations} />
      </Section>

      {/* Trust anchor: why the price is legit */}
      <FeatureSection
        id="how-it-works"
        headline={<TwoTone lead="Every price is" accent="set by the market, not by us" />}
        subheadline="Real Nasdaq Private Market data resolves the odds. Polymarket prices them live. Vaulto turns those odds into a position you can trade."
        theme="blue"
        features={[
          {
            title: "1 · Nasdaq data",
            description: "Real private-market data settles each company's valuation tiers.",
            highlight: true,
          },
          {
            title: "2 · Polymarket odds",
            description: "Traders price each tier live on a public, on-chain prediction market.",
            highlight: true,
          },
        ]}
        visual={<ExposureFlow />}
        link={{ text: "Read the whitepaper", href: WHITEPAPERS.predictionMarket }}
        actionButton={{ text: "Launch Platform", href: `${PLATFORM_URL}/sign-in` }}
      />

      {/* Objection handling + de-emphasized access pitch */}
      <Section tone="dark">
        <WhyVaulto />
      </Section>

      {/* Depth for the crypto-native / builders — Social ETFs */}
      <FeatureSection
        id="social-etfs"
        headline={<TwoTone lead="Build a basket." accent="Share it. Friends trade it." />}
        subheadline="Bundle public stocks and pre-IPO names into one strategy — then share a link and let anyone trade it."
        theme="cyan"
        features={[
          {
            title: "Mix public & pre-IPO",
            description: "Blend NVDA, Palantir and Tesla with SpaceX, Anthropic and more in one basket.",
            highlight: true,
          },
          {
            title: "Friends trade it",
            description: "Share a link — anyone can deposit USDC and own a slice of your strategy.",
            highlight: true,
          },
        ]}
        visual={<BasketBuilder />}
        link={{ text: "View on GitHub", href: "https://github.com/VaultoAI/VAULTO-API-ETF" }}
      />

      <LandingFooter />
    </div>
  );
}
