import { buildLlmsTxt } from "@/lib/llms-txt";

// Served at /llms.txt as text/plain. Built from the FAQ data so it stays in sync.
// Gives AI agents a concise, linked map of canonical answers and key resources.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
