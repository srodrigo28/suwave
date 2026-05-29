import { notFound } from "next/navigation";
import { LocalServiceDetailScreen } from "@/app/services/_components/local-service-detail-screen";
import {
  getLocalServiceBySlug,
  getLocalServices,
} from "@/repositories/local-service-repository";

export function generateStaticParams() {
  return getLocalServices("construction").map((professional) => ({
    professionalSlug: professional.slug,
  }));
}

export default async function BuilderDetailPage({
  params,
}: PageProps<"/services/builders/[professionalSlug]">) {
  const { professionalSlug } = await params;
  const professional = getLocalServiceBySlug("construction", professionalSlug);

  if (!professional) {
    notFound();
  }

  return <LocalServiceDetailScreen professional={professional} />;
}
