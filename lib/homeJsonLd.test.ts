import { describe, it, expect } from "vitest";
import { HomeJsonLd } from "@/components/HomeJsonLd";
import { PLATFORM_URL } from "@/lib/config";
import {
  homeWebApplicationJsonLd,
  homeWebApplicationJsonLdString,
} from "./homeJsonLd";

describe("homeWebApplicationJsonLd", () => {
  it("describes the product as a FinanceApplication WebApplication", () => {
    const data = homeWebApplicationJsonLd();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("WebApplication");
    expect(data.applicationCategory).toBe("FinanceApplication");
    expect(data.operatingSystem).toBe("Web");
    expect(data.name).toBe("Vaulto");
    expect(data.url).toBe(PLATFORM_URL);
    expect(data.featureList.length).toBeGreaterThan(0);
  });

  it("serializes to JSON that parses back to the same node", () => {
    const parsed = JSON.parse(homeWebApplicationJsonLdString());
    expect(parsed["@type"]).toBe("WebApplication");
    expect(parsed.applicationCategory).toBe("FinanceApplication");
    expect(parsed.url).toBe(PLATFORM_URL);
  });
});

describe("HomeJsonLd component", () => {
  it("emits a ld+json script whose JSON parses and contains the WebApplication node", () => {
    const element = HomeJsonLd();
    expect(element.type).toBe("script");
    expect(element.props.type).toBe("application/ld+json");

    const html = element.props.dangerouslySetInnerHTML.__html as string;
    const parsed = JSON.parse(html);
    expect(parsed["@type"]).toBe("WebApplication");
    expect(parsed.applicationCategory).toBe("FinanceApplication");
    expect(parsed.url).toBe(PLATFORM_URL);
  });
});
