#!/usr/bin/env node
/**
 * Post-build assertion that fonts are self-hosted via next/font.
 *
 * Fails if any emitted asset under .next/static or .next/server still references
 * fonts.googleapis.com, or if no .woff2 was emitted under .next/static/media.
 * Run after `next build`: `npm run check:fonts`.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const NEXT_DIR = join(ROOT, ".next");
const SCAN_DIRS = ["static", "server"].map((d) => join(NEXT_DIR, d));
const MEDIA_DIR = join(NEXT_DIR, "static", "media");
const FORBIDDEN = "fonts.googleapis.com";
// Only text-like assets can carry a URL; skip binaries to keep the scan cheap.
const TEXT_EXT = /\.(js|mjs|cjs|css|html|json|txt|map|rsc)$/i;

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

if (!existsSync(NEXT_DIR)) {
  console.error("check-self-hosted-fonts: .next not found — run `next build` first.");
  process.exit(2);
}

const offenders = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (!TEXT_EXT.test(file)) continue;
    if (readFileSync(file, "utf8").includes(FORBIDDEN)) offenders.push(file);
  }
}

const woff2 = [...walk(MEDIA_DIR)].filter((f) => f.endsWith(".woff2"));

let ok = true;
if (offenders.length > 0) {
  ok = false;
  console.error(`check-self-hosted-fonts: ${FORBIDDEN} referenced in build output:`);
  for (const f of offenders) console.error(`  - ${f}`);
}
if (woff2.length === 0) {
  ok = false;
  console.error(`check-self-hosted-fonts: no .woff2 emitted under ${MEDIA_DIR}`);
}

if (!ok) process.exit(1);
console.log(
  `check-self-hosted-fonts: OK — no ${FORBIDDEN} references; ${woff2.length} .woff2 file(s) in .next/static/media`
);
