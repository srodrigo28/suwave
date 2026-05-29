import type { FoodCartSummary, FoodCombo, Restaurant } from "@/models/food";

const restaurants: Restaurant[] = [
  {
    badges: ["Mais pedido", "Cupom"],
    deliveryFee: "Gratis",
    deliveryTime: "35-45 min",
    id: "hamburgueria-salamanca-cadore",
    name: "Hamburgueria Salamanca Ca'dore",
    rating: "4,9",
    selected: true,
  },
  {
    badges: ["So no SUWAVE", "Cashback"],
    deliveryFee: "R$ 4,90",
    deliveryTime: "25-35 min",
    id: "brasa-burger",
    name: "Brasa Burger",
    rating: "4,8",
  },
  {
    badges: ["Exclusivo Clube"],
    deliveryFee: "R$ 6,90",
    deliveryTime: "40-50 min",
    id: "lanche-do-centro",
    name: "Lanche do Centro",
    rating: "4,7",
  },
];

const salamancaCombo: FoodCombo = {
  basePrice: 49.9,
  description: "Combo com smash burger, batata frita, molho da casa e bebida.",
  id: "combo-salamanca-smash",
  oldPrice: "R$ 64,90",
  price: "R$ 49,90",
  restaurantId: "hamburgueria-salamanca-cadore",
  title: "Combo Salamanca Smash",
  optionGroups: [
    {
      id: "smash",
      title: "Escolha seu smash",
      items: [
        { description: "Pao brioche, blend 120g e queijo.", id: "classic", name: "Smash classico", priceDelta: 0, priceLabel: "Incluido", selected: true },
        { description: "Blend duplo, cheddar e cebola caramelizada.", id: "double", name: "Smash duplo", priceDelta: 8, priceLabel: "+ R$ 8,00" },
      ],
    },
    {
      id: "fries",
      title: "Batata frita",
      items: [
        { description: "Porcao individual crocante.", id: "small", name: "Batata pequena", priceDelta: 0, priceLabel: "Incluido", selected: true },
        { description: "Porcao grande para compartilhar.", id: "large", name: "Batata grande", priceDelta: 6, priceLabel: "+ R$ 6,00" },
      ],
    },
    {
      id: "sauces",
      title: "Molhos adicionais",
      items: [
        { description: "Molho verde da casa.", id: "green", name: "Molho verde", priceDelta: 2, priceLabel: "+ R$ 2,00", selected: true },
        { description: "Barbecue defumado.", id: "bbq", name: "Barbecue", priceDelta: 2, priceLabel: "+ R$ 2,00" },
      ],
    },
    {
      id: "drinks",
      title: "Bebidas",
      items: [
        { description: "Lata 350ml.", id: "cola", name: "Refrigerante", priceDelta: 0, priceLabel: "Incluido", selected: true },
        { description: "Suco natural 300ml.", id: "juice", name: "Suco natural", priceDelta: 4, priceLabel: "+ R$ 4,00" },
      ],
    },
  ],
};

export function getSnackRestaurants() {
  return restaurants;
}

export function getRestaurantById(restaurantId: string) {
  return restaurants.find((restaurant) => restaurant.id === restaurantId);
}

export function getSalamancaCombo() {
  return salamancaCombo;
}

export function getFoodCartSummary(): FoodCartSummary {
  return {
    discount: "R$ 0,00",
    fee: "R$ 7,90",
    subtotal: "R$ 52,90",
    total: "R$ 60,80",
  };
}
