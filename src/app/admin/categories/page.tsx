import { getAdminCategories } from "@/repositories/admin-repository";
import { AdminCategoriesScreen } from "./_components/admin-categories-screen";

export default function AdminCategoriesPage() {
  return <AdminCategoriesScreen categories={getAdminCategories()} />;
}
