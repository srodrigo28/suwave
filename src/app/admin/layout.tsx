import type { ReactNode } from "react";
import { AdminAuthGate } from "./_components/admin-auth-gate";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}
