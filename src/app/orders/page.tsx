import { getOrders } from "@/repositories/order-repository";
import { OrdersScreen } from "./_components/orders-screen";

export default function OrdersPage() {
  return <OrdersScreen orders={getOrders()} />;
}
