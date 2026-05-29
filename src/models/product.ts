export type ProductMediaType = "image" | "video";
export type ProductMediaStatus = "ready" | "uploading" | "failed";
export type ProductStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "paused"
  | "sold"
  | "rejected"
  | "archived";

export type ProductMedia = {
  altText?: string;
  createdAt: string;
  id: string;
  isCover: boolean;
  position: number;
  status: ProductMediaStatus;
  thumbnailUrl?: string;
  type: ProductMediaType;
  url: string;
};

export type ProductType = {
  description: string;
  id: "vehicle" | "fashion" | "food" | "real_estate" | "service";
  label: string;
  requiredFields: string[];
};

export type Product = {
  attributes: Record<string, Record<string, string>>;
  categoryId: string;
  city: string;
  createdAt: string;
  currency: "BRL";
  description: string;
  id: string;
  media: ProductMedia[];
  price: string;
  publishedAt?: string;
  sellerId: string;
  sellerName: string;
  state: string;
  status: ProductStatus;
  subcategoryId: string;
  title: string;
  type: ProductType["id"];
  updatedAt: string;
};

export type ProductMediaRule = {
  description: string;
  id: string;
  label: string;
};
