export type ListingImageKind =
  | "bicycle"
  | "outfit"
  | "house"
  | "phonePair"
  | "pizza"
  | "pickup-black"
  | "pickup-white";

export type ListingTag = "destaque";

export type Listing = {
  areaBuilt?: string;
  areaLot?: string;
  badge?: string;
  bathrooms?: string;
  bedrooms?: string;
  category?: string;
  color?: string;
  condition?: string;
  description?: string;
  financing?: string;
  fuel?: string;
  gears?: string;
  image: string;
  imageKind: ListingImageKind;
  listingType?: string;
  mileage?: string;
  modelYear?: string;
  neighborhood?: string;
  parkingSpaces?: string;
  place: string;
  price: string;
  productId?: string;
  seller?: string;
  slug?: string;
  tags?: ListingTag[];
  title: string;
  transmission?: string;
  wheelSize?: string;
};
