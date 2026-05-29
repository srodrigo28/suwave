export type WalletCoupon = {
  discount: string;
  expiresAt: string;
  id: string;
  storeName: string;
};

export type WalletMovementKind = "cashback" | "commission" | "purchase" | "recharge" | "withdrawal";

export type WalletMovement = {
  amount: string;
  createdAt: string;
  description: string;
  id: string;
  kind: WalletMovementKind;
  title: string;
  type: "in" | "out";
};

export type AffiliateRule = {
  description: string;
  id: string;
  title: string;
};

export type AffiliateWithdrawalOption = {
  description: string;
  id: "wallet" | "bank";
  label: string;
};

export type AffiliateAccount = {
  activeDays: number;
  availableCommission: string;
  code: string;
  conversionRate: string;
  invitedCount: number;
  minWithdrawal: string;
  pendingCommission: string;
  rules: AffiliateRule[];
  status: "active" | "paused";
  statusLabel: string;
  totalCommission: string;
  withdrawalOptions: AffiliateWithdrawalOption[];
};

export type WalletSummary = {
  affiliate: AffiliateAccount;
  availableBalance: string;
  cashbackBalance: string;
  commissionBalance: string;
  coupons: WalletCoupon[];
  lastUpdatedAt: string;
  movements: WalletMovement[];
};
