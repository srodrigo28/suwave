import { notFound } from "next/navigation";
import {
  getLocalEventBySlug,
  getLocalEvents,
} from "@/repositories/event-repository";
import { EventDetailScreen } from "../_components/event-detail-screen";

export function generateStaticParams() {
  return getLocalEvents().map((event) => ({
    eventSlug: event.slug,
  }));
}

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[eventSlug]">) {
  const { eventSlug } = await params;
  const event = getLocalEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  return <EventDetailScreen event={event} />;
}
