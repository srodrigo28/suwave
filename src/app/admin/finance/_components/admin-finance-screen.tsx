"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaCheckCircle,
  FaEye,
  FaFilter,
  FaMoneyBillWave,
  FaSearch,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminFinanceItem, AdminFinanceStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminFinanceStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Aprovados", value: "approved" },
  { label: "Pagos", value: "paid" },
  { label: "Bloqueados", value: "blocked" },
];

const statusIcon = {
  approved: FaCheckCircle,
  blocked: FaBan,
  paid: FaWallet,
  pending: FaFilter,
};

const statusClass = {
  approved: styles.approved,
  blocked: styles.blocked,
  paid: styles.paid,
  pending: styles.pending,
};

function AdminFinanceRow({ item }: { item: AdminFinanceItem }) {
  const StatusIcon = statusIcon[item.status];

  return (
    <article className={styles.listingRow}>
      <span className={styles.listingThumb}>{item.type.slice(0, 2).toUpperCase()}</span>
      <div className={styles.userInfo}>
        <small>{item.type} - {item.city}</small>
        <strong>{item.owner}</strong>
        <p>{item.reason}</p>
        <span>
          <b>{item.amount}</b>
          <b>{item.method}</b>
          <b>{item.createdAt}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[item.status]}`}>
        <StatusIcon aria-hidden="true" />
        {item.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar financeiro de ${item.owner}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Auditar financeiro de ${item.owner}`} type="button">
          <FaShieldAlt aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminFinanceScreen({ items }: { items: AdminFinanceItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminFinanceStatus | "all">("all");
  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const haystack = [
          item.owner,
          item.city,
          item.type,
          item.reason,
          item.method,
          item.amount,
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
  const pendingCount = items.filter((item) => item.status === "pending").length;
  const blockedCount = items.filter((item) => item.status === "blocked").length;

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
              <h1>Financeiro</h1>
            </div>
            <button aria-label="Filtros financeiros" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca financeira">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar financeiro"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por usuario, loja, tipo, valor ou metodo"
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

          <section className={styles.userSummary} aria-label="Resumo financeiro">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredItems.length}</strong>
            </article>
            <article>
              <small>Pendentes</small>
              <strong>{pendingCount}</strong>
            </article>
            <article>
              <small>Bloqueios</small>
              <strong>{blockedCount}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista financeira">
            {filteredItems.length ? (
              filteredItems.map((item) => <AdminFinanceRow item={item} key={item.id} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaMoneyBillWave aria-hidden="true" />
                <h2>Nenhum lancamento encontrado</h2>
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
