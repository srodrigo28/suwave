export type ListingImageKind =
  | "outfit"
  | "house"
  | "phonePair"
  | "pizza"
  | "pickup-black"
  | "pickup-white";

export type ListingTag = "destaque";

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
  productId?: string;
  seller?: string;
  slug?: string;
  tags?: ListingTag[];
  title: string;
  transmission?: string;
};
