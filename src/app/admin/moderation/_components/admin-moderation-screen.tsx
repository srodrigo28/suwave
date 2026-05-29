"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaCheckCircle,
  FaEye,
  FaFilter,
  FaSearch,
  FaShieldAlt,
  FaTasks,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminModerationItem, AdminModerationStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminModerationStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Fila", value: "queued" },
  { label: "Revisao", value: "reviewing" },
  { label: "Aprovados", value: "approved" },
  { label: "Rejeitados", value: "rejected" },
];

const statusIcon = {
  approved: FaCheckCircle,
  queued: FaTasks,
  rejected: FaBan,
  reviewing: FaFilter,
};

const statusClass = {
  approved: styles.approved,
  queued: styles.pending,
  rejected: styles.rejected,
  reviewing: styles.review,
};

function AdminModerationRow({ item }: { item: AdminModerationItem }) {
  const StatusIcon = statusIcon[item.status];

  return (
    <article className={styles.listingRow}>
      <span className={`${styles.priority} ${styles[item.priority]}`}>{item.priority}</span>
      <div className={styles.userInfo}>
        <small>{item.area} - {item.owner}</small>
        <strong>{item.title}</strong>
        <p>{item.reason}</p>
        <span>
          <b>{item.age}</b>
          <b>{item.priority}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[item.status]}`}>
        <StatusIcon aria-hidden="true" />
        {item.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar moderacao ${item.title}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Decidir moderacao ${item.title}`} type="button">
          <FaShieldAlt aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminModerationScreen({ items }: { items: AdminModerationItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminModerationStatus | "all">("all");
  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const haystack = [
          item.area,
          item.owner,
          item.title,
          item.reason,
          item.priority,
          item.statusLabel,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || item.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, items, query],
  );
  const queueCount = items.filter((item) => item.status === "queued").length;
  const highPriorityCount = items.filter((item) => item.priority === "alta").length;

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
              <h1>Moderacao</h1>
            </div>
            <button aria-label="Filtros de moderacao" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de moderacao">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar moderacao"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por area, responsavel, titulo ou motivo"
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

          <section className={styles.userSummary} aria-label="Resumo de moderacao">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredItems.length}</strong>
            </article>
            <article>
              <small>Na fila</small>
              <strong>{queueCount}</strong>
            </article>
            <article>
              <small>Alta prioridade</small>
              <strong>{highPriorityCount}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de moderacao">
            {filteredItems.length ? (
              filteredItems.map((item) => <AdminModerationRow item={item} key={item.id} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaShieldAlt aria-hidden="true" />
                <h2>Nenhum item encontrado</h2>
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
