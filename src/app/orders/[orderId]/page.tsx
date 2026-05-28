import { notFound } from "next/navigation";
import { getOrderById, getOrders } from "@/repositories/order-repository";
import { OrderDetailScreen } from "./_components/order-detail-screen";

export function generateStaticParams() {
  return getOrders().map((order) => ({
    orderId: order.id,
  }));
}

export default async function OrderDetailPage({
  params,
}: PageProps<"/orders/[orderId]">) {
  const { orderId } = await params;
  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return <OrderDetailScreen order={order} />;
}
