import { getAdminUsers } from "@/repositories/admin-repository";
import { AdminUsersScreen } from "./_components/admin-users-screen";

export default function AdminUsersPage() {
  return <AdminUsersScreen users={getAdminUsers()} />;
}
