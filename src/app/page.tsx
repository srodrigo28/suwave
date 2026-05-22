import { AppShell } from "@/app/_components/app-shell";
import { HomeScreen } from "@/app/home/_components/home-screen";
import { getMarketplaceListings } from "@/repositories/listing-repository";

export default function Home() {
  return (
    <AppShell showSplash>
      <HomeScreen listings={getMarketplaceListings()} />
    </AppShell>
  );
}
