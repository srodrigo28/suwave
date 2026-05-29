import type { WalletSummary } from "@/models/finance";

const walletSummary: WalletSummary = {
  affiliate: {
    activeDays: 42,
    availableCommission: "R$ 84,70",
    availableCommissionCents: 8470,
    code: "SUWAVE-MARIA10",
    conversionRate: "12%",
    invitedCount: 18,
    minWithdrawal: "R$ 20,00",
    minWithdrawalCents: 2000,
    pendingCommission: "R$ 36,40",
    status: "active",
    statusLabel: "Ativo",
    totalCommission: "R$ 241,90",
    withdrawalOptions: [
      {
        description: "Move a comissao para o saldo interno e libera uso em compras no app.",
        id: "wallet",
        label: "Carregar saldo na conta SUWAVE",
      },
      {
        description: "Cria solicitacao para conferencia financeira antes da transferencia.",
        id: "bank",
        label: "Transferir para conta bancaria",
      },
    ],
    rules: [
      {
        description: "Ganha comissao quando uma compra paga nasce do seu link ou codigo.",
        id: "earned",
        title: "Ganha comissao sobre",
      },
      {
        description: "Nao recebe comissao em compra cancelada, estornada ou feita por voce.",
        id: "not-earned",
        title: "Nao ganha comissao sobre",
      },
      {
        description: "O afiliado fica ativo enquanto gerar cliques, leads ou vendas no periodo.",
        id: "activity",
        title: "Regra de atividade",
      },
      {
        description: "Produtos podem ter acesso aberto, por aprovacao ou fechado pelo vendedor.",
        id: "product-access",
        title: "Afiliado de produto",
      },
    ],
  },
  availableBalance: "R$ 100,00",
  cashbackBalance: "R$ 23,30",
  commissionBalance: "R$ 84,70",
  coupons: [
    {
      discount: "Ate R$ 50,00",
      expiresAt: "15/06/2026",
      id: "cupom-burger-king",
      storeName: "Burger King",
    },
    {
      discount: "Ate R$ 100,00",
      expiresAt: "30/06/2026",
      id: "cupom-martinello",
      storeName: "Martinello",
    },
  ],
  lastUpdatedAt: "08/06/2026 as 16:30",
  movements: [
    {
      amount: "+ R$ 50,00",
      createdAt: "01/06/2026 - 10:30",
      description: "Saldo carregado pelo usuario",
      id: "mov-recarga-junho",
      kind: "recharge",
      title: "Recarga de saldo",
      type: "in",
    },
    {
      amount: "+ R$ 18,90",
      createdAt: "02/06/2026 - 14:20",
      description: "Comissao registrada como AF",
      id: "mov-afiliado-mercado",
      kind: "commission",
      title: "Afiliado - Mercado Local",
      type: "in",
    },
    {
      amount: "- R$ 56,50",
      createdAt: "05/06/2026 - 18:40",
      description: "Compra finalizada com saldo SUWAVE",
      id: "mov-compra-tenis",
      kind: "purchase",
      title: "Compra - Loja Esportiva",
      type: "out",
    },
    {
      amount: "+ R$ 2,10",
      createdAt: "07/06/2026 - 12:05",
      description: "Cashback creditado automaticamente",
      id: "mov-cashback-farmacia",
      kind: "cashback",
      title: "Cashback - Farmacia",
      type: "in",
    },
    {
      amount: "- R$ 20,00",
      createdAt: "08/06/2026 - 16:30",
      description: "Solicitacao de saque para conta bancaria",
      id: "mov-saque-afiliado",
      kind: "withdrawal",
      title: "Saque de afiliado",
      type: "out",
    },
  ],
};

export function getWalletSummary() {
  return walletSummary;
}

export function getWalletMovements(type?: "in" | "out") {
  if (!type) {
    return walletSummary.movements;
  }

  return walletSummary.movements.filter((movement) => movement.type === type);
}

export function getAffiliateAccount() {
  return walletSummary.affiliate;
}
