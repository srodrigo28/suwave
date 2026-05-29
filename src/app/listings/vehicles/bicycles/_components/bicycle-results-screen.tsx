"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { ListingResultsFilters } from "@/app/listings/_components/listing-results-filters";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

const bicycleFilters = [
  { label: "Todas", value: "all" },
  { label: "Novas", value: "novo" },
  { label: "Usadas", value: "usado" },
  { label: "Aro 29", value: "29" },
];

export function BicycleResultsScreen({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const haystack = [
          listing.title,
          listing.place,
          listing.price,
          listing.condition,
          listing.wheelSize,
          listing.gears,
          listing.color,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch = haystack.includes(search.trim().toLowerCase());
        const matchesFilter =
          activeFilter === "all" ||
          listing.condition?.toLowerCase() === activeFilter ||
          listing.wheelSize === activeFilter;

        return matchesSearch && matchesFilter;
      }),
    [activeFilter, listings, search],
  );

  return (
    <AppShell>
      <section className={styles.flowScreen}>
        <div className={styles.flowScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para categorias" href="/listings" />
            <h1>Bicicletas</h1>
            <div className={styles.toolbarActions}>
              <button className={styles.iconButton} aria-label="Filtrar" type="button">
                <FaFilter aria-hidden="true" />
              </button>
            </div>
          </header>

          <ListingResultsFilters
            activeFilter={activeFilter}
            ariaLabel="Filtros de bicicletas"
            filters={bicycleFilters}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearch}
            resultCount={filteredListings.length}
            searchLabel="Buscar bicicletas"
            searchValue={search}
          />

          <div className={styles.resultList}>
            {filteredListings.length ? filteredListings.map((listing, index) => (
              <Link
                className={`${styles.resultCard} ${index === 0 ? styles.resultCardActive : ""}`}
                href={`/listings/vehicles/bicycles/${listing.slug}`}
                key={listing.slug}
              >
                <PickupMedia imageKind={listing.imageKind} />
                <span className={styles.resultCopy}>
                  <small className={styles.statusBadge}>{listing.condition}</small>
                  <h2>{listing.title}</h2>
                  <span className={styles.listingMeta}>
                    <b>Aro {listing.wheelSize}</b>
                    <b>{listing.gears} marchas</b>
                  </span>
                  <strong className={styles.price}>{listing.price}</strong>
                  <em className={styles.place}>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {listing.place}
                  </em>
                </span>
              </Link>
            )) : (
              <article className={styles.emptyResults}>
                <FaSearch aria-hidden="true" />
                <h2>Nenhuma bicicleta encontrada</h2>
                <p>Altere a busca ou escolha outro filtro.</p>
              </article>
            )}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
