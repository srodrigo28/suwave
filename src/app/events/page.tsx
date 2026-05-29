import { getEvents } from "@/repositories/event-repository";
import { EventsScreen } from "./_components/events-screen";

export default async function EventsPage() {
  return (
    <EventsScreen
      activeTab="all"
      events={await getEvents()}
      title="Eventos e noticias"
    />
  );
}
