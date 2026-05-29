import { getAdminFinanceItems } from "@/repositories/admin-repository";
import { AdminFinanceScreen } from "./_components/admin-finance-screen";

export default function AdminFinancePage() {
  return <AdminFinanceScreen items={getAdminFinanceItems()} />;
}
