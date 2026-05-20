import { supabase } from "./supabase";

export type NewsletterResponse = { ok: boolean; error?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function subscribeNewsletter(email: string): Promise<NewsletterResponse> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) {
    return { ok: false, error: "Please enter a valid email." };
  }
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: clean });
  if (error) {
    if (error.code === "23505") return { ok: true };
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
