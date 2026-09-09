import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it, expect, vi } from "vitest";

// The page shells only render a Suspense boundary around a client component;
// stub the components so the test doesn't pull next/image, next/navigation, etc.
vi.mock("@/components/UnsubscribeClient", () => ({
  UnsubscribeClient: () => null,
}));
vi.mock("@/components/WaitlistSuccessClient", () => ({
  WaitlistSuccessClient: () => null,
}));

const read = (rel: string) =>
  readFileSync(path.resolve(__dirname, "..", rel), "utf8");

describe("static unsubscribe / waitlist-success shells", () => {
  it("unsubscribe page does not force dynamic rendering", async () => {
    const page = await import("@/app/unsubscribe/page");
    expect((page as { dynamic?: unknown }).dynamic).toBeUndefined();
    expect(page.default).toBeTypeOf("function");
  });

  it("waitlist-success page does not force dynamic rendering", async () => {
    const page = await import("@/app/waitlist-success/page");
    expect((page as { dynamic?: unknown }).dynamic).toBeUndefined();
    expect(page.default).toBeTypeOf("function");
  });

  it("query-string reading stays client-side behind a Suspense boundary", () => {
    for (const rel of [
      "components/UnsubscribeClient.tsx",
      "components/WaitlistSuccessClient.tsx",
    ]) {
      const src = read(rel);
      expect(src.startsWith('"use client"')).toBe(true);
      expect(src).toContain("useSearchParams()");
    }
    for (const rel of ["app/unsubscribe/page.tsx", "app/waitlist-success/page.tsx"]) {
      expect(read(rel)).toContain("<Suspense");
    }
  });
});
