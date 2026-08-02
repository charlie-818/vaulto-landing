import { describe, it, expect } from "vitest";
import { buildLlmsTxt } from "./llms-txt";
import { LIVE_MARKET_NAMES } from "./deployments-data";

describe("buildLlmsTxt", () => {
  const output = buildLlmsTxt();

  it("no longer claims a single first market", () => {
    expect(output).not.toContain("first market is Anthropic");
  });

  it("includes a /transparency key page", () => {
    expect(output).toContain(
      "- [Transparency](https://vaulto.fi/transparency): On-chain contracts, vaults, and Uniswap V3 pools on Polygon"
    );
  });

  it("derives live-market names from deployments-data", () => {
    // Every live company (anthropic, openai, anduril) must appear in the blurb.
    for (const name of LIVE_MARKET_NAMES) {
      expect(output).toContain(name);
    }
    expect(output).toContain(`Markets are live for`);
  });

  it("does not hardcode a market count that contradicts deployments-data", () => {
    // No stale singular claim about the market set.
    expect(output).not.toMatch(/The first market is/);
    expect(output).not.toMatch(/only market/i);
  });
});
