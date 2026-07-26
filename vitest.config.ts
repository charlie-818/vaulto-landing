import { defineConfig } from "vitest/config";

// Minimal vitest setup for the landing repo. Node environment is enough — the
// content loaders read markdown from disk with node:fs.
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
