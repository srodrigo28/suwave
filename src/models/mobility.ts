export type DeliveryQuote = {
  badge?: string;
  description: string;
  driver: MobilityDriver;
  eta: string;
  id: string;
  price: string;
  status: string;
  steps: MobilityStatusStep[];
  title: string;
};

export type MobilityDriver = {
  eta: string;
  name: string;
  rating: string;
  vehicle: string;
};

export type MobilityStatusStep = {
  done?: boolean;
  label: string;
  time: string;
};

export type RideOption = {
  description: string;
  driver: MobilityDriver;
  id: string;
  pricePerPassenger: number;
  priceLabel: string;
  seats: string;
  selected?: boolean;
  status: string;
  steps: MobilityStatusStep[];
  title: string;
};

export type RouteStop = {
  address: string;
  label: string;
};

export type MobilityRoute = {
  destination: RouteStop;
  distance: string;
  duration: string;
  origin: RouteStop;
};
