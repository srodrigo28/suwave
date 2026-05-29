import { getAdminSupportTickets } from "@/repositories/admin-repository";
import { AdminSupportScreen } from "./_components/admin-support-screen";

export default function AdminSupportPage() {
  return <AdminSupportScreen tickets={getAdminSupportTickets()} />;
}
