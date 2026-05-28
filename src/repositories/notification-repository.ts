import { FaBell, FaCheckCircle, FaTag, FaTruck } from "react-icons/fa";
import type { Notification } from "@/models/notification";

const notifications: Notification[] = [
  {
    actionHref: "/orders/pedido-lanche-salamanca-8391",
    actionLabel: "Acompanhar pedido",
    body: "Seu combo saiu para entrega. Use o codigo somente quando receber.",
    createdAt: "Agora",
    icon: FaTruck,
    id: "pedido-em-rota-8391",
    read: false,
    title: "Pedido saiu para entrega",
    tone: "success",
  },
  {
    actionHref: "/orders",
    actionLabel: "Ver compras",
    body: "O pagamento Pix do mercado foi aprovado e a loja ja esta separando os produtos.",
    createdAt: "18 min",
    icon: FaCheckCircle,
    id: "pix-aprovado-1742",
    read: false,
    title: "Pagamento aprovado",
    tone: "info",
  },
  {
    actionHref: "/listings",
    actionLabel: "Explorar ofertas",
    body: "Novos anuncios perto de Sinop entraram nas categorias de comida, mercado e veiculos.",
    createdAt: "Hoje",
    icon: FaTag,
    id: "ofertas-sinop-hoje",
    read: true,
    title: "Ofertas perto de voce",
    tone: "warning",
  },
  {
    body: "Ative notificacoes para receber status de pedidos, mensagens e alertas da sua conta.",
    createdAt: "Ontem",
    icon: FaBell,
    id: "preferencias-notificacao",
    read: true,
    title: "Central de notificacoes pronta",
    tone: "info",
  },
];

export function getNotifications() {
  return notifications;
}
