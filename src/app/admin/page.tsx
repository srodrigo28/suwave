import { getAdminDashboard } from "@/repositories/admin-repository";
import { AdminDashboardScreen } from "./_components/admin-dashboard-screen";

export default function AdminPage() {
  return <AdminDashboardScreen dashboard={getAdminDashboard()} />;
}
