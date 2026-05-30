import { FaBullhorn, FaClock, FaPercent, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import type { Notification } from "@/models/notification";

const notifications: Notification[] = [
  {
    actionHref: "/affiliate",
    body: "Você recebeu R$ 25,50 de comissão por indicações.",
    createdAt: "10:30",
    icon: FaUsers,
    id: "comissao-afiliado-2550",
    read: false,
    title: "Comissão de afiliado",
    tone: "affiliate",
  },
  {
    actionHref: "/wallet",
    body: "Você recebeu R$ 5,20 de cashback da sua compra.",
    createdAt: "09:15",
    icon: FaDollarSign,
    id: "cashback-recebido-520",
    read: false,
    title: "Cashback recebido",
    tone: "cashback",
  },
  {
    actionHref: "/listings",
    body: "Seu anúncio \"iPhone 14 Pro Max\" precisa de atualização.",
    createdAt: "Ontem",
    icon: FaBullhorn,
    id: "atualizar-anuncio-iphone",
    read: false,
    title: "Atualizar anúncio",
    tone: "warning",
  },
  {
    actionHref: "/listings",
    body: "Seu anúncio expira em 2 dias. Renove para continuar visível.",
    createdAt: "Ontem",
    icon: FaClock,
    id: "anuncio-prestes-expirar",
    read: false,
    title: "Anúncio prestes a expirar",
    tone: "deadline",
  },
  {
    actionHref: "/listings",
    body: "Descontos exclusivos disponíveis na sua cidade!",
    createdAt: "2 dias atras",
    icon: FaPercent,
    id: "promocao-especial-cidade",
    read: true,
    title: "Promoção especial",
    tone: "promo",
  },
  {
    actionHref: "/orders/pedido-lanche-salamanca-8391",
    body: "Seu pedido #12345 está a caminho. Acompanhe agora.",
    createdAt: "2 dias atras",
    icon: FaShoppingBag,
    id: "pedido-em-andamento-12345",
    read: true,
    title: "Pedido em andamento",
    tone: "order",
  },
];

export function getNotifications() {
  return notifications;
}
