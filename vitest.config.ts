import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Minimal vitest setup for pure-logic unit tests (lib/*.test.ts). The `@/*`
// alias mirrors tsconfig so imports resolve the same way as in the app.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    include: ["lib/**/*.test.ts"],
  },
});
