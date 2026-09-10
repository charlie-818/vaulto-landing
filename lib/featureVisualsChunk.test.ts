import { describe, it, expect } from "vitest";
import {
  checkFeatureVisualsChunk,
  checkChunkContents,
  FEATURE_VISUALS_MARKER,
} from "../scripts/check-feature-visuals-chunk.mjs";

const LOADABLE_KEY = "components/LandingPage.tsx -> ./landing/FeatureVisuals";

const appBuildManifest = {
  pages: {
    "/layout": ["static/chunks/webpack-abc.js", "static/chunks/main-app-abc.js"],
    "/page": [
      "static/chunks/webpack-abc.js",
      "static/chunks/main-app-abc.js",
      "static/chunks/app/page-abc.js",
    ],
  },
};

const loadableManifest = {
  [LOADABLE_KEY]: { id: 8273, files: ["static/chunks/273.abc.js"] },
};

describe("checkFeatureVisualsChunk", () => {
  it("passes when FeatureVisuals is a separate async chunk", () => {
    expect(checkFeatureVisualsChunk(appBuildManifest, loadableManifest)).toEqual({
      entryChunks: appBuildManifest.pages["/page"],
      asyncChunks: ["static/chunks/273.abc.js"],
    });
  });

  it("fails when FeatureVisuals has no next/dynamic entry (static import)", () => {
    expect(() => checkFeatureVisualsChunk(appBuildManifest, {})).toThrow(
      /no next\/dynamic entry/
    );
  });

  it("fails when the async chunk is also in the /page entry", () => {
    const leaked = {
      pages: {
        "/page": [...appBuildManifest.pages["/page"], "static/chunks/273.abc.js"],
      },
    };
    expect(() => checkFeatureVisualsChunk(leaked, loadableManifest)).toThrow(
      /in the "\/page" entry/
    );
  });

  it("fails when the app build manifest has no /page entry", () => {
    expect(() => checkFeatureVisualsChunk({ pages: {} }, loadableManifest)).toThrow(
      /no "\/page" entry/
    );
  });

  it("fails when the dynamic entry lists no files", () => {
    expect(() =>
      checkFeatureVisualsChunk(appBuildManifest, { [LOADABLE_KEY]: { id: 1, files: [] } })
    ).toThrow(/no chunk files/);
  });
});

describe("checkChunkContents", () => {
  const chunks = {
    entryChunks: ["static/chunks/app/page-abc.js"],
    asyncChunks: ["static/chunks/273.abc.js"],
  };

  it("passes when only the async chunk contains FeatureVisuals code", () => {
    const contents: Record<string, string> = {
      "static/chunks/app/page-abc.js": "hero();",
      "static/chunks/273.abc.js": `symbol:"${FEATURE_VISUALS_MARKER}"`,
    };
    expect(() => checkChunkContents((f) => contents[f], chunks)).not.toThrow();
  });

  it("fails when an entry chunk contains FeatureVisuals code", () => {
    const contents: Record<string, string> = {
      "static/chunks/app/page-abc.js": `symbol:"${FEATURE_VISUALS_MARKER}"`,
      "static/chunks/273.abc.js": `symbol:"${FEATURE_VISUALS_MARKER}"`,
    };
    expect(() => checkChunkContents((f) => contents[f], chunks)).toThrow(/found in "\/page"/);
  });

  it("fails when no async chunk contains FeatureVisuals code", () => {
    const contents: Record<string, string> = {
      "static/chunks/app/page-abc.js": "hero();",
      "static/chunks/273.abc.js": "unrelated();",
    };
    expect(() => checkChunkContents((f) => contents[f], chunks)).toThrow(/none of the async/);
  });
});
