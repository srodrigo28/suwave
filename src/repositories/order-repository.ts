import type { Order } from "@/models/order";

const orders: Order[] = [
  {
    address: "Rua das Orquideas, 742 - Centro, Sinop - MT",
    deliveryCode: "8391",
    deliveryFee: "R$ 7,90",
    estimatedDelivery: "Hoje, 19:35 - 19:50",
    id: "pedido-lanche-salamanca-8391",
    items: [
      {
        details: "Smash duplo, batata frita, maionese da casa e Coca-Cola lata",
        name: "Combo Salamanca Smash",
        price: "R$ 49,90",
        quantity: 1,
      },
      {
        details: "Adicional selecionado",
        name: "Molho barbecue",
        price: "R$ 3,00",
        quantity: 1,
      },
    ],
    paymentMethod: "Pix aprovado",
    placedAt: "Hoje, 18:58",
    reorderHref: "/search?reorder=pedido-lanche-salamanca-8391",
    seller: "Hamburgueria Salamanca Ca'dore",
    sellerAvatar: "SC",
    shortId: "#8391",
    status: "on_route",
    statusLabel: "Saiu para entrega",
    subtotal: "R$ 52,90",
    supportHref: "/help?order=pedido-lanche-salamanca-8391",
    total: "R$ 60,80",
    trackingSteps: [
      {
        description: "Recebemos seu pedido e enviamos para a loja.",
        label: "Pedido criado",
        status: "done",
        time: "18:58",
      },
      {
        description: "Pagamento confirmado por Pix.",
        label: "Pagamento aprovado",
        status: "done",
        time: "18:59",
      },
      {
        description: "A loja preparou seu lanche.",
        label: "Pedido preparado",
        status: "done",
        time: "19:18",
      },
      {
        description: "Entrega em andamento para o endereço confirmado.",
        label: "Em rota",
        status: "current",
        time: "19:24",
      },
      {
        description: "Confirme o recebimento usando o codigo de entrega.",
        label: "Entregue",
        status: "pending",
      },
    ],
  },
  {
    address: "Rua das Orquideas, 742 - Centro, Sinop - MT",
    deliveryCode: "4926",
    deliveryFee: "Gratis",
    estimatedDelivery: "Entregue ontem, 16:12",
    id: "pedido-tenis-sport-style-4926",
    items: [
      {
        details: "Cor preto, tamanho 41",
        name: "Tenis Nike Air Max",
        price: "R$ 389,90",
        quantity: 1,
      },
    ],
    paymentMethod: "Cartao final 2048",
    placedAt: "Ontem, 14:42",
    reorderHref: "/search?reorder=pedido-tenis-sport-style-4926",
    seller: "Loja Sport Style",
    sellerAvatar: "SS",
    shortId: "#4926",
    status: "delivered",
    statusLabel: "Entregue",
    subtotal: "R$ 389,90",
    supportHref: "/help?order=pedido-tenis-sport-style-4926",
    total: "R$ 389,90",
    trackingSteps: [
      {
        description: "Pedido enviado para a loja.",
        label: "Pedido criado",
        status: "done",
        time: "14:42",
      },
      {
        description: "Pagamento aprovado no cartao.",
        label: "Pagamento aprovado",
        status: "done",
        time: "14:43",
      },
      {
        description: "Produto separado no estoque.",
        label: "Pedido preparado",
        status: "done",
        time: "15:20",
      },
      {
        description: "Entregador saiu para entrega.",
        label: "Em rota",
        status: "done",
        time: "15:45",
      },
      {
        description: "Pedido entregue ao cliente.",
        label: "Entregue",
        status: "done",
        time: "16:12",
      },
    ],
  },
  {
    address: "Rua das Orquideas, 742 - Centro, Sinop - MT",
    deliveryCode: "1742",
    deliveryFee: "R$ 5,90",
    estimatedDelivery: "Hoje, 12:20 - 12:45",
    id: "pedido-mercado-bino-1742",
    items: [
      {
        details: "Arroz, feijao, leite, cafe e itens de limpeza",
        name: "Compra de mercado",
        price: "R$ 142,30",
        quantity: 1,
      },
    ],
    paymentMethod: "Pix aprovado",
    placedAt: "Hoje, 11:05",
    reorderHref: "/search?reorder=pedido-mercado-bino-1742",
    seller: "Supermercado Bino",
    sellerAvatar: "SB",
    shortId: "#1742",
    status: "preparing",
    statusLabel: "Separando produtos",
    subtotal: "R$ 142,30",
    supportHref: "/help?order=pedido-mercado-bino-1742",
    total: "R$ 148,20",
    trackingSteps: [
      {
        description: "Recebemos sua compra.",
        label: "Pedido criado",
        status: "done",
        time: "11:05",
      },
      {
        description: "Pagamento confirmado por Pix.",
        label: "Pagamento aprovado",
        status: "done",
        time: "11:06",
      },
      {
        description: "A loja esta montando sua compra.",
        label: "Separando produtos",
        status: "current",
        time: "11:18",
      },
      {
        description: "Entrega ainda nao iniciada.",
        label: "Em rota",
        status: "pending",
      },
      {
        description: "Aguardando finalizacao.",
        label: "Entregue",
        status: "pending",
      },
    ],
  },
];

export function getOrders() {
  return orders;
}

export function getOrderById(orderId: string) {
  return orders.find((order) => order.id === orderId);
}
