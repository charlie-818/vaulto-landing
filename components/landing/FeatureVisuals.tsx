"use client";

import { useEffect, useState } from "react";
import { CompanyLogo } from "@/components/CompanyLogo";

// =============================================================================
// TOKEN TICKER - Shows animated token prices with actual company logos
// =============================================================================

const mockTokens = [
  { symbol: "vSPACEX", companyName: "SpaceX", price: 142.5, change: 3.2 },
  { symbol: "vANTHROPIC", companyName: "Anthropic", price: 89.75, change: 5.8 },
  { symbol: "vOPENAI", companyName: "OpenAI", price: 215.0, change: -2.8 },
  { symbol: "vANDURIL", companyName: "Anduril", price: 67.25, change: 2.1 },
  { symbol: "vPOLYMARKET", companyName: "Polymarket", price: 48.9, change: 8.5 },
  { symbol: "vKALSHI", companyName: "Kalshi", price: 23.4, change: 1.2 },
];

export function TokenTicker() {
  const [prices, setPrices] = useState(mockTokens);
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * prices.length);
      setPulseIndex(randomIndex);

      setPrices((prev) =>
        prev.map((token, i) => {
          if (i === randomIndex) {
            const changeAmount = (Math.random() - 0.5) * 2;
            return {
              ...token,
              price: Math.max(1, token.price + changeAmount),
              change: token.change + (Math.random() - 0.5) * 0.5,
            };
          }
          return token;
        })
      );

      setTimeout(() => setPulseIndex(null), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [prices.length]);

  return (
    <div className="rounded-xl bg-gradient-to-br from-[var(--foreground)]/[0.02] to-transparent">
      <div className="mb-2 flex items-center justify-between text-xs text-[var(--muted)] px-3 sm:px-4 pt-3 sm:pt-4">
        <span>Token</span>
        <div className="flex gap-4 sm:gap-6 md:gap-8">
          <span>Price</span>
          <span className="w-12 sm:w-16 text-right">24h</span>
        </div>
      </div>
      {prices.map((token, index) => (
        <div
          key={token.symbol}
          className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-300 ${
            index !== prices.length - 1 ? "border-b border-[var(--border)]/50" : "pb-4"
          } ${pulseIndex === index ? "bg-blue-500/5" : ""}`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <CompanyLogo name={token.companyName} size={24} className="sm:w-8 sm:h-8 flex-shrink-0" />
            <span className="font-medium text-[var(--foreground)] truncate text-sm sm:text-base">
              {token.symbol}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <span
              className={`font-mono font-semibold text-[var(--foreground)] transition-all text-sm sm:text-base ${
                pulseIndex === index ? "scale-105" : ""
              }`}
            >
              ${token.price.toFixed(2)}
            </span>
            <span
              className={`w-12 sm:w-16 text-right font-mono font-medium text-xs sm:text-sm ${
                token.change >= 0 ? "text-emerald-500" : "text-[#ef4444]"
              }`}
            >
              {token.change >= 0 ? "+" : ""}
              {token.change.toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// BASKET BUILDER - User-built ETF basket with weight bars
// =============================================================================

type BasketSlice = {
  symbol: string;
  companyName: string;
  weight: number;
  kind: "public" | "private";
  color: string;
};

const basketSlices: BasketSlice[] = [
  { symbol: "vNVDA", companyName: "Nvidia", weight: 22, kind: "public", color: "#76b900" },
  { symbol: "vSPACEX", companyName: "SpaceX", weight: 20, kind: "private", color: "#06b6d4" },
  { symbol: "vPLTR", companyName: "Palantir", weight: 15, kind: "public", color: "#0ea5e9" },
  { symbol: "vANTHROPIC", companyName: "Anthropic", weight: 13, kind: "private", color: "#d97706" },
  { symbol: "vTSLA", companyName: "Tesla", weight: 12, kind: "public", color: "#ef4444" },
  { symbol: "vOPENAI", companyName: "OpenAI", weight: 10, kind: "private", color: "#10b981" },
  { symbol: "vANDURIL", companyName: "Anduril", weight: 8, kind: "private", color: "#8b5cf6" },
];

export function BasketBuilder() {
  const [weights, setWeights] = useState(basketSlices.map((t) => t.weight));
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * weights.length);
      const otherIdx = (idx + 1 + Math.floor(Math.random() * (weights.length - 1))) % weights.length;
      const delta = Math.random() > 0.5 ? 1 : -1;

      setWeights((prev) => {
        const next = [...prev];
        const a = next[idx] + delta;
        const b = next[otherIdx] - delta;
        if (a < 4 || a > 35 || b < 4 || b > 35) return prev;
        next[idx] = a;
        next[otherIdx] = b;
        return next;
      });
      setPulseIndex(idx);
      setTimeout(() => setPulseIndex(null), 600);
    }, 2500);

    return () => clearInterval(interval);
  }, [weights.length]);

  const total = weights.reduce((s, w) => s + w, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  // Build donut arcs
  let cumulative = 0;
  const arcs = basketSlices.map((slice, i) => {
    const portion = weights[i] / total;
    const dashLength = portion * circumference;
    const offset = -cumulative * circumference;
    cumulative += portion;
    return {
      slice,
      i,
      dashArray: `${dashLength} ${circumference - dashLength}`,
      dashOffset: offset,
    };
  });

  return (
    <div className="rounded-2xl border border-[var(--border)]/60 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-blue-500/[0.04] p-4 sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--muted)]">@charlie's basket</span>
          <span className="text-base sm:text-lg font-semibold text-[var(--foreground)]">AI Mega Basket</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-cyan-600">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </span>
      </div>

      {/* Donut + legend */}
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--border)" strokeWidth="14" opacity="0.3" />
            {arcs.map(({ slice, i, dashArray, dashOffset }) => (
              <circle
                key={slice.symbol}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={pulseIndex === i ? 16 : 14}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dasharray 700ms ease-out, stroke-width 300ms" }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--foreground)]">{total}%</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted)]">Allocated</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-1.5 sm:gap-2 min-w-0">
          {basketSlices.slice(0, 5).map((slice, i) => (
            <div
              key={slice.symbol}
              className={`flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors ${
                pulseIndex === i ? "bg-cyan-500/10" : ""
              }`}
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
              <CompanyLogo name={slice.companyName} size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate text-xs sm:text-sm font-medium text-[var(--foreground)]">{slice.symbol}</span>
              <span className="ml-auto font-mono text-xs sm:text-sm font-semibold tabular-nums text-[var(--foreground)]">
                {weights[i]}%
              </span>
            </div>
          ))}
          <div className="px-1.5 text-[10px] sm:text-xs text-[var(--muted)]">
            +{basketSlices.length - 5} more
          </div>
        </div>
      </div>

      {/* Public/Private split footer */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
        <div className="rounded-lg border border-[var(--border)]/60 bg-[var(--foreground)]/[0.02] px-3 py-2">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted)]">Public</div>
          <div className="font-mono text-sm sm:text-base font-semibold text-[var(--foreground)]">
            {basketSlices.reduce((s, sl, i) => s + (sl.kind === "public" ? weights[i] : 0), 0)}%
          </div>
        </div>
        <div className="rounded-lg border border-[var(--border)]/60 bg-[var(--foreground)]/[0.02] px-3 py-2">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted)]">Pre-IPO</div>
          <div className="font-mono text-sm sm:text-base font-semibold text-[var(--foreground)]">
            {basketSlices.reduce((s, sl, i) => s + (sl.kind === "private" ? weights[i] : 0), 0)}%
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CODE BLOCK - Shows AMM contract interface
// =============================================================================

const codeSnippet = `interface IPriceOracleAMM {
  // Get current token price from oracle
  function getPrice(
    address token
  ) external view returns (uint256);

  // Swap tokens with oracle-adjusted pricing
  function swap(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minAmountOut
  ) external returns (uint256 amountOut);

  // Add concentrated liquidity
  function addLiquidity(
    address token,
    uint256 amount,
    int24 tickLower,
    int24 tickUpper
  ) external returns (uint256 liquidity);
}`;

export function CodeBlock() {
  return (
    <div className="overflow-hidden rounded-lg bg-[#0d1117] font-mono text-xs sm:text-sm max-w-full">
      {/* Window controls - Mac style */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-gray-800 px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]" />
        <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-gray-500 truncate">IPriceOracleAMM.sol</span>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed">
        <code>
          {codeSnippet.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-2 sm:mr-4 inline-block w-4 sm:w-6 select-none text-right text-gray-600">
                {i + 1}
              </span>
              <span>
                {highlightSolidity(line)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function highlightSolidity(line: string) {
  // Simple syntax highlighting
  return line
    .split(/(\b(?:interface|function|external|view|returns|address|uint256|int24)\b|\/\/.*$)/g)
    .map((part, i) => {
      if (/^(interface|function|external|view|returns)$/.test(part)) {
        return (
          <span key={i} className="text-blue-400">
            {part}
          </span>
        );
      }
      if (/^(address|uint256|int24)$/.test(part)) {
        return (
          <span key={i} className="text-cyan-400">
            {part}
          </span>
        );
      }
      if (part.startsWith("//")) {
        return (
          <span key={i} className="text-gray-500">
            {part}
          </span>
        );
      }
      return (
        <span key={i} className="text-gray-300">
          {part}
        </span>
      );
    });
}

// =============================================================================
// CHAIN DIAGRAM - Shows cross-chain bridge flow with real company logos
// =============================================================================

const bridgeTokens = [
  { symbol: "vSPACEX", companyName: "SpaceX" },
  { symbol: "vANTHROPIC", companyName: "Anthropic" },
  { symbol: "vOPENAI", companyName: "OpenAI" },
  { symbol: "vANDURIL", companyName: "Anduril" },
  { symbol: "vKALSHI", companyName: "Kalshi" },
  { symbol: "vPOLYMARKET", companyName: "Polymarket" },
];

export function ChainDiagram() {
  const [activeToken, setActiveToken] = useState(0);
  // Animation phase: 0 = at BNB, 1 = moving to Polygon, 2 = at Polygon, 3 = moving to BNB
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        const next = (prev + 1) % 4;
        // Change token when starting a new journey (phases 1 and 3)
        if (next === 1 || next === 3) {
          setActiveToken((t) => (t + 1) % bridgeTokens.length);
        }
        return next;
      });
    }, 2500); // 2.5 seconds per phase for smooth pacing

    return () => clearInterval(interval);
  }, []);

  // Calculate left position as percentage (0% = at BNB, 100% - token width = at Polygon)
  const getLeftPosition = () => {
    switch (phase) {
      case 0: return 0; // At BNB
      case 1: return 100; // Moving to Polygon
      case 2: return 100; // At Polygon
      case 3: return 0; // Moving back to BNB
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 py-2 sm:py-4">
      {/* Chain icons */}
      <div className="flex w-full items-center justify-between">
        {/* BNB Chain */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#F0B90B] shadow-lg transition-all duration-500 ${phase === 0 || phase === 3 ? "ring-2 ring-cyan-500/50 scale-105" : ""}`}>
            <svg viewBox="0 0 2496 2496" className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9">
              <path fill="#FFFFFF" d="M764.48,1050.52,1248,567l483.75,483.75L2013,768.94,1248,3.93,482.47,769.5,764.48,1050.52ZM3.93,1248,285.94,966l281.99,281.99L286,1530ZM764.48,1445.49,1248,1929l483.75-483.75,282.04,281.81L1248,2492.07,482.47,1726.5l-.4-.4,282.41-281.62ZM1928.05,1248l282-281.99L2492,1248l-281.99,281.99L1928.05,1248Z"/>
              <path fill="#FFFFFF" d="M1530.04,1247.94,1248,966,1039.51,1174.51l-23.97,23.96-49.34,49.34,282,281.93L1530.04,1248Z"/>
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">BNB Chain</span>
        </div>

        {/* Bridge arrow */}
        <div className="relative flex flex-1 items-center justify-center px-2 sm:px-4">
          <div className="h-0.5 w-full bg-gradient-to-r from-[#F0B90B] via-cyan-500 to-[#8247E5]" />

          {/* Animated token with real logo - uses percentage-based left positioning */}
          <div
            className="absolute flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[var(--card-bg)] shadow-lg ring-2 ring-cyan-500/50"
            style={{
              left: `calc(${getLeftPosition()}% - ${getLeftPosition() === 100 ? '24px' : '0px'})`,
              transition: 'left 2s ease-in-out',
            }}
          >
            <CompanyLogo name={bridgeTokens[activeToken].companyName} size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </div>

          {/* Bridge logo in center */}
          <div className={`absolute flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full border-2 border-cyan-500/30 bg-[var(--card-bg)] overflow-hidden transition-all duration-300 ${phase === 1 || phase === 3 ? "scale-110 border-cyan-500/60" : ""}`}>
            <img src="/bridge-logo.png" alt="Bridge" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain" />
          </div>
        </div>

        {/* Polygon */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#8247E5] shadow-lg transition-all duration-500 ${phase === 1 || phase === 2 ? "ring-2 ring-cyan-500/50 scale-105" : ""}`}>
            <svg viewBox="0 0 38.4 33.5" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="white">
              <path d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1V10c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V8c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5.9C.4 6.3 0 7.1 0 7.9v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v4.2c0 .8-.4 1.6-1.2 2.1l-4.3 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1V21l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z"/>
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">Polygon</span>
        </div>
      </div>

    </div>
  );
}
