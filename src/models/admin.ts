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

export type AdminDashboard = {
  metrics: AdminMetric[];
  queue: AdminQueueItem[];
  roles: AdminRole[];
  sections: AdminSection[];
};
