import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

export const SITE_URL = "https://vaulto.fi";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  company?: string;
  sector?: string;
  /** ISO date the guide was first published. */
  date: string;
  /** ISO date of the last meaningful edit; falls back to `date`. */
  updated: string;
  order: number;
  body: string;
};

/**
 * Public URL slug for a guide file. Guides use clean, hand-written
 * filenames (`how-to-buy-spacex-stock-pre-ipo.md`) so the slug is just
 * the filename minus its markdown extension, normalized.
 */
export function slugFromFilename(filename: string): string {
  return filename
    .replace(/\.mdx?$/i, "")
    .trim()
    .toLowerCase();
}

function deriveTitle(body: string, slug: string): string {
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return slug;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/**
 * Coerce a frontmatter date to an ISO `YYYY-MM-DD` string. Unquoted YAML
 * dates parse to `Date` objects via js-yaml, so both cases are handled.
 */
function asIsoDate(value: unknown, fallback: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return asString(value) ?? fallback;
}

/**
 * Parse a single guide's raw markdown (frontmatter + body) into a `Guide`.
 * Pure — takes the source string rather than reading from disk — so it can
 * be unit tested without a filesystem.
 */
export function parseGuide(filename: string, raw: string): Guide {
  const slug = slugFromFilename(filename);
  const { content, data } = matter(raw);

  const date = asIsoDate(data.date, "1970-01-01");

  return {
    slug,
    title: asString(data.title) ?? deriveTitle(content, slug),
    description: asString(data.description) ?? "",
    company: asString(data.company),
    sector: asString(data.sector),
    date,
    updated: asIsoDate(data.updated, date),
    order: typeof data.order === "number" ? data.order : 9999,
    body: content.trim(),
  };
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/i.test(f))
    .map(slugFromFilename);
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/i.test(f));
  return files
    .map((f) => parseGuide(f, fs.readFileSync(path.join(CONTENT_DIR, f), "utf8")))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getGuide(slug: string): Guide | null {
  const normalized = slugFromFilename(slug);
  for (const ext of [".md", ".mdx"]) {
    const filename = path.join(CONTENT_DIR, `${normalized}${ext}`);
    if (fs.existsSync(filename)) {
      return parseGuide(`${normalized}${ext}`, fs.readFileSync(filename, "utf8"));
    }
  }
  return null;
}

/**
 * SEO keywords derived from a guide's company/sector frontmatter, aimed at
 * "how to buy <company> pre-IPO" search intent. Returns an empty array when
 * neither is present so callers can omit the `keywords` key cleanly.
 */
export function buildGuideKeywords(
  guide: Pick<Guide, "company" | "sector">
): string[] {
  const keywords: string[] = [];
  if (guide.company) {
    keywords.push(
      `how to buy ${guide.company} pre-IPO`,
      `${guide.company} pre-IPO`,
      `${guide.company} stock`
    );
  }
  if (guide.sector) keywords.push(guide.sector);
  return keywords;
}

/**
 * Build the schema.org Article JSON-LD for a guide detail page. When the
 * guide carries `company`/`sector` frontmatter, the object is enriched with
 * `about`, `articleSection`, `inLanguage`, and `keywords` to strengthen
 * entity association; guides without them omit those keys entirely.
 */
export function buildArticleLd(
  guide: Guide,
  url: string
): Record<string, unknown> {
  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Vaulto" },
    publisher: {
      "@type": "Organization",
      name: "Vaulto",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
  };

  if (guide.company) {
    articleLd.about = { "@type": "Organization", name: guide.company };
  }
  if (guide.sector) {
    articleLd.articleSection = guide.sector;
  }
  if (guide.company || guide.sector) {
    articleLd.inLanguage = "en";
    articleLd.keywords = buildGuideKeywords(guide);
  }

  return articleLd;
}
