import { getPublicContentEvents } from "@/repositories/event-repository";
import { EventsScreen } from "../_components/events-screen";

export default function PublicEventsPage() {
  return (
    <EventsScreen
      activeTab="public"
      events={getPublicContentEvents()}
      title="Eventos publicos"
    />
  );
}
