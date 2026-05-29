import { getEventsByVisibility } from "@/repositories/event-repository";
import { EventsScreen } from "../_components/events-screen";

export default function PrivateEventsPage() {
  return (
    <EventsScreen
      activeTab="private"
      events={getEventsByVisibility("private")}
      title="Eventos privados"
    />
  );
}
