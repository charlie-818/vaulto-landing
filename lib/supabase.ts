import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surface misconfig early in dev; production build will still proceed.
  // eslint-disable-next-line no-console
  console.warn("Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Use a syntactically valid placeholder when env is absent so module load
// (and static prerender) never throws "supabaseUrl is required". Real values
// are used wherever the env vars are configured (e.g. production).
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  { auth: { persistSession: false } }
);
