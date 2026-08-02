// Served at /.well-known/security.txt as text/plain per RFC 9116.
// Points security researchers at the right contact and disclosure preferences.
export const dynamic = "force-static";

// Refresh this within a year of the date below (RFC 9116 requires a future Expires).
const EXPIRES = "2027-08-02T00:00:00.000Z";

export function GET() {
  const lines: string[] = [
    "Contact: mailto:security@vaulto.fi",
    `Expires: ${EXPIRES}`,
    "Preferred-Languages: en",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
