export type ListingImageKind =
  | "outfit"
  | "house"
  | "phonePair"
  | "pizza"
  | "pickup-black"
  | "pickup-white";

export type Listing = {
  badge?: string;
  category?: string;
  color?: string;
  fuel?: string;
  image: string;
  imageKind: ListingImageKind;
  mileage?: string;
  modelYear?: string;
  place: string;
  price: string;
  seller?: string;
  slug?: string;
  title: string;
  transmission?: string;
};
