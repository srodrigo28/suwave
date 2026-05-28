import type { LocationCity } from "@/models/location";

const cities: LocationCity[] = [
  {
    coverage: "full",
    deliveryEta: "25-45 min",
    highlights: ["Mercado", "Comida", "Entregas", "Servicos"],
    id: "sinop-mt",
    name: "Sinop",
    region: "Norte de Mato Grosso",
    sellers: 128,
    services: 46,
    state: "MT",
    transport: "Entregadores ativos agora",
  },
  {
    coverage: "partial",
    deliveryEta: "40-70 min",
    highlights: ["Mercado", "Servicos", "Fretes"],
    id: "claudia-mt",
    name: "Claudia",
    region: "Norte de Mato Grosso",
    sellers: 34,
    services: 18,
    state: "MT",
    transport: "Cobertura por janelas de entrega",
  },
  {
    coverage: "full",
    deliveryEta: "30-55 min",
    highlights: ["Comida", "Empregos", "Veiculos", "Entregas"],
    id: "sorriso-mt",
    name: "Sorriso",
    region: "Medio-Norte",
    sellers: 92,
    services: 31,
    state: "MT",
    transport: "Rotas urbanas e intermunicipais",
  },
  {
    coverage: "full",
    deliveryEta: "35-60 min",
    highlights: ["Mercado", "Fretes", "Empregos"],
    id: "lucas-rio-verde-mt",
    name: "Lucas do Rio Verde",
    region: "Medio-Norte",
    sellers: 76,
    services: 29,
    state: "MT",
    transport: "Rotas urbanas com motoristas parceiros",
  },
  {
    coverage: "partial",
    deliveryEta: "50-80 min",
    highlights: ["Servicos", "Veiculos", "Fretes"],
    id: "mutum-mt",
    name: "Mutum",
    region: "Medio-Norte",
    sellers: 41,
    services: 22,
    state: "MT",
    transport: "Fretes programados e entregas locais",
  },
  {
    coverage: "limited",
    deliveryEta: "Sob consulta",
    highlights: ["Servicos", "Fretes"],
    id: "uniao-sul-mt",
    name: "Uniao do Sul",
    region: "Norte de Mato Grosso",
    sellers: 16,
    services: 9,
    state: "MT",
    transport: "Cobertura em expansao",
  },
];

export function getLocationCities() {
  return cities;
}

export function getDefaultLocationCity() {
  return cities[0];
}
