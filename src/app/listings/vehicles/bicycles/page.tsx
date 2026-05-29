import { getBicycleListings } from "@/repositories/listing-repository";
import { BicycleResultsScreen } from "./_components/bicycle-results-screen";

export default function BicycleListingsPage() {
  return <BicycleResultsScreen listings={getBicycleListings()} />;
}
