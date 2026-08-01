import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("waitlist-success page metadata", () => {
  it("is excluded from indexing", () => {
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect((metadata.robots as { index?: boolean }).index).toBe(false);
  });
});
