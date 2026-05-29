import { getAdminReports } from "@/repositories/admin-repository";
import { AdminReportsScreen } from "./_components/admin-reports-screen";

export default function AdminReportsPage() {
  return <AdminReportsScreen reports={getAdminReports()} />;
}
