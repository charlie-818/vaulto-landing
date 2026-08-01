import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Next.js compiles JSX with the automatic runtime (no `import React`);
  // mirror that so .tsx modules can be imported directly in tests.
  esbuild: { jsx: "automatic" },
  resolve: {
    // Mirror the tsconfig `@/*` -> `./*` path alias so tests can import
    // `@/lib/...` modules the same way app/ source does.
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
