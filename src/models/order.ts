export type OrderStatus =
  | "created"
  | "paid"
  | "preparing"
  | "on_route"
  | "delivered"
  | "cancelled";

export type OrderStep = {
  description: string;
  label: string;
  status: "done" | "current" | "pending";
  time?: string;
};

export type OrderItem = {
  name: string;
  price: string;
  quantity: number;
  details?: string;
};

export type Order = {
  address: string;
  deliveryCode: string;
  deliveryFee: string;
  estimatedDelivery: string;
  id: string;
  items: OrderItem[];
  paymentMethod: string;
  placedAt: string;
  reorderHref: string;
  seller: string;
  sellerAvatar: string;
  shortId: string;
  status: OrderStatus;
  statusLabel: string;
  subtotal: string;
  supportReason?: string;
  supportHref: string;
  total: string;
  trackingSteps: OrderStep[];
};
