import { describe, it, expect } from "vitest";
import {
  ASSETS,
  PROTOCOL_CONTRACTS,
  buildTransparencyJsonLd,
} from "./deployments-data";

describe("buildTransparencyJsonLd", () => {
  it("emits a BreadcrumbList and an ItemList", () => {
    const [breadcrumb, itemList] = buildTransparencyJsonLd();
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(itemList["@type"]).toBe("ItemList");
  });

  it("renders as a parseable ld+json script whose breadcrumb ends at /transparency", () => {
    // Serialize exactly as app/transparency/page.tsx renders each entry.
    const html = buildTransparencyJsonLd()
      .map(
        (ld) =>
          `<script type="application/ld+json">${JSON.stringify(ld)}</script>`
      )
      .join("");

    expect(html).toContain('type="application/ld+json"');

    // Extract the payload of every ld+json script and find the BreadcrumbList.
    const payloads = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
      (m) => JSON.parse(m[1]) // JSON.parse must succeed
    );

    const breadcrumb = payloads.find((ld) => ld["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();

    const items = breadcrumb.itemListElement;
    expect(items[items.length - 1].item).toBe("https://vaulto.fi/transparency");
    expect(items[0].item).toBe("https://vaulto.fi/");
  });

  it("lists every protocol contract and each asset vault in the ItemList", () => {
    const [, itemList] = buildTransparencyJsonLd();
    const vaultCount = ASSETS.filter((a) => a.vault).length;
    expect(itemList.itemListElement).toHaveLength(
      vaultCount + PROTOCOL_CONTRACTS.length
    );
    // positions are 1-indexed and contiguous
    itemList.itemListElement.forEach((el: { position: number }, i: number) => {
      expect(el.position).toBe(i + 1);
    });
  });
});
