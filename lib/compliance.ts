import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "sec-research");

export type ComplianceDoc = {
  slug: string;
  title: string;
  order: number;
  description?: string;
  raw: string;
  body: string;
};

const TITLE_OVERRIDES: Record<string, string> = {
  README: "Knowledge Base Index",
  "02-bucket-digital-commodities": "Commodities",
  "03-bucket-digital-collectibles": "Collectibles",
  "04-bucket-digital-tools": "Tools",
  "05-bucket-tokenized-securities": "Securities",
  "06-bucket-stablecoins": "Stablecoins",
};

// File-slug (numbered, on disk) → URL slug (clean, public).
// Keeps filesystem ordering while exposing conventional URLs.
const FILE_TO_URL: Record<string, string> = {
  "00-quickstart-builders": "quickstart",
  "01-project-crypto-overview": "project-crypto",
  "02-bucket-digital-commodities": "commodities",
  "03-bucket-digital-collectibles": "collectibles",
  "04-bucket-digital-tools": "tools",
  "05-bucket-tokenized-securities": "securities",
  "06-bucket-stablecoins": "stablecoins",
  "10-foundations-howey-reves": "howey-reves",
  "11-key-enforcement-cases": "enforcement",
  "12-safe-harbors-exemptions": "safe-harbors",
  "13-secondary-market-ats": "secondary-markets",
  "14-fit21-and-legislation": "legislation",
  "15-state-level": "state-level",
  "16-international-contrast": "international",
  "17-no-action-letters": "no-action-letters",
  "20-glossary": "glossary",
  "99-sources": "sources",
};

const URL_TO_FILE: Record<string, string> = Object.fromEntries(
  Object.entries(FILE_TO_URL).map(([file, url]) => [url, file])
);

function fileSlugToUrlSlug(fileSlug: string): string {
  return FILE_TO_URL[fileSlug] ?? fileSlug;
}

function urlSlugToFileSlug(urlSlug: string): string {
  return URL_TO_FILE[urlSlug] ?? urlSlug;
}

function deriveTitle(slug: string, body: string): string {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/\s+—.*$/, "").trim();
  return slug;
}

function deriveOrder(slug: string): number {
  const match = slug.match(/^(\d+)/);
  if (match) return parseInt(match[1], 10);
  if (slug === "README") return -1;
  return 9999;
}

/**
 * Rewrite intra-doc markdown links `[x](02-foo.md)` → `/compliance/<urlSlug>`.
 */
function rewriteInternalLinks(md: string): string {
  return md.replace(
    /\]\(([0-9A-Za-z-]+)\.md(#[^)]*)?\)/g,
    (_match, fileSlug, hash) => {
      if (fileSlug === "README") return `](/compliance${hash ?? ""})`;
      const urlSlug = fileSlugToUrlSlug(fileSlug);
      return `](/compliance/${urlSlug}${hash ?? ""})`;
    }
  );
}

let _citationMap: Map<string, string> | null = null;

function getCitationMap(): Map<string, string> {
  if (_citationMap) return _citationMap;
  const map = new Map<string, string>();
  const sourcesPath = path.join(CONTENT_DIR, "99-sources.md");
  if (fs.existsSync(sourcesPath)) {
    const text = fs.readFileSync(sourcesPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const keyMatch = line.match(/^\|\s*\[(S\d+)\]\s*\|/);
      if (!keyMatch) continue;
      const urlMatch = line.match(/https?:\/\/[^\s|)]+/);
      if (urlMatch) map.set(keyMatch[1], urlMatch[0]);
    }
  }
  _citationMap = map;
  return map;
}

function linkCitations(md: string, fileSlug: string): string {
  if (fileSlug === "99-sources") return md;
  const map = getCitationMap();
  return md.replace(/\[(S\d+)\](?!\()/g, (_match, key) => {
    const url = map.get(key) ?? `/compliance/${fileSlugToUrlSlug("99-sources")}`;
    return `[[${key}]](${url})`;
  });
}

export function getComplianceSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => slug !== "README")
    .map(fileSlugToUrlSlug);
}

export function getAllComplianceDocs(): ComplianceDoc[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const docs: ComplianceDoc[] = files.map((f) => {
    const fileSlug = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
    const { content, data } = matter(raw);
    return {
      slug: fileSlugToUrlSlug(fileSlug),
      title:
        (typeof data.title === "string" && data.title) ||
        deriveTitle(fileSlug, content),
      order: deriveOrder(fileSlug),
      description:
        typeof data.description === "string" ? data.description : undefined,
      raw,
      body: linkCitations(rewriteInternalLinks(content), fileSlug),
    };
  });
  return docs.sort((a, b) => a.order - b.order);
}

export function getComplianceDoc(urlSlug: string): ComplianceDoc | null {
  const fileSlug = urlSlugToFileSlug(urlSlug);
  const filename = path.join(CONTENT_DIR, `${fileSlug}.md`);
  if (!fs.existsSync(filename)) return null;
  const raw = fs.readFileSync(filename, "utf8");
  const { content, data } = matter(raw);
  return {
    slug: fileSlugToUrlSlug(fileSlug),
    title:
      (typeof data.title === "string" && data.title) ||
      deriveTitle(fileSlug, content),
    order: deriveOrder(fileSlug),
    description:
      typeof data.description === "string" ? data.description : undefined,
    raw,
    body: rewriteInternalLinks(content),
  };
}
