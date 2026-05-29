import { notFound } from "next/navigation";
import {
  getBicycleListingBySlug,
  getBicycleListings,
} from "@/repositories/listing-repository";
import { BicycleDetailScreen } from "./_components/bicycle-detail-screen";

export function generateStaticParams() {
  return getBicycleListings().map((listing) => ({
    listingSlug: listing.slug,
  }));
}

export default async function BicycleDetailPage({
  params,
}: PageProps<"/listings/vehicles/bicycles/[listingSlug]">) {
  const { listingSlug } = await params;
  const listing = getBicycleListingBySlug(listingSlug);

  if (!listing) {
    notFound();
  }

  return (
    <BicycleDetailScreen
      listing={listing}
      relatedListings={getBicycleListings().filter(
        (relatedListing) => relatedListing.slug !== listing.slug,
      )}
    />
  );
}
