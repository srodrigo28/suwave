"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaComments,
  FaEye,
  FaFilter,
  FaHeadset,
  FaReply,
  FaSearch,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminSupportStatus, AdminSupportTicket } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminSupportStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Abertos", value: "open" },
  { label: "Aguardando", value: "waiting" },
  { label: "Resolvidos", value: "resolved" },
  { label: "Escalados", value: "escalated" },
];

const statusIcon = {
  escalated: FaHeadset,
  open: FaComments,
  resolved: FaCheckCircle,
  waiting: FaClock,
};

const statusClass = {
  escalated: styles.rejected,
  open: styles.pending,
  resolved: styles.approved,
  waiting: styles.review,
};

function AdminSupportRow({ ticket }: { ticket: AdminSupportTicket }) {
  const StatusIcon = statusIcon[ticket.status];

  return (
    <article className={styles.listingRow}>
      <span className={`${styles.priority} ${styles[ticket.priority]}`}>{ticket.priority}</span>
      <div className={styles.userInfo}>
        <small>{ticket.channel} - {ticket.customer}</small>
        <strong>{ticket.subject}</strong>
        <p>{ticket.sla}</p>
        <span>
          <b>{ticket.updatedAt}</b>
          {ticket.orderId ? <b>{ticket.orderId}</b> : null}
          <b>{ticket.priority}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[ticket.status]}`}>
        <StatusIcon aria-hidden="true" />
        {ticket.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar ticket ${ticket.subject}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Responder ticket ${ticket.subject}`} type="button">
          <FaReply aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminSupportScreen({ tickets }: { tickets: AdminSupportTicket[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminSupportStatus | "all">("all");
  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const haystack = [
          ticket.customer,
          ticket.channel,
          ticket.subject,
          ticket.sla,
          ticket.orderId ?? "",
          ticket.priority,
          ticket.statusLabel,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || ticket.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, query, tickets],
  );
  const openCount = tickets.filter((ticket) => ticket.status === "open").length;
  const escalatedCount = tickets.filter((ticket) => ticket.status === "escalated").length;

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
              <h1>Suporte</h1>
            </div>
            <button aria-label="Filtros de suporte" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de suporte">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar suporte"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por cliente, canal, pedido, SLA ou assunto"
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

          <section className={styles.userSummary} aria-label="Resumo de suporte">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredTickets.length}</strong>
            </article>
            <article>
              <small>Abertos</small>
              <strong>{openCount}</strong>
            </article>
            <article>
              <small>Escalados</small>
              <strong>{escalatedCount}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de suporte">
            {filteredTickets.length ? (
              filteredTickets.map((ticket) => <AdminSupportRow key={ticket.id} ticket={ticket} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaHeadset aria-hidden="true" />
                <h2>Nenhum ticket encontrado</h2>
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
