"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaCheckCircle,
  FaEye,
  FaFilter,
  FaLayerGroup,
  FaPen,
  FaSearch,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminCategory, AdminCategoryStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminCategoryStatus | "all" }> = [
  { label: "Todas", value: "all" },
  { label: "Ativas", value: "active" },
  { label: "Revisao", value: "review" },
  { label: "Ocultas", value: "hidden" },
];

const statusIcon = {
  active: FaCheckCircle,
  hidden: FaBan,
  review: FaFilter,
};

const statusClass = {
  active: styles.active,
  hidden: styles.hidden,
  review: styles.review,
};

function AdminCategoryRow({ category }: { category: AdminCategory }) {
  const StatusIcon = statusIcon[category.status];

  return (
    <article className={styles.listingRow}>
      <span className={styles.listingThumb}>{category.icon}</span>
      <div className={styles.userInfo}>
        <small>{category.parent} - ordem {category.sortOrder}</small>
        <strong>{category.name}</strong>
        <p>{category.childrenCount} subcategorias cadastradas</p>
        <span>
          <b>{category.listingsCount} anuncios</b>
          <b>{category.featured ? "Destaque" : "Padrao"}</b>
          <b>{category.updatedAt}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[category.status]}`}>
        <StatusIcon aria-hidden="true" />
        {category.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar categoria ${category.name}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Editar categoria ${category.name}`} type="button">
          <FaPen aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminCategoriesScreen({ categories }: { categories: AdminCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminCategoryStatus | "all">("all");
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => {
        const haystack = [
          category.name,
          category.parent,
          category.icon,
          category.statusLabel,
          category.featured ? "destaque" : "padrao",
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || category.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, categories, query],
  );
  const featuredCount = categories.filter((category) => category.featured).length;
  const childCount = categories.reduce((total, category) => total + category.childrenCount, 0);

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
              <h1>Categorias</h1>
            </div>
            <button aria-label="Filtros de categorias" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de categorias">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar categorias"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, raiz, icone, status ou destaque"
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

          <section className={styles.userSummary} aria-label="Resumo de categorias">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredCategories.length}</strong>
            </article>
            <article>
              <small>Subcategorias</small>
              <strong>{childCount}</strong>
            </article>
            <article>
              <small>Destaques</small>
              <strong>{featuredCount}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de categorias">
            {filteredCategories.length ? (
              filteredCategories.map((category) => (
                <AdminCategoryRow category={category} key={category.id} />
              ))
            ) : (
              <article className={styles.emptyAdminState}>
                <FaLayerGroup aria-hidden="true" />
                <h2>Nenhuma categoria encontrada</h2>
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
