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

export type AdminDashboard = {
  metrics: AdminMetric[];
  queue: AdminQueueItem[];
  roles: AdminRole[];
  sections: AdminSection[];
};
