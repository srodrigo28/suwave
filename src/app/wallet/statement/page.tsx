import { getWalletSummary } from "@/repositories/finance-repository";
import { StatementScreen } from "../_components/statement-screen";

export default function StatementPage() {
  return <StatementScreen wallet={getWalletSummary()} />;
}
