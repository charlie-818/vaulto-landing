import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    // Mirror the "@/*" path alias from tsconfig so tests can import modules
    // that reference "@/lib/...".
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
