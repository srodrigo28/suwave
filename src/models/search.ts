import type { Listing } from "@/models/listing";

export type SearchCategory = {
  iconKey: "briefcase" | "car" | "food" | "home" | "market" | "services" | "truck";
  id: string;
  label: string;
  query: string;
};

export type SearchSuggestion = {
  id: string;
  label: string;
  query: string;
};

export type SearchResult = Listing & {
  kind: "produto" | "servico" | "loja" | "veiculo" | "imovel";
  href?: string;
};
