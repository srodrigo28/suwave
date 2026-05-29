import { getWalletSummary } from "@/repositories/finance-repository";
import { WalletScreen } from "./_components/wallet-screen";

export default function WalletPage() {
  return <WalletScreen wallet={getWalletSummary()} />;
}
