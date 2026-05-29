import { getLocalEvents } from "@/repositories/event-repository";
import { EventsScreen } from "./_components/events-screen";

export default function EventsPage() {
  return (
    <EventsScreen
      activeTab="all"
      events={getLocalEvents()}
      title="Eventos e noticias"
    />
  );
}
