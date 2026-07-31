import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Mirror the `@/*` -> `./*` path alias from tsconfig.json so tests can
    // import app/route modules (e.g. `@/app/sitemap`) and their transitive
    // `@/lib/...` imports resolve outside the Next.js build.
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
