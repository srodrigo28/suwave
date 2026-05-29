"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminUser, AdminUserStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminUserStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Ativos", value: "active" },
  { label: "Revisao", value: "review" },
  { label: "Bloqueados", value: "blocked" },
];

const statusIcon = {
  active: FaCheckCircle,
  blocked: FaBan,
  review: FaFilter,
};

function AdminUserRow({ user }: { user: AdminUser }) {
  const StatusIcon = statusIcon[user.status];

  return (
    <article className={styles.userRow}>
      <span className={styles.userAvatar}>{user.name.slice(0, 2).toUpperCase()}</span>
      <div className={styles.userInfo}>
        <small>{user.role} - {user.city}</small>
        <strong>{user.name}</strong>
        <p>{user.email}</p>
        <span>
          <b>{user.phone}</b>
          <b>{user.orders} pedidos</b>
          <b>{user.lastAccess}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${styles[user.status]}`}>
        <StatusIcon aria-hidden="true" />
        {user.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Revisar ${user.name}`} type="button">
          <FaUserCheck aria-hidden="true" />
        </button>
        <button aria-label={`Permissoes de ${user.name}`} type="button">
          <FaUserShield aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminUsersScreen({ users }: { users: AdminUser[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminUserStatus | "all">("all");
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const haystack = [
          user.name,
          user.email,
          user.phone,
          user.city,
          user.role,
          user.statusLabel,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || user.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, query, users],
  );

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
              <h1>Usuarios</h1>
            </div>
            <button aria-label="Filtros de usuarios" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de usuarios">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar usuarios"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, email, telefone ou cidade"
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

          <section className={styles.userSummary} aria-label="Resumo de usuarios">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredUsers.length}</strong>
            </article>
            <article>
              <small>Verificados</small>
              <strong>{filteredUsers.filter((user) => user.verified).length}</strong>
            </article>
            <article>
              <small>Em revisao</small>
              <strong>{users.filter((user) => user.status === "review").length}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de usuarios">
            {filteredUsers.length ? (
              filteredUsers.map((user) => <AdminUserRow key={user.id} user={user} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaSearch aria-hidden="true" />
                <h2>Nenhum usuario encontrado</h2>
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
