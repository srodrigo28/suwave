import type { Listing } from "@/models/listing";

const listings: Listing[] = [
  {
    image: "/marketplace/beige-set.png",
    imageKind: "outfit",
    place: "Sinop - MT",
    price: "R$ 89,90",
    title: "Conjunto Masculino Basico Premium",
  },
  {
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    place: "Sinop - MT",
    price: "R$ 750.000,00",
    title: "Casa a venda no Jardim das Oliveiras",
  },
  {
    image: "/marketplace/phone-pair.png",
    imageKind: "phonePair",
    place: "Sinop - MT",
    price: "R$ 3.499,00",
    title: "Smartphone preto 256 GB",
  },
  {
    badge: "Promocao",
    image: "/marketplace/pizza-promo.png",
    imageKind: "pizza",
    place: "Centro",
    price: "R$ 49,90",
    title: "Pizza grande com entrega",
  },
];

const pickupListings: Listing[] = [
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "38.000 km",
    modelYear: "2021",
    place: "Sinop - MT",
    price: "R$ 179.900,00",
    seller: "Auto Center Silva",
    slug: "ford-ranger-xlt-3-2-4x4",
    title: "Ford Ranger XLT 3.2 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "45.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 189.900,00",
    seller: "Auto Center Silva",
    slug: "toyota-hilux-srx-2-8-4x4",
    title: "Toyota Hilux SRX 2.8 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "41.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 169.900,00",
    seller: "Auto Center Silva",
    slug: "chevrolet-s10-ltz-2-8-4x4",
    title: "Chevrolet S10 LTZ 2.8 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "33.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 174.900,00",
    seller: "Auto Center Silva",
    slug: "mitsubishi-l200-triton-sport",
    title: "Mitsubishi L200 Triton Sport HPE",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "36.000 km",
    modelYear: "2023",
    place: "Sinop - MT",
    price: "R$ 182.900,00",
    seller: "Auto Center Silva",
    slug: "volkswagen-amarok-v6",
    title: "Volkswagen Amarok V6",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "54.000 km",
    modelYear: "2021",
    place: "Sinop - MT",
    price: "R$ 159.900,00",
    seller: "Auto Center Silva",
    slug: "nissan-frontier-le",
    title: "Nissan Frontier LE",
    transmission: "Automatica",
  },
];

export function getMarketplaceListings() {
  return listings;
}

export function getPickupListings() {
  return pickupListings;
}

export function getPickupListingBySlug(listingSlug: string) {
  return pickupListings.find((listing) => listing.slug === listingSlug);
}
