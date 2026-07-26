import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Markdown-driven competitor comparison pages, loaded with gray-matter — the
// same pattern lib/compliance.ts uses for the SEC knowledge base. Each file in
// content/compare/<slug>.md carries structured frontmatter (the comparison
// table rows and FAQ pairs) plus a markdown body for the prose sections.

const CONTENT_DIR = path.join(process.cwd(), "content", "compare");

export const SITE_URL = "https://vaulto.fi";
export const PLATFORM_URL = "https://app.vaulto.fi";

export type CompareRow = {
  feature: string;
  vaulto: string;
  competitor: string;
};

export type CompareFaq = {
  question: string;
  answer: string;
};

export type Comparison = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  updated: string;
  tagline: string;
  intro: string;
  rows: CompareRow[];
  faqs: CompareFaq[];
  body: string;
};

class CompareContentError extends Error {}

function asString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new CompareContentError(
      `content/compare/${slug}.md: missing or empty required field "${field}"`,
    );
  }
  return value.trim();
}

function parseRows(value: unknown, slug: string): CompareRow[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new CompareContentError(
      `content/compare/${slug}.md: "rows" must be a non-empty list`,
    );
  }
  return value.map((row, i) => {
    const r = (row ?? {}) as Record<string, unknown>;
    return {
      feature: asString(r.feature, `rows[${i}].feature`, slug),
      vaulto: asString(r.vaulto, `rows[${i}].vaulto`, slug),
      competitor: asString(r.competitor, `rows[${i}].competitor`, slug),
    };
  });
}

function parseFaqs(value: unknown, slug: string): CompareFaq[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new CompareContentError(
      `content/compare/${slug}.md: "faqs" must be a non-empty list`,
    );
  }
  return value.map((faq, i) => {
    const f = (faq ?? {}) as Record<string, unknown>;
    return {
      question: asString(f.question, `faqs[${i}].question`, slug),
      answer: asString(f.answer, `faqs[${i}].answer`, slug),
    };
  });
}

function parseComparison(slug: string, raw: string): Comparison {
  const { content, data } = matter(raw);
  return {
    slug,
    competitor: asString(data.competitor, "competitor", slug),
    title: asString(data.title, "title", slug),
    description: asString(data.description, "description", slug),
    updated: asString(data.updated, "updated", slug),
    tagline: asString(data.tagline, "tagline", slug),
    intro: asString(data.intro, "intro", slug),
    rows: parseRows(data.rows, slug),
    faqs: parseFaqs(data.faqs, slug),
    body: content.trim(),
  };
}

export function getCompareSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

export function getComparison(slug: string): Comparison | null {
  const filename = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filename)) return null;
  const raw = fs.readFileSync(filename, "utf8");
  return parseComparison(slug, raw);
}

export function getAllComparisons(): Comparison[] {
  return getCompareSlugs()
    .map((slug) => getComparison(slug))
    .filter((c): c is Comparison => c !== null)
    .sort((a, b) => a.competitor.localeCompare(b.competitor));
}

// Build FAQPage + BreadcrumbList JSON-LD for a comparison page, mirroring
// buildFaqJsonLd in lib/faq-data.ts. Answers are plain text, exactly as shown
// on-page, so AI answering engines can extract them verbatim.
export function buildCompareJsonLd(comparison: Comparison) {
  const url = `${SITE_URL}/compare/${comparison.slug}`;

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq, i) => ({
      "@type": "Question",
      name: faq.question,
      url: `${url}#faq-${i}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: `${SITE_URL}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comparison.title,
        item: url,
      },
    ],
  };

  return [faqPage, breadcrumb];
}
