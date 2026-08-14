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

/**
 * BreadcrumbList JSON-LD for the /guides index: Home > Guides. Pure so it can
 * be unit tested; mirrors the Guides > title breadcrumb on guide detail pages.
 */
export function buildGuidesBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
    ],
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
