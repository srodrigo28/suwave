import { getPublicContentEventsFromApi } from "@/repositories/event-repository";
import { EventsScreen } from "../_components/events-screen";

export default async function PublicEventsPage() {
  return (
    <EventsScreen
      activeTab="public"
      events={await getPublicContentEventsFromApi()}
      title="Eventos publicos"
    />
  );
}
