export type SolidityTokenKind = "keyword" | "type" | "comment" | "plain";

export interface SolidityToken {
  text: string;
  kind: SolidityTokenKind;
}

const KEYWORD_RE = /^(interface|function|external|view|returns)$/;
const TYPE_RE = /^(address|uint256|int24)$/;

// Splits on Solidity keywords/types (as whole words) and single-line comments,
// keeping the matched delimiters as their own segments.
const SPLIT_RE =
  /(\b(?:interface|function|external|view|returns|address|uint256|int24)\b|\/\/.*$)/g;

/**
 * Pure syntax classifier for a single line of the Solidity snippet rendered by
 * CodeBlock. Returns the line broken into ordered tokens tagged by kind, with
 * no JSX involved so the logic can be unit-tested in a node environment.
 */
export function tokenizeSolidityLine(line: string): SolidityToken[] {
  return line
    .split(SPLIT_RE)
    .filter((part) => part.length > 0)
    .map((part): SolidityToken => {
      if (KEYWORD_RE.test(part)) {
        return { text: part, kind: "keyword" };
      }
      if (TYPE_RE.test(part)) {
        return { text: part, kind: "type" };
      }
      if (part.startsWith("//")) {
        return { text: part, kind: "comment" };
      }
      return { text: part, kind: "plain" };
    });
}
