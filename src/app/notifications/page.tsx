"use client";

import { getNotifications } from "@/repositories/notification-repository";
import { NotificationsScreen } from "./_components/notifications-screen";

export default function NotificationsPage() {
  return <NotificationsScreen notifications={getNotifications()} />;
}
