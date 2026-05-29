import { getAdminModerationItems } from "@/repositories/admin-repository";
import { AdminModerationScreen } from "./_components/admin-moderation-screen";

export default function AdminModerationPage() {
  return <AdminModerationScreen items={getAdminModerationItems()} />;
}
