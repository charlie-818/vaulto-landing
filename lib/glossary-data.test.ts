import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import {
  GLOSSARY_TERMS,
  SITE_URL,
  buildGlossaryJsonLd,
} from "./glossary-data";

describe("GLOSSARY_TERMS", () => {
  it("has unique kebab-case ids", () => {
    const ids = GLOSSARY_TERMS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("has a non-empty term and definition for every entry", () => {
    for (const term of GLOSSARY_TERMS) {
      expect(term.term.length).toBeGreaterThan(0);
      expect(term.definition.length).toBeGreaterThan(0);
    }
  });
});

describe("buildGlossaryJsonLd", () => {
  const [definedTermSet, breadcrumb] = buildGlossaryJsonLd();

  it("returns a valid DefinedTermSet", () => {
    expect(definedTermSet["@context"]).toBe("https://schema.org");
    expect(definedTermSet["@type"]).toBe("DefinedTermSet");
    expect(definedTermSet.url).toBe(`${SITE_URL}/glossary`);
    expect(definedTermSet.name.length).toBeGreaterThan(0);
    expect(definedTermSet.description.length).toBeGreaterThan(0);
  });

  it("has one DefinedTerm per entry", () => {
    expect(definedTermSet.hasDefinedTerm).toHaveLength(GLOSSARY_TERMS.length);
    for (const dt of definedTermSet.hasDefinedTerm) {
      expect(dt["@type"]).toBe("DefinedTerm");
      expect(dt.inDefinedTermSet).toBe(`${SITE_URL}/glossary`);
    }
  });

  it("mirrors each term's name and plain-text definition verbatim", () => {
    GLOSSARY_TERMS.forEach((term, i) => {
      const dt = definedTermSet.hasDefinedTerm[i];
      expect(dt.name).toBe(term.term);
      expect(dt.description).toBe(term.definition);
    });
  });

  it("gives each DefinedTerm a url anchor matching the rendered id", () => {
    GLOSSARY_TERMS.forEach((term, i) => {
      const dt = definedTermSet.hasDefinedTerm[i];
      const expected = `${SITE_URL}/glossary#${term.id}`;
      expect(dt.url).toBe(expected);
      expect(dt["@id"]).toBe(expected);
    });
  });

  it("emits a BreadcrumbList ending at the glossary page", () => {
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    const last = breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1];
    expect(last.name).toBe("Glossary");
    expect(last.item).toBe(`${SITE_URL}/glossary`);
  });
});

describe("sitemap", () => {
  it("registers the /glossary route", () => {
    const source = readFileSync(
      fileURLToPath(new URL("../app/sitemap.ts", import.meta.url)),
      "utf8",
    );
    expect(source).toContain("/glossary");
  });
});
