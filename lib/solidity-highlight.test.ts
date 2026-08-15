import { describe, it, expect } from "vitest";
import { tokenizeSolidityLine } from "./solidity-highlight";

describe("tokenizeSolidityLine", () => {
  it("classifies keywords, types, and plain text in a function signature", () => {
    const tokens = tokenizeSolidityLine(
      "function mint(address to) external view returns (uint256)"
    );

    const keywords = tokens
      .filter((t) => t.kind === "keyword")
      .map((t) => t.text);
    expect(keywords).toEqual(["function", "external", "view", "returns"]);

    const types = tokens.filter((t) => t.kind === "type").map((t) => t.text);
    expect(types).toEqual(["address", "uint256"]);

    // Everything else is plain, and reassembling all tokens rebuilds the line.
    expect(tokens.every((t) => t.kind !== "comment")).toBe(true);
    expect(tokens.map((t) => t.text).join("")).toBe(
      "function mint(address to) external view returns (uint256)"
    );
  });

  it("treats a trailing comment as a single comment token to end of line", () => {
    const tokens = tokenizeSolidityLine("    return x; // comment");
    const comments = tokens.filter((t) => t.kind === "comment");
    expect(comments).toHaveLength(1);
    expect(comments[0].text).toBe("// comment");
  });

  it("returns one plain token for a line with no matches", () => {
    expect(tokenizeSolidityLine("    x = y + z;")).toEqual([
      { text: "    x = y + z;", kind: "plain" },
    ]);
  });
});
