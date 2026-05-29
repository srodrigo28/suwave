import { notFound } from "next/navigation";
import {
  getRestaurantById,
  getSalamancaCombo,
  getSnackRestaurants,
} from "@/repositories/food-repository";
import { RestaurantMenuScreen } from "./_components/restaurant-menu-screen";

export function generateStaticParams() {
  return getSnackRestaurants().map((restaurant) => ({
    restaurantId: restaurant.id,
  }));
}

export default async function RestaurantMenuPage({
  params,
}: PageProps<"/food/snacks/[restaurantId]">) {
  const { restaurantId } = await params;
  const restaurant = getRestaurantById(restaurantId);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantMenuScreen combo={getSalamancaCombo()} restaurant={restaurant} />;
}
