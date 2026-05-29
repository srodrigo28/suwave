import {
  getRegionalRideRoute,
  getRideOptions,
} from "@/repositories/mobility-repository";
import { RegionalRideScreen } from "./_components/regional-ride-screen";

export default function RegionalRidePage() {
  return (
    <RegionalRideScreen
      options={getRideOptions()}
      route={getRegionalRideRoute()}
    />
  );
}
