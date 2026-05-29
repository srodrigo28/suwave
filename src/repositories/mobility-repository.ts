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
    driver: {
      eta: "7 min ate a coleta",
      name: "Rafael Souza",
      rating: "4,9",
      vehicle: "Honda CG 160 - SUW4E21",
    },
    eta: "18-25 min",
    id: "express",
    price: "R$ 18,90",
    status: "Entregador a caminho da coleta",
    steps: [
      { done: true, label: "Frete calculado", time: "agora" },
      { done: true, label: "Entregador vinculado", time: "1 min" },
      { label: "Coleta", time: "7 min" },
      { label: "Entrega", time: "18-25 min" },
    ],
    title: "Entrega rapida",
  },
  {
    description: "Boa para pacotes pequenos com menor taxa.",
    driver: {
      eta: "14 min ate a coleta",
      name: "Bruno Lima",
      rating: "4,8",
      vehicle: "Yamaha Factor - ECO7A10",
    },
    eta: "30-45 min",
    id: "economy",
    price: "R$ 12,90",
    status: "Aguardando aceite do entregador",
    steps: [
      { done: true, label: "Frete calculado", time: "agora" },
      { label: "Entregador vinculado", time: "ate 8 min" },
      { label: "Coleta", time: "ate 18 min" },
      { label: "Entrega", time: "30-45 min" },
    ],
    title: "Economica",
  },
  {
    description: "Escolha um horario de coleta para hoje ou amanha.",
    driver: {
      eta: "janela escolhida",
      name: "Equipe agendada",
      rating: "4,9",
      vehicle: "Moto ou utilitario",
    },
    eta: "Agendada",
    id: "scheduled",
    price: "R$ 10,90",
    status: "Pronto para agendar coleta",
    steps: [
      { done: true, label: "Frete calculado", time: "agora" },
      { label: "Confirmar horario", time: "pendente" },
      { label: "Coleta", time: "agendada" },
      { label: "Entrega", time: "apos coleta" },
    ],
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
    driver: {
      eta: "12 min ate o embarque",
      name: "Marcos Andrade",
      rating: "4,9",
      vehicle: "Toyota Corolla - CAR4N22",
    },
    id: "comfort",
    priceLabel: "R$ 200,00",
    pricePerPassenger: 200,
    seats: "Ate 4 lugares",
    status: "Motorista confortavel disponivel",
    steps: [
      { done: true, label: "Rota calculada", time: "agora" },
      { done: true, label: "Motorista encontrado", time: "2 min" },
      { label: "Embarque", time: "12 min" },
      { label: "Chegada", time: "1h 12min" },
    ],
    title: "Carona confortavel",
  },
  {
    description: "Viagem compartilhada com passageiros compativeis.",
    driver: {
      eta: "18 min ate o ponto",
      name: "Camila Rocha",
      rating: "4,8",
      vehicle: "Chevrolet Spin - ECO5M40",
    },
    id: "economy",
    priceLabel: "R$ 50,00",
    pricePerPassenger: 50,
    seats: "Ate 4 lugares",
    selected: true,
    status: "Agrupando passageiros compativeis",
    steps: [
      { done: true, label: "Rota calculada", time: "agora" },
      { done: true, label: "Motorista encontrado", time: "3 min" },
      { label: "Confirmar passageiros", time: "ate 8 min" },
      { label: "Embarque", time: "18 min" },
    ],
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
