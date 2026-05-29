import type { IconType } from "react-icons";

export type NotificationTone = "affiliate" | "cashback" | "warning" | "deadline" | "promo" | "order" | "info" | "success";

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
