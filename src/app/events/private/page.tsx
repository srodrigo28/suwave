import { getRemoteEventsByVisibility } from "@/repositories/event-repository";
import { EventsScreen } from "../_components/events-screen";

export default async function PrivateEventsPage() {
  return (
    <EventsScreen
      activeTab="private"
      events={await getRemoteEventsByVisibility("private")}
      title="Eventos privados"
    />
  );
}
