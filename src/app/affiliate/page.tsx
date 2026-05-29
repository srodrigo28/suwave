import { getAffiliateAccount } from "@/repositories/finance-repository";
import { AffiliateScreen } from "./_components/affiliate-screen";

export default function AffiliatePage() {
  return <AffiliateScreen affiliate={getAffiliateAccount()} />;
}
