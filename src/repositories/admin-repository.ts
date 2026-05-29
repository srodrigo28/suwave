import type { AdminDashboard } from "@/models/admin";

const dashboard: AdminDashboard = {
  metrics: [
    {
      helper: "Contas novas, perfis e documentos",
      id: "users",
      label: "Usuarios",
      tone: "blue",
      value: "1.248",
    },
    {
      helper: "Produtos, servicos, vagas e imoveis",
      id: "listings",
      label: "Anuncios ativos",
      tone: "green",
      value: "386",
    },
    {
      helper: "Compras, entregas e suporte",
      id: "orders",
      label: "Pedidos abertos",
      tone: "yellow",
      value: "42",
    },
    {
      helper: "Conteudo aguardando decisao",
      id: "moderation",
      label: "Moderacao",
      tone: "red",
      value: "17",
    },
  ],
  queue: [
    {
      age: "12 min",
      area: "Anuncios",
      id: "fila-produto-fone",
      owner: "Tech Center Sinop",
      priority: "alta",
      status: "Revisar imagens",
      title: "Smartphone preto 256 GB",
    },
    {
      age: "28 min",
      area: "Financeiro",
      id: "fila-saque-afiliado",
      owner: "Maria Oliveira",
      priority: "alta",
      status: "Validar saque",
      title: "Saque afiliado R$ 84,70",
    },
    {
      age: "1 h",
      area: "Eventos",
      id: "fila-evento-privado",
      owner: "Studio Thais Lemos",
      priority: "media",
      status: "Aprovar divulgacao",
      title: "Workshop privado de beleza",
    },
    {
      age: "3 h",
      area: "Suporte",
      id: "fila-pedido-entrega",
      owner: "Pedido #8391",
      priority: "baixa",
      status: "Aguardar retorno",
      title: "Entrega em rota atrasada",
    },
  ],
  roles: [
    { id: "super-admin", label: "Super admin", scope: "Acesso total e permissoes" },
    { id: "operador", label: "Operador", scope: "Usuarios, anuncios e pedidos" },
    { id: "financeiro", label: "Financeiro", scope: "Carteira, afiliados e saques" },
    { id: "moderador", label: "Moderador", scope: "Conteudo, eventos e suporte" },
    { id: "vendedor", label: "Vendedor", scope: "Loja, anuncios e pedidos proprios" },
  ],
  sections: [
    {
      href: "/admin?view=users",
      id: "users",
      label: "Usuarios",
      pending: 8,
      summary: "Cadastro, perfil, documentos e bloqueios",
    },
    {
      href: "/admin?view=categories",
      id: "categories",
      label: "Categorias",
      pending: 3,
      summary: "Arvore, icones, destaque e ordenacao",
    },
    {
      href: "/admin?view=listings",
      id: "listings",
      label: "Produtos e anuncios",
      pending: 17,
      summary: "Aprovacao, midias, preco e vendedor",
    },
    {
      href: "/admin?view=orders",
      id: "orders",
      label: "Pedidos",
      pending: 11,
      summary: "Pagamento, entrega, cancelamento e suporte",
    },
    {
      href: "/admin?view=finance",
      id: "finance",
      label: "Financeiro",
      pending: 5,
      summary: "Carteira, cashback, afiliados e saques",
    },
    {
      href: "/admin?view=moderation",
      id: "moderation",
      label: "Moderacao",
      pending: 17,
      summary: "Conteudo, eventos, denuncia e revisao",
    },
    {
      href: "/admin?view=support",
      id: "support",
      label: "Suporte",
      pending: 9,
      summary: "Tickets, pedidos, usuarios e SLA",
    },
    {
      href: "/admin?view=reports",
      id: "reports",
      label: "Relatorios",
      pending: 2,
      summary: "Vendas, crescimento, operacao e logs",
    },
  ],
};

export function getAdminDashboard() {
  return dashboard;
}
