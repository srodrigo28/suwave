import type {
  AffiliateAccount,
  AffiliateRule,
  AffiliateWithdrawalOption,
  WalletCoupon,
  WalletMovement,
  WalletSummary,
  WithdrawalRequest,
  WithdrawalResult,
} from "@/models/finance";
import { getSavedAccessToken } from "@/services/auth-client";

type ApiEnvelope<T> = {
  data: T;
  message: string;
};

type ApiWalletCoupon = {
  discount: string;
  expires_at: string;
  id: string;
  store_name: string;
};

type ApiWalletMovement = {
  amount: string;
  created_at: string;
  description: string;
  id: string;
  kind: WalletMovement["kind"];
  title: string;
  type: WalletMovement["type"];
};

type ApiAffiliateRule = {
  description: string;
  id: string;
  title: string;
};

type ApiAffiliateWithdrawalOption = {
  description: string;
  id: AffiliateWithdrawalOption["id"];
  label: string;
};

type ApiAffiliate = {
  active_days: number;
  available_commission: string;
  available_commission_cents?: number;
  code: string;
  conversion_rate: string;
  invited_count: number;
  min_withdrawal: string;
  min_withdrawal_cents?: number;
  pending_commission: string;
  rules: ApiAffiliateRule[];
  status: AffiliateAccount["status"];
  status_label: string;
  total_commission: string;
  withdrawal_options: ApiAffiliateWithdrawalOption[];
};

type ApiWallet = {
  affiliate: ApiAffiliate;
  available_balance: string;
  cashback_balance: string;
  commission_balance: string;
  coupons: ApiWalletCoupon[];
  last_updated_at: string;
  movements: ApiWalletMovement[];
};

type ApiWithdrawal = {
  amount_cents: number;
  destination: WithdrawalResult["destination"];
  id: string;
  status: string;
};

function toCoupon(coupon: ApiWalletCoupon): WalletCoupon {
  return {
    discount: coupon.discount,
    expiresAt: coupon.expires_at,
    id: coupon.id,
    storeName: coupon.store_name,
  };
}

function toMovement(movement: ApiWalletMovement): WalletMovement {
  return {
    amount: movement.amount,
    createdAt: movement.created_at,
    description: movement.description,
    id: movement.id,
    kind: movement.kind,
    title: movement.title,
    type: movement.type,
  };
}

function toRule(rule: ApiAffiliateRule): AffiliateRule {
  return {
    description: rule.description,
    id: rule.id,
    title: rule.title,
  };
}

function toWithdrawalOption(option: ApiAffiliateWithdrawalOption): AffiliateWithdrawalOption {
  return {
    description: option.description,
    id: option.id,
    label: option.label,
  };
}

function toAffiliate(affiliate: ApiAffiliate): AffiliateAccount {
  return {
    activeDays: affiliate.active_days,
    availableCommission: affiliate.available_commission,
    availableCommissionCents: affiliate.available_commission_cents,
    code: affiliate.code,
    conversionRate: affiliate.conversion_rate,
    invitedCount: affiliate.invited_count,
    minWithdrawal: affiliate.min_withdrawal,
    minWithdrawalCents: affiliate.min_withdrawal_cents,
    pendingCommission: affiliate.pending_commission,
    rules: affiliate.rules.map(toRule),
    status: affiliate.status,
    statusLabel: affiliate.status_label,
    totalCommission: affiliate.total_commission,
    withdrawalOptions: affiliate.withdrawal_options.map(toWithdrawalOption),
  };
}

function toWallet(wallet: ApiWallet): WalletSummary {
  return {
    affiliate: toAffiliate(wallet.affiliate),
    availableBalance: wallet.available_balance,
    cashbackBalance: wallet.cashback_balance,
    commissionBalance: wallet.commission_balance,
    coupons: wallet.coupons.map(toCoupon),
    lastUpdatedAt: wallet.last_updated_at,
    movements: wallet.movements.map(toMovement),
  };
}

async function financeRequest<T>(path: string, init?: RequestInit) {
  const token = getSavedAccessToken();

  if (!token) {
    throw new Error("Entre para carregar seus dados financeiros.");
  }

  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.message ?? "Nao foi possivel carregar o financeiro agora.");
  }

  return body as ApiEnvelope<T>;
}

export async function fetchWalletSummary() {
  const body = await financeRequest<ApiWallet>("/api/finance/wallet");
  return toWallet(body.data);
}

export async function fetchWalletMovements(type?: "in" | "out") {
  const query = type ? `?type=${type}` : "";
  const body = await financeRequest<ApiWalletMovement[]>(`/api/finance/wallet/movements${query}`);
  return body.data.map(toMovement);
}

export async function fetchAffiliateAccount() {
  const body = await financeRequest<ApiAffiliate>("/api/finance/affiliate");
  return toAffiliate(body.data);
}

export async function requestAffiliateWithdrawal(input: WithdrawalRequest) {
  const body = await financeRequest<ApiWithdrawal>("/api/finance/affiliate/withdrawals", {
    body: JSON.stringify({
      amount_cents: input.amountCents,
      destination: input.destination,
    }),
    method: "POST",
  });

  return {
    amountCents: body.data.amount_cents,
    destination: body.data.destination,
    id: body.data.id,
    status: body.data.status,
  };
}
