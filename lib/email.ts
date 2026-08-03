const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Returns true when `raw` is a plausibly-valid email address.
 * Trims surrounding whitespace and lowercases before testing, so callers can
 * validate the same normalized form they intend to persist.
 */
export function isValidEmail(raw: string): boolean {
  return EMAIL_RE.test(raw.trim().toLowerCase());
}
