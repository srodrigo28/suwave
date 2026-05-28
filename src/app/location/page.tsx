import { getLocationCities } from "@/repositories/location-repository";
import { LocationScreen } from "./_components/location-screen";

export default function LocationPage() {
  return <LocationScreen cities={getLocationCities()} />;
}
