"use client";

import { useEffect } from "react";
import { HeroSection } from "./landing/HeroSection";
import { FeatureSection } from "./landing/FeatureSection";
import { TokenTicker, BasketBuilder, CodeBlock, ChainDiagram, ExposureFlow } from "./landing/FeatureVisuals";
import { LandingFooter } from "./landing/LandingFooter";
import { PLATFORM_URL } from "@/lib/config";

export function LandingPage() {
  // Force light mode on landing
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="landing-page-light min-h-screen bg-[var(--background)]" style={{ zoom: 0.9 }}>
      <HeroSection />

      <FeatureSection
        id="features"
        badge="Synthetic Tokens"
        headline="Trade Tomorrow's Giants Today"
        subheadline="Trade unicorns before they go public."
        theme="blue"
        features={[
          {
            title: "Prediction Market Pricing",
            description:
              "Prices derived from real-time Polymarket odds for transparent valuations",
            highlight: true,
          },
          {
            title: "Trade From $10",
            description:
              "Own fractional shares of SpaceX, Anthropic, and other unicorns",
            highlight: true,
          },
          { title: "24/7 trading" },
          { title: "No accreditation required" },
        ]}
        visual={<TokenTicker />}
        actionButton={{ text: "Launch Platform", href: `${PLATFORM_URL}/sign-in` }}
      />

      <FeatureSection
        id="how-it-works"
        badge="Price Discovery"
        headline="From Private Markets to On-Chain Exposure"
        subheadline="Real Nasdaq data resolves Polymarket odds. Vaulto turns those odds into a live, tradable token."
        theme="blue"
        reversed
        features={[
          {
            title: "Nasdaq-Resolved",
            description: "Nasdaq Private Market data settles every market.",
            highlight: true,
          },
          {
            title: "Prediction-Market Odds",
            description: "Polymarket prices each company's odds of hitting a valuation.",
            highlight: true,
          },
          { title: "Implied valuation from the probability curve" },
          { title: "Tokenized as a tradable ERC-20" },
        ]}
        visual={<ExposureFlow />}
        actionButton={{
          text: "Read Whitepaper",
          onClick: () =>
            window.open("https://app.vaulto.fi/whitepaper.pdf", "_blank", "noopener,noreferrer"),
        }}
      />

      <FeatureSection
        id="amm"
        badge="Price Oracle AMM"
        headline="Institutional-Grade Liquidity"
        subheadline="Deep liquidity. Minimal slippage."
        theme="blue"
        features={[
          {
            title: "Concentrated Liquidity",
            description:
              "Uniswap V3-style efficiency for tighter spreads and less slippage",
            highlight: true,
          },
          {
            title: "MEV Protection",
            description: "Safeguards against sandwich attacks and front-running",
            highlight: true,
          },
          { title: "On-chain transparency" },
          { title: "Audited contracts" },
        ]}
        visual={<CodeBlock />}
        link={{ text: "View on GitHub", href: "https://github.com/VaultoAI/price-oracle-amm" }}
      />

      <FeatureSection
        id="social-etfs"
        badge="Social ETFs"
        headline="Build & Share Your Own ETF"
        subheadline="Pick the tokens. Set the weights. Friends trade your basket."
        theme="cyan"
        reversed
        features={[
          {
            title: "Mix Public & Private",
            description:
              "Blend tokenized public stocks (NVDA, Palantir, Tesla) with pre-IPO unicorns (SpaceX, Anthropic) in one basket",
            highlight: true,
          },
          {
            title: "Friends Trade Your Basket",
            description:
              "Share a link. Anyone can deposit USDC and own a slice of your strategy",
            highlight: true,
          },
          { title: "Auto-rebalanced on Base via CoW" },
          { title: "USDC zap deposit & redeem" },
        ]}
        visual={<BasketBuilder />}
        link={{ text: "View on GitHub", href: "https://github.com/VaultoAI/VAULTO-API-ETF" }}
        actionButton={{ text: "Launch Platform", href: `${PLATFORM_URL}/sign-in` }}
      />

      <FeatureSection
        id="bridge"
        badge="Cross-Chain Bridge"
        headline="One Token, Multiple Chains"
        subheadline="Seamless cross-chain transfers."
        theme="cyan"
        features={[
          {
            title: "BNB + Polygon",
            description:
              "Move your tokens seamlessly between chains in seconds with our Wormhole NTT integration",
            highlight: true,
          },
          {
            title: "Enterprise Security",
            description:
              "Built on Wormhole infrastructure with rate limiting and secure lock/mint mechanics",
            highlight: true,
          },
          { title: "7 tokens supported" },
        ]}
        visual={<ChainDiagram />}
        link={{
          text: "Wormhole NTT Docs",
          href: "https://wormhole.com/docs/products/token-transfers/native-token-transfers/overview/",
        }}
      />

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-gradient-shift absolute -inset-[100%] opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-cyan-500/20 blur-3xl" />
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-[var(--muted)]">
            Sign in to start trading
            <br />
            pre-IPO tokens.
          </p>
          <a
            href={`${PLATFORM_URL}/sign-in`}
            className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Launch Platform
            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          </a>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
