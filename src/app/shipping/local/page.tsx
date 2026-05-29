import {
  getDeliveryQuotes,
  getLocalDeliveryRoute,
} from "@/repositories/mobility-repository";
import { LocalDeliveryScreen } from "./_components/local-delivery-screen";

export default function LocalDeliveryPage() {
  return (
    <LocalDeliveryScreen
      quotes={getDeliveryQuotes()}
      route={getLocalDeliveryRoute()}
    />
  );
}
