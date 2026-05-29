import { FaCut, FaHardHat } from "react-icons/fa";
import type { LocalServiceKind } from "@/models/local-service";

export function ServiceIcon({ kind }: { kind: LocalServiceKind }) {
  const Icon = kind === "beauty" ? FaCut : FaHardHat;
  return <Icon aria-hidden="true" />;
}
