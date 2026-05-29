import { notFound } from "next/navigation";
import { LocalServiceDetailScreen } from "@/app/services/_components/local-service-detail-screen";
import {
  getLocalServiceBySlug,
  getLocalServices,
} from "@/repositories/local-service-repository";

export function generateStaticParams() {
  return getLocalServices("beauty").map((professional) => ({
    professionalSlug: professional.slug,
  }));
}

export default async function HairdresserDetailPage({
  params,
}: PageProps<"/services/hairdressers/[professionalSlug]">) {
  const { professionalSlug } = await params;
  const professional = getLocalServiceBySlug("beauty", professionalSlug);

  if (!professional) {
    notFound();
  }

  return <LocalServiceDetailScreen professional={professional} />;
}
