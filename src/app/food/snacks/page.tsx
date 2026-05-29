import { getSnackRestaurants } from "@/repositories/food-repository";
import { SnackRestaurantsScreen } from "./_components/snack-restaurants-screen";

export default function SnacksPage() {
  return <SnackRestaurantsScreen restaurants={getSnackRestaurants()} />;
}
