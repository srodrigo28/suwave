export type DeliveryQuote = {
  badge?: string;
  description: string;
  eta: string;
  id: string;
  price: string;
  title: string;
};

export type RideOption = {
  description: string;
  id: string;
  pricePerPassenger: number;
  priceLabel: string;
  seats: string;
  selected?: boolean;
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
