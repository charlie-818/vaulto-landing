import { describe, it, expect } from "vitest";
import {
  ASSETS,
  NETWORK,
  POOL_ROWS,
  polygonscanAddress,
  polygonscanToken,
  uniswapPool,
} from "./deployments-data";

const SAMPLE = "0x61F8Cb13a60040FC70F701eA65928C82d32404f2";

describe("polygonscanAddress", () => {
  it("builds an explorer address URL", () => {
    expect(polygonscanAddress(SAMPLE)).toBe(
      `${NETWORK.explorer}/address/${SAMPLE}`
    );
  });

  it("uses the network explorer base", () => {
    expect(polygonscanAddress(SAMPLE)).toBe(
      `https://polygonscan.com/address/${SAMPLE}`
    );
  });
});

describe("polygonscanToken", () => {
  it("builds an explorer token URL", () => {
    expect(polygonscanToken(SAMPLE)).toBe(
      `${NETWORK.explorer}/token/${SAMPLE}`
    );
  });
});

describe("uniswapPool", () => {
  it("targets the Polygon Uniswap pools explorer", () => {
    expect(uniswapPool(SAMPLE)).toMatch(
      /^https:\/\/app\.uniswap\.org\/explore\/pools\/polygon\//
    );
  });

  it("appends the pool address", () => {
    expect(uniswapPool(SAMPLE)).toBe(
      `https://app.uniswap.org/explore/pools/polygon/${SAMPLE}`
    );
  });
});

describe("POOL_ROWS", () => {
  it("emits a long and short leg per asset", () => {
    expect(POOL_ROWS.length).toBe(ASSETS.length * 2);
  });

  it("only references known assets", () => {
    const names = new Set(ASSETS.map((a) => a.name));
    for (const row of POOL_ROWS) {
      expect(names.has(row.asset)).toBe(true);
    }
  });

  it("derives symbol and pool from each asset's legs", () => {
    for (const asset of ASSETS) {
      const rows = POOL_ROWS.filter((r) => r.slug === asset.slug);
      expect(rows.map((r) => r.leg)).toEqual(["Long", "Short"]);

      const [long, short] = rows;
      expect(long.symbol).toBe(`${asset.symbolBase}_L`);
      expect(long.pool).toBe(asset.longPool);
      expect(short.symbol).toBe(`${asset.symbolBase}_S`);
      expect(short.pool).toBe(asset.shortPool);
    }
  });
});
