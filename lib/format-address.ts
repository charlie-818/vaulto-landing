/** Shorten an on-chain address for display, e.g. 0x1b91BaF3…a202 → 0x1b91…a202. */
export function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
