import { describe, it, expect } from "vitest";
import {
  ASSETS,
  COMING_SOON,
  PROTOCOL_CONTRACTS,
  INTEGRATIONS,
  UNISWAP,
  POOL_ROWS,
  type Asset,
} from "./deployments-data";

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

// The five on-chain address fields carried per deployed asset.
const ASSET_ADDRESS_FIELDS = [
  "vault",
  "longToken",
  "shortToken",
  "longPool",
  "shortPool",
] as const;

// Every address that ships to the /transparency page, paired with a human-readable
// label so a failure points straight at the offending entry.
function collectAddresses(): { label: string; address: string }[] {
  const out: { label: string; address: string }[] = [];

  for (const asset of ASSETS) {
    for (const field of ASSET_ADDRESS_FIELDS) {
      const address = asset[field];
      if (address) out.push({ label: `ASSETS[${asset.slug}].${field}`, address });
    }
  }
  for (const c of PROTOCOL_CONTRACTS) {
    out.push({ label: `PROTOCOL_CONTRACTS[${c.name}]`, address: c.address });
  }
  for (const c of INTEGRATIONS) {
    out.push({ label: `INTEGRATIONS[${c.name}]`, address: c.address });
  }
  for (const c of UNISWAP.infra) {
    out.push({ label: `UNISWAP.infra[${c.name}]`, address: c.address });
  }

  return out;
}

describe("deployments-data address integrity", () => {
  const addresses = collectAddresses();

  it("collects at least one address per source", () => {
    // Guards against a refactor silently emptying a source list and making the
    // uniqueness/format checks vacuous.
    expect(addresses.length).toBeGreaterThanOrEqual(
      ASSETS.length * ASSET_ADDRESS_FIELDS.length +
        PROTOCOL_CONTRACTS.length +
        INTEGRATIONS.length +
        UNISWAP.infra.length
    );
  });

  it.each(addresses)("$label is a well-formed 20-byte address", ({ address }) => {
    expect(address).toMatch(ADDRESS_RE);
  });

  it("has no duplicate addresses across the entire registry", () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const { label, address } of addresses) {
      const key = address.toLowerCase();
      const prior = seen.get(key);
      if (prior) {
        duplicates.push(`${address} used by both ${prior} and ${label}`);
      } else {
        seen.set(key, label);
      }
    }
    expect(duplicates).toEqual([]);
  });
});

describe("deployments-data slug integrity", () => {
  it("keeps ASSETS slugs disjoint from COMING_SOON slugs", () => {
    const liveSlugs = new Set(ASSETS.map((a) => a.slug));
    const overlap = COMING_SOON.filter((a) => liveSlugs.has(a.slug)).map((a) => a.slug);
    expect(overlap).toEqual([]);
  });

  it("has unique slugs within ASSETS and within COMING_SOON", () => {
    const allSlugs = [...ASSETS, ...COMING_SOON].map((a) => a.slug);
    expect(new Set(allSlugs).size).toBe(allSlugs.length);
  });
});

describe("deployments-data live-asset completeness", () => {
  const liveAssets = ASSETS.filter((a) => a.status === "live");

  it("has at least one live asset to check", () => {
    expect(liveAssets.length).toBeGreaterThan(0);
  });

  it.each(liveAssets)(
    "$slug (live) has all five on-chain addresses populated",
    (asset: Asset) => {
      for (const field of ASSET_ADDRESS_FIELDS) {
        expect(asset[field], `${asset.slug}.${field}`).toBeTruthy();
      }
    }
  );
});

describe("deployments-data POOL_ROWS", () => {
  it("yields exactly two rows per asset", () => {
    expect(POOL_ROWS.length).toBe(ASSETS.length * 2);
  });

  it.each(ASSETS)(
    "$slug contributes a Long (_L) and Short (_S) row with matching symbolBase",
    (asset: Asset) => {
      const rows = POOL_ROWS.filter((r) => r.slug === asset.slug);
      expect(rows).toHaveLength(2);

      const long = rows.find((r) => r.leg === "Long");
      const short = rows.find((r) => r.leg === "Short");
      expect(long?.symbol).toBe(`${asset.symbolBase}_L`);
      expect(short?.symbol).toBe(`${asset.symbolBase}_S`);
      expect(long?.pool).toBe(asset.longPool);
      expect(short?.pool).toBe(asset.shortPool);
    }
  );
});
