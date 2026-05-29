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
  availableCommissionCents?: number;
  code: string;
  conversionRate: string;
  invitedCount: number;
  minWithdrawal: string;
  minWithdrawalCents?: number;
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

export type WithdrawalRequest = {
  amountCents: number;
  destination: "wallet" | "bank";
};

export type WithdrawalResult = {
  amountCents: number;
  destination: "wallet" | "bank";
  id: string;
  status: string;
};
