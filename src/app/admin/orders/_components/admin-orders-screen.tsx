"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaFilter,
  FaMoneyBillWave,
  FaRoute,
  FaSearch,
  FaUndo,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminOrder, AdminOrderStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminOrderStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Criados", value: "created" },
  { label: "Pagos", value: "paid" },
  { label: "Preparando", value: "preparing" },
  { label: "Em rota", value: "on_route" },
  { label: "Entregues", value: "delivered" },
  { label: "Cancelados", value: "cancelled" },
  { label: "Reembolso", value: "refunded" },
];

const statusIcon = {
  cancelled: FaBan,
  created: FaClock,
  delivered: FaCheckCircle,
  on_route: FaRoute,
  paid: FaMoneyBillWave,
  preparing: FaBoxOpen,
  refunded: FaUndo,
};

const statusClass = {
  cancelled: styles.cancelled,
  created: styles.created,
  delivered: styles.delivered,
  on_route: styles.onRoute,
  paid: styles.paid,
  preparing: styles.preparing,
  refunded: styles.refunded,
};

function AdminOrderRow({ order }: { order: AdminOrder }) {
  const StatusIcon = statusIcon[order.status];

  return (
    <article className={styles.listingRow}>
      <span className={styles.listingThumb}>{order.shortId.replace("#", "")}</span>
      <div className={styles.userInfo}>
        <small>{order.seller} - {order.city}</small>
        <strong>{order.shortId} - {order.buyer}</strong>
        <p>{order.deliveryWindow}</p>
        <span>
          <b>{order.total}</b>
          <b>{order.paymentMethod}</b>
          <b>{order.itemCount} itens</b>
          <b>{order.placedAt}</b>
          {order.supportReason ? <b>{order.supportReason}</b> : null}
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[order.status]}`}>
        <StatusIcon aria-hidden="true" />
        {order.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar pedido ${order.shortId}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Tratar suporte do pedido ${order.shortId}`} type="button">
          <FaFilter aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminOrdersScreen({ orders }: { orders: AdminOrder[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminOrderStatus | "all">("all");
  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const haystack = [
          order.shortId,
          order.seller,
          order.buyer,
          order.city,
          order.paymentMethod,
          order.statusLabel,
          order.total,
          order.supportReason ?? "",
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || order.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, orders, query],
  );
  const openOrders = orders.filter((order) =>
    ["created", "paid", "preparing", "on_route"].includes(order.status),
  ).length;
  const supportOrders = orders.filter((order) => order.supportReason).length;

  return (
    <AppShell>
      <section className={styles.adminScreen}>
        <div className={styles.adminScroll}>
          <header className={styles.adminHeader}>
            <Link aria-label="Voltar para admin" href="/admin">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <div>
              <small>Admin CRUD</small>
              <h1>Pedidos</h1>
            </div>
            <button aria-label="Filtros de pedidos" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de pedidos">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar pedidos"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por pedido, vendedor, comprador, cidade ou pagamento"
                type="search"
                value={query}
              />
            </label>
            <div>
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter.value ? styles.filterActive : ""}
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.userSummary} aria-label="Resumo de pedidos">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredOrders.length}</strong>
            </article>
            <article>
              <small>Em aberto</small>
              <strong>{openOrders}</strong>
            </article>
            <article>
              <small>Suporte</small>
              <strong>{supportOrders}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de pedidos">
            {filteredOrders.length ? (
              filteredOrders.map((order) => <AdminOrderRow key={order.id} order={order} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaSearch aria-hidden="true" />
                <h2>Nenhum pedido encontrado</h2>
                <p>Altere a busca ou escolha outro filtro.</p>
              </article>
            )}
          </section>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
