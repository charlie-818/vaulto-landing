"use client";

import { useState, useCallback, useEffect } from "react";
import { HeroSection } from "./landing/HeroSection";
import { FeatureSection } from "./landing/FeatureSection";
import { TokenTicker, BasketBuilder, CodeBlock, ChainDiagram } from "./landing/FeatureVisuals";
import { LandingFooter } from "./landing/LandingFooter";
import { signupEmail } from "@/lib/waitlist-client";
import { GoogleSignInButton } from "./GoogleSignInButton";

const EMBEDDED_BROWSER_PATTERNS =
  /WebView|wv\)|Instagram|FBAN|FBAV|Line\/|Twitter|Slack|Discord|Electron|InApp/i;

function isEmbeddedBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const inIframe = typeof window !== "undefined" && window.self !== window.top;
  return inIframe || EMBEDDED_BROWSER_PATTERNS.test(ua);
}

export function LandingPage() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setTimeout(() => {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 300);
  }, []);

  // Force light mode on landing
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    setIsEmbedded(isEmbeddedBrowser());
  }, []);

  const handleJoinWaitlist = () => {
    setShowWaitlistModal(true);
    setError(null);
  };

  const closeWaitlistModal = () => {
    setShowWaitlistModal(false);
    setEmail("");
    setFirstName("");
    setError(null);
  };

  const handleEmailSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const trimmedEmail = email.trim();
      const trimmedFirstName = firstName.trim();
      if (!trimmedEmail || !trimmedFirstName) {
        setError("Please enter your email and first name.");
        return;
      }
      setSubmitting(true);
      const result = await signupEmail(trimmedEmail, trimmedFirstName);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.message || "Something went wrong. Please try again.");
        return;
      }
      const nameParam = encodeURIComponent(trimmedFirstName);
      const createdAtParam = result.createdAt
        ? `&createdAt=${encodeURIComponent(result.createdAt)}`
        : "";
      window.location.href = `/waitlist-success?from=email&name=${nameParam}${createdAtParam}`;
    },
    [email, firstName]
  );

  return (
    <div className="landing-page-light min-h-screen bg-[var(--background)]" style={{ zoom: 0.9 }}>
      <HeroSection onJoinWaitlist={handleJoinWaitlist} />

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
        actionButton={{ text: "Join Waitlist", onClick: handleJoinWaitlist }}
      />

      <FeatureSection
        id="amm"
        badge="Price Oracle AMM"
        headline="Institutional-Grade Liquidity"
        subheadline="Deep liquidity. Minimal slippage."
        theme="blue"
        reversed
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
        actionButton={{ text: "Join Waitlist", onClick: handleJoinWaitlist }}
      />

      <FeatureSection
        id="bridge"
        badge="Cross-Chain Bridge"
        headline="One Token, Multiple Chains"
        subheadline="Seamless cross-chain transfers."
        theme="cyan"
        reversed
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
            Join the waitlist to be among the first
            <br />
            to trade pre-IPO tokens.
          </p>
          <button
            onClick={handleJoinWaitlist}
            className="group relative rounded-lg bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Join Waitlist
            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
          </button>
        </div>
      </section>

      <LandingFooter />

      {showWaitlistModal && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-4 pt-8 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full sm:max-w-md rounded-2xl sm:rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-6 max-h-[calc(100dvh-4rem)] overflow-y-auto shadow-2xl">
            <button
              onClick={closeWaitlistModal}
              className="absolute right-4 top-4 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">Join the Waitlist</h3>
            <p className="mb-6 text-sm text-[var(--muted)]">
              Get early access to trade synthetic pre-IPO tokens.
            </p>
            {!isEmbedded && (
              <div className="mb-4 flex flex-col gap-3">
                <GoogleSignInButton />
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[var(--border)]" />
                  <span className="text-xs uppercase tracking-wide text-[var(--muted)]">or</span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>
              </div>
            )}
            <form onSubmit={handleEmailSignup} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={handleInputFocus}
                required
                autoComplete="given-name"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 sm:py-2.5 text-base sm:text-sm min-h-[48px] text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--foreground)]/30 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleInputFocus}
                required
                autoComplete="email"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 sm:py-2.5 text-base sm:text-sm min-h-[48px] text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--foreground)]/30 focus:outline-none"
              />
              {error && (
                <p className="text-left text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="group relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 px-5 py-3 sm:py-2.5 min-h-[48px] text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60"
              >
                {submitting ? "Signing up..." : "Sign up with email"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
