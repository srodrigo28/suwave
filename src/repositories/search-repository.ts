import type {
  SearchCategory,
  SearchResult,
  SearchSuggestion,
} from "@/models/search";
import { getMarketplaceListings, getPickupListings } from "@/repositories/listing-repository";

const serviceResults: SearchResult[] = [
  {
    badge: "Servico",
    href: "/listings",
    image: "/marketplace/pizza-promo.png",
    imageKind: "pizza",
    kind: "servico",
    place: "Sinop - MT",
    price: "Orcamento rapido",
    seller: "Rede de prestadores",
    title: "Entregador parceiro disponivel",
  },
  {
    badge: "Loja",
    href: "/jobs/companies",
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    kind: "loja",
    place: "Centro",
    price: "Aberto agora",
    seller: "Comercio local",
    title: "Lojas e empresas perto de voce",
  },
];

const categories: SearchCategory[] = [
  { iconKey: "market", id: "mercado", label: "Mercado", query: "mercado" },
  { iconKey: "food", id: "comida", label: "Comida", query: "pizza" },
  { iconKey: "car", id: "veiculos", label: "Veiculos", query: "ford" },
  { iconKey: "home", id: "imoveis", label: "Imoveis", query: "casa" },
  { iconKey: "services", id: "servicos", label: "Servicos", query: "entregador" },
  { iconKey: "briefcase", id: "empregos", label: "Empregos", query: "empresa" },
  { iconKey: "truck", id: "fretes", label: "Fretes", query: "entrega" },
];

const suggestions: SearchSuggestion[] = [
  { id: "pizza", label: "Pizza com entrega", query: "pizza" },
  { id: "smartphone", label: "Smartphone 256 GB", query: "smartphone" },
  { id: "casa", label: "Casa em Sinop", query: "casa" },
  { id: "caminhonete", label: "Caminhonete diesel", query: "diesel" },
  { id: "servico", label: "Prestador perto de mim", query: "prestador" },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function baseResults(): SearchResult[] {
  const marketplaceResults: SearchResult[] = getMarketplaceListings().map((listing) => ({
    ...listing,
    href: "/listings",
    kind: listing.imageKind === "house" ? "imovel" : "produto",
  }));

  const pickupResults: SearchResult[] = getPickupListings().slice(0, 3).map((listing) => ({
    ...listing,
    href: listing.slug ? `/listings/vehicles/pickups/${listing.slug}` : "/listings/vehicles/pickups",
    image: listing.image || "/marketplace/phone-pair.png",
    kind: "veiculo",
  }));

  return [...marketplaceResults, ...pickupResults, ...serviceResults];
}

export function getSearchCategories() {
  return categories;
}

export function getSearchSuggestions() {
  return suggestions;
}

export function getRecommendedSearchResults() {
  return baseResults().slice(0, 6);
}

export function searchGlobalResults(query: string) {
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) {
    return getRecommendedSearchResults();
  }

  return baseResults().filter((result) => {
    const haystack = normalize(
      [
        result.title,
        result.price,
        result.place,
        result.category,
        result.seller,
        result.badge,
        result.fuel,
        result.modelYear,
        result.kind,
      ]
        .filter(Boolean)
        .join(" "),
    );

    return haystack.includes(normalizedQuery);
  });
}
