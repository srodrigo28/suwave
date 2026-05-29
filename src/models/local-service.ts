export type LocalServiceKind = "beauty" | "construction";

export type LocalServiceProduct = {
  id: string;
  price: string;
  title: string;
};

export type LocalServiceProfessional = {
  category: string;
  description: string;
  galleryLabel: string;
  kind: LocalServiceKind;
  location: string;
  name: string;
  products: LocalServiceProduct[];
  rating: string;
  reviewCount: string;
  services: string[];
  shortDescription: string;
  slug: string;
  unavailable?: string[];
  verified?: boolean;
  workInfo: {
    attendance: string;
    experience: string;
    hours: string;
  };
};
