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
};

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
 * Rewrite intra-doc markdown links so `[x](02-foo.md)` resolves to
 * `/compliance/02-foo` in the rendered output.
 */
function rewriteInternalLinks(md: string): string {
  return md.replace(
    /\]\(([0-9A-Za-z-]+)\.md(#[^)]*)?\)/g,
    (_match, slug, hash) => {
      if (slug === "README") return `](/compliance${hash ?? ""})`;
      return `](/compliance/${slug}${hash ?? ""})`;
    }
  );
}

export function getComplianceSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => slug !== "README");
}

export function getAllComplianceDocs(): ComplianceDoc[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const docs: ComplianceDoc[] = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
    const { content, data } = matter(raw);
    return {
      slug,
      title:
        (typeof data.title === "string" && data.title) ||
        deriveTitle(slug, content),
      order: deriveOrder(slug),
      description:
        typeof data.description === "string" ? data.description : undefined,
      raw,
      body: rewriteInternalLinks(content),
    };
  });
  return docs.sort((a, b) => a.order - b.order);
}

export function getComplianceDoc(slug: string): ComplianceDoc | null {
  const filename = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filename)) return null;
  const raw = fs.readFileSync(filename, "utf8");
  const { content, data } = matter(raw);
  return {
    slug,
    title:
      (typeof data.title === "string" && data.title) ||
      deriveTitle(slug, content),
    order: deriveOrder(slug),
    description:
      typeof data.description === "string" ? data.description : undefined,
    raw,
    body: rewriteInternalLinks(content),
  };
}
