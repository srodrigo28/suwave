import { getAdminOrders } from "@/repositories/admin-repository";
import { AdminOrdersScreen } from "./_components/admin-orders-screen";

export default function AdminOrdersPage() {
  return <AdminOrdersScreen orders={getAdminOrders()} />;
}
