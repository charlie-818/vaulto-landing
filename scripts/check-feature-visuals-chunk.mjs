#!/usr/bin/env node
// Asserts that components/landing/FeatureVisuals.tsx is code-split out of the
// home page's initial JS. Run after `next build`:
//
//   npm run check:chunks
//
// Checks, against the artifacts in .next/:
//   1. react-loadable-manifest.json has a next/dynamic entry for FeatureVisuals
//      whose files are NOT in the "/page" entry of app-build-manifest.json.
//   2. Those async chunk files exist on disk and contain FeatureVisuals code,
//      while none of the "/page" entry chunks do.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const FEATURE_VISUALS_MODULE = "./landing/FeatureVisuals";
export const HOME_PAGE_ENTRY = "/page";
// A string literal from FeatureVisuals.tsx that survives minification.
export const FEATURE_VISUALS_MARKER = "vPOLYMARKET";

/**
 * Pure check against the two manifests. Returns the entry chunks and the
 * FeatureVisuals async chunks, or throws with a descriptive message.
 *
 * @param {{ pages?: Record<string, string[]> }} appBuildManifest
 * @param {Record<string, { id?: number | string; files?: string[] }>} loadableManifest
 * @returns {{ entryChunks: string[]; asyncChunks: string[] }}
 */
export function checkFeatureVisualsChunk(appBuildManifest, loadableManifest) {
  const entryChunks = appBuildManifest.pages?.[HOME_PAGE_ENTRY];
  if (!Array.isArray(entryChunks) || entryChunks.length === 0) {
    throw new Error(`app-build-manifest.json has no "${HOME_PAGE_ENTRY}" entry`);
  }

  const loadableKeys = Object.keys(loadableManifest).filter((key) =>
    key.endsWith(`-> ${FEATURE_VISUALS_MODULE}`)
  );
  if (loadableKeys.length === 0) {
    throw new Error(
      `react-loadable-manifest.json has no next/dynamic entry for ${FEATURE_VISUALS_MODULE}; ` +
        "is it still statically imported?"
    );
  }

  const asyncChunks = [
    ...new Set(loadableKeys.flatMap((key) => loadableManifest[key].files ?? [])),
  ];
  if (asyncChunks.length === 0) {
    throw new Error(`next/dynamic entry for ${FEATURE_VISUALS_MODULE} lists no chunk files`);
  }

  const entrySet = new Set(entryChunks);
  const leaked = asyncChunks.filter((file) => entrySet.has(file));
  if (leaked.length > 0) {
    throw new Error(
      `FeatureVisuals chunk(s) are in the "${HOME_PAGE_ENTRY}" entry: ${leaked.join(", ")}`
    );
  }

  return { entryChunks, asyncChunks };
}

/**
 * Content check: the marker must appear in at least one async chunk and in
 * none of the entry chunks.
 *
 * @param {(file: string) => string} readChunk
 * @param {{ entryChunks: string[]; asyncChunks: string[] }} chunks
 */
export function checkChunkContents(readChunk, { entryChunks, asyncChunks }) {
  const leaked = entryChunks.filter((file) => readChunk(file).includes(FEATURE_VISUALS_MARKER));
  if (leaked.length > 0) {
    throw new Error(
      `FeatureVisuals code found in "${HOME_PAGE_ENTRY}" entry chunk(s): ${leaked.join(", ")}`
    );
  }
  if (!asyncChunks.some((file) => readChunk(file).includes(FEATURE_VISUALS_MARKER))) {
    throw new Error(
      `none of the async chunks (${asyncChunks.join(", ")}) contain "${FEATURE_VISUALS_MARKER}"`
    );
  }
}

function main() {
  const nextDir = join(process.cwd(), ".next");
  const readJson = (name) => {
    const file = join(nextDir, name);
    if (!existsSync(file)) {
      throw new Error(`${file} not found; run \`npm run build\` first`);
    }
    return JSON.parse(readFileSync(file, "utf8"));
  };

  const chunks = checkFeatureVisualsChunk(
    readJson("app-build-manifest.json"),
    readJson("react-loadable-manifest.json")
  );
  checkChunkContents((file) => readFileSync(join(nextDir, file), "utf8"), chunks);

  console.log(
    `ok: FeatureVisuals is an async chunk (${chunks.asyncChunks.join(", ")}) ` +
      `outside the ${chunks.entryChunks.length} "${HOME_PAGE_ENTRY}" entry chunks`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    main();
  } catch (err) {
    console.error(`check-feature-visuals-chunk: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
}
