import type { IconType } from "react-icons";

export type NotificationTone = "success" | "warning" | "info";

export type Notification = {
  actionHref?: string;
  actionLabel?: string;
  body: string;
  createdAt: string;
  icon: IconType;
  id: string;
  read: boolean;
  title: string;
  tone: NotificationTone;
};
