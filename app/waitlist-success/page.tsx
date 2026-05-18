import { Suspense } from "react";
import { WaitlistSuccessClient } from "@/components/WaitlistSuccessClient";

export const dynamic = "force-dynamic";

export default function WaitlistSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WaitlistSuccessClient />
    </Suspense>
  );
}
