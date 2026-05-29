export type AdminMetricTone = "green" | "yellow" | "red" | "blue";

export type AdminMetric = {
  id: string;
  label: string;
  value: string;
  helper: string;
  tone: AdminMetricTone;
};

export type AdminQueueItem = {
  id: string;
  area: string;
  title: string;
  owner: string;
  status: string;
  age: string;
  priority: "alta" | "media" | "baixa";
};

export type AdminSection = {
  href: string;
  id: string;
  label: string;
  pending: number;
  summary: string;
};

export type AdminRole = {
  id: string;
  label: string;
  scope: string;
};

export type AdminUserStatus = "active" | "review" | "blocked";

export type AdminUser = {
  city: string;
  createdAt: string;
  email: string;
  id: string;
  lastAccess: string;
  name: string;
  orders: number;
  phone: string;
  role: string;
  status: AdminUserStatus;
  statusLabel: string;
  verified: boolean;
};

export type AdminListingStatus = "published" | "review" | "paused" | "rejected";

export type AdminListing = {
  city: string;
  createdAt: string;
  id: string;
  mediaCount: number;
  price: string;
  seller: string;
  status: AdminListingStatus;
  statusLabel: string;
  title: string;
  type: string;
  updatedAt: string;
};

export type AdminOrderStatus =
  | "created"
  | "paid"
  | "preparing"
  | "on_route"
  | "delivered"
  | "cancelled"
  | "refunded";

export type AdminOrder = {
  buyer: string;
  city: string;
  deliveryWindow: string;
  id: string;
  itemCount: number;
  paymentMethod: string;
  placedAt: string;
  seller: string;
  shortId: string;
  status: AdminOrderStatus;
  statusLabel: string;
  supportReason?: string;
  total: string;
};

export type AdminCategoryStatus = "active" | "review" | "hidden";

export type AdminCategory = {
  childrenCount: number;
  featured: boolean;
  icon: string;
  id: string;
  listingsCount: number;
  name: string;
  parent: string;
  sortOrder: number;
  status: AdminCategoryStatus;
  statusLabel: string;
  updatedAt: string;
};

export type AdminFinanceStatus = "pending" | "approved" | "paid" | "blocked";

export type AdminFinanceItem = {
  amount: string;
  city: string;
  createdAt: string;
  id: string;
  method: string;
  owner: string;
  reason: string;
  status: AdminFinanceStatus;
  statusLabel: string;
  type: string;
};

export type AdminModerationStatus = "queued" | "reviewing" | "approved" | "rejected";

export type AdminModerationItem = {
  age: string;
  area: string;
  id: string;
  owner: string;
  priority: "alta" | "media" | "baixa";
  reason: string;
  status: AdminModerationStatus;
  statusLabel: string;
  title: string;
};

export type AdminDashboard = {
  metrics: AdminMetric[];
  queue: AdminQueueItem[];
  roles: AdminRole[];
  sections: AdminSection[];
};
