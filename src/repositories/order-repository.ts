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
    address: "Retirada combinada com o vendedor - Sinop - MT",
    deliveryCode: "0000",
    deliveryFee: "R$ 0,00",
    estimatedDelivery: "Cancelado em 24/05",
    id: "pedido-fone-tech-center-1184",
    items: [
      {
        details: "Bluetooth, preto, garantia de 90 dias",
        name: "Fone JBL Tune 510BT",
        price: "R$ 219,90",
        quantity: 1,
      },
    ],
    paymentMethod: "Pix estornado",
    placedAt: "24/05, 10:16",
    reorderHref: "/search?reorder=pedido-fone-tech-center-1184",
    seller: "Tech Center Sinop",
    sellerAvatar: "TC",
    shortId: "#1184",
    status: "cancelled",
    statusLabel: "Cancelado",
    subtotal: "R$ 219,90",
    supportHref: "/help?order=pedido-fone-tech-center-1184",
    supportReason: "Produto ficou indisponivel antes da retirada.",
    total: "R$ 219,90",
    trackingSteps: [
      {
        description: "Recebemos seu pedido e notificamos o vendedor.",
        label: "Pedido criado",
        status: "done",
        time: "10:16",
      },
      {
        description: "Pagamento confirmado por Pix.",
        label: "Pagamento aprovado",
        status: "done",
        time: "10:17",
      },
      {
        description: "Vendedor informou indisponibilidade do produto.",
        label: "Pedido cancelado",
        status: "current",
        time: "10:31",
      },
      {
        description: "O estorno foi solicitado para a mesma forma de pagamento.",
        label: "Estorno",
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
