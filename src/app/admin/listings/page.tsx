import { getAdminListings } from "@/repositories/admin-repository";
import { AdminListingsScreen } from "./_components/admin-listings-screen";

export default function AdminListingsPage() {
  return <AdminListingsScreen listings={getAdminListings()} />;
}
