import { notFound } from "next/navigation";
import {
  getPickupListingBySlug,
  getPickupListings,
} from "@/repositories/listing-repository";
import { PickupDetailScreen } from "./_components/pickup-detail-screen";

export function generateStaticParams() {
  return getPickupListings().map((listing) => ({
    listingSlug: listing.slug,
  }));
}

export default async function PickupDetailPage({
  params,
}: PageProps<"/listings/vehicles/pickups/[listingSlug]">) {
  const { listingSlug } = await params;
  const listing = getPickupListingBySlug(listingSlug);

  if (!listing) {
    notFound();
  }

  return (
    <PickupDetailScreen
      listing={listing}
      relatedListings={getPickupListings().filter(
        (relatedListing) => relatedListing.slug !== listing.slug,
      )}
    />
  );
}
