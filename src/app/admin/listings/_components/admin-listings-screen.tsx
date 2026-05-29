"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBan,
  FaCheckCircle,
  FaEye,
  FaFilter,
  FaPauseCircle,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminListing, AdminListingStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminListingStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Publicados", value: "published" },
  { label: "Revisao", value: "review" },
  { label: "Pausados", value: "paused" },
  { label: "Rejeitados", value: "rejected" },
];

const statusIcon = {
  paused: FaPauseCircle,
  published: FaCheckCircle,
  rejected: FaBan,
  review: FaFilter,
};

function AdminListingRow({ listing }: { listing: AdminListing }) {
  const StatusIcon = statusIcon[listing.status];

  return (
    <article className={styles.listingRow}>
      <span className={styles.listingThumb}>{listing.type.slice(0, 2).toUpperCase()}</span>
      <div className={styles.userInfo}>
        <small>{listing.type} - {listing.city}</small>
        <strong>{listing.title}</strong>
        <p>{listing.seller} - {listing.price}</p>
        <span>
          <b>{listing.mediaCount} midias</b>
          <b>{listing.createdAt}</b>
          <b>{listing.updatedAt}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${styles[listing.status]}`}>
        <StatusIcon aria-hidden="true" />
        {listing.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar ${listing.title}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Moderar ${listing.title}`} type="button">
          <FaShieldAlt aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminListingsScreen({ listings }: { listings: AdminListing[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminListingStatus | "all">("all");
  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const haystack = [
          listing.title,
          listing.seller,
          listing.city,
          listing.type,
          listing.statusLabel,
          listing.price,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || listing.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, listings, query],
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
              <h1>Anuncios</h1>
            </div>
            <button aria-label="Filtros de anuncios" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de anuncios">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar anuncios"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por titulo, vendedor, cidade, tipo ou preco"
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

          <section className={styles.userSummary} aria-label="Resumo de anuncios">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredListings.length}</strong>
            </article>
            <article>
              <small>Em revisao</small>
              <strong>{listings.filter((listing) => listing.status === "review").length}</strong>
            </article>
            <article>
              <small>Publicados</small>
              <strong>{listings.filter((listing) => listing.status === "published").length}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de anuncios">
            {filteredListings.length ? (
              filteredListings.map((listing) => (
                <AdminListingRow key={listing.id} listing={listing} />
              ))
            ) : (
              <article className={styles.emptyAdminState}>
                <FaSearch aria-hidden="true" />
                <h2>Nenhum anuncio encontrado</h2>
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
