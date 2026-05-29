import { notFound } from "next/navigation";
import {
  getHouseListingBySlug,
  getHouseListings,
} from "@/repositories/listing-repository";
import { HouseDetailScreen } from "./_components/house-detail-screen";

export function generateStaticParams() {
  return getHouseListings().map((listing) => ({
    listingSlug: listing.slug,
  }));
}

export default async function HouseDetailPage({
  params,
}: PageProps<"/listings/properties/houses/[listingSlug]">) {
  const { listingSlug } = await params;
  const listing = getHouseListingBySlug(listingSlug);

  if (!listing) {
    notFound();
  }

  return (
    <HouseDetailScreen
      listing={listing}
      relatedListings={getHouseListings().filter(
        (relatedListing) => relatedListing.slug !== listing.slug,
      )}
    />
  );
}
