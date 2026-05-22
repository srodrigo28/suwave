import { getPickupListings } from "@/repositories/listing-repository";
import { PickupResultsScreen } from "./_components/pickup-results-screen";

export default function PickupListingsPage() {
  return <PickupResultsScreen listings={getPickupListings()} />;
}
