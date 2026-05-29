export type FoodChoice = {
  description: string;
  id: string;
  name: string;
  priceDelta: number;
  priceLabel: string;
  selected?: boolean;
};

export type FoodOptionGroup = {
  id: string;
  items: FoodChoice[];
  title: string;
};

export type Restaurant = {
  badges: string[];
  deliveryFee: string;
  deliveryTime: string;
  id: string;
  name: string;
  rating: string;
  selected?: boolean;
};

export type FoodCombo = {
  basePrice: number;
  description: string;
  id: string;
  oldPrice: string;
  optionGroups: FoodOptionGroup[];
  price: string;
  restaurantId: string;
  title: string;
};

export type FoodCartSummary = {
  discount: string;
  fee: string;
  subtotal: string;
  total: string;
};
