import { LandingPage } from "@/components/LandingPage";
import { getShowcaseValuations } from "@/lib/company-valuations";

// Revalidate valuations every 5 minutes (ISR).
export const revalidate = 300;

export default async function Home() {
  const valuations = await getShowcaseValuations();
  return <LandingPage valuations={valuations} />;
}
