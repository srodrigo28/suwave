import type { DeliveryQuote, MobilityRoute, RideOption } from "@/models/mobility";

const localDeliveryRoute: MobilityRoute = {
  destination: {
    address: "Av. dos Jacarandas, 1440 - Setor Comercial",
    label: "Entrega",
  },
  distance: "6,8 km",
  duration: "18 min",
  origin: {
    address: "Rua das Primaveras, 220 - Centro",
    label: "Coleta",
  },
};

const deliveryQuotes: DeliveryQuote[] = [
  {
    badge: "Mais rapida",
    description: "Moto proxima, coleta prioritaria e rastreio em tempo real.",
    eta: "18-25 min",
    id: "express",
    price: "R$ 18,90",
    title: "Entrega rapida",
  },
  {
    description: "Boa para pacotes pequenos com menor taxa.",
    eta: "30-45 min",
    id: "economy",
    price: "R$ 12,90",
    title: "Economica",
  },
  {
    description: "Escolha um horario de coleta para hoje ou amanha.",
    eta: "Agendada",
    id: "scheduled",
    price: "R$ 10,90",
    title: "Agendada",
  },
];

const regionalRideRoute: MobilityRoute = {
  destination: {
    address: "Sorriso - MT",
    label: "Destino",
  },
  distance: "84 km",
  duration: "1h 12min",
  origin: {
    address: "Sinop - MT",
    label: "Origem",
  },
};

const rideOptions: RideOption[] = [
  {
    description: "Viagem mais rapida com motorista melhor avaliado.",
    id: "comfort",
    priceLabel: "R$ 200,00",
    pricePerPassenger: 200,
    seats: "Ate 4 lugares",
    title: "Carona confortavel",
  },
  {
    description: "Viagem compartilhada com passageiros compativeis.",
    id: "economy",
    priceLabel: "R$ 50,00",
    pricePerPassenger: 50,
    seats: "Ate 4 lugares",
    selected: true,
    title: "Carona economica",
  },
];

export function getLocalDeliveryRoute() {
  return localDeliveryRoute;
}

export function getDeliveryQuotes() {
  return deliveryQuotes;
}

export function getRegionalRideRoute() {
  return regionalRideRoute;
}

export function getRideOptions() {
  return rideOptions;
}
