import { getHouseListings } from "@/repositories/listing-repository";
import { HouseResultsScreen } from "./_components/house-results-screen";

export default function HouseListingsPage() {
  return <HouseResultsScreen listings={getHouseListings()} />;
}
