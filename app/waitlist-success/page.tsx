import type { Metadata } from "next";
import { Suspense } from "react";
import { WaitlistSuccessClient } from "@/components/WaitlistSuccessClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "You're on the list · Vaulto",
  robots: { index: false, follow: false },
};

export default function WaitlistSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WaitlistSuccessClient />
    </Suspense>
  );
}
