import type { IconType } from "react-icons";
import type { Listing } from "@/models/listing";

export type SearchCategory = {
  icon: IconType;
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
