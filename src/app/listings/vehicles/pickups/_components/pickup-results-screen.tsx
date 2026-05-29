"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { ListingResultsFilters } from "@/app/listings/_components/listing-results-filters";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";

const pickupFilters = [
  { label: "Todas", value: "all" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "Diesel", value: "diesel" },
];

export function PickupResultsScreen({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const haystack = [
          listing.title,
          listing.place,
          listing.price,
          listing.modelYear,
          listing.fuel,
          listing.mileage,
          listing.color,
          listing.transmission,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch = haystack.includes(search.trim().toLowerCase());
        const matchesFilter =
          activeFilter === "all" ||
          listing.modelYear === activeFilter ||
          listing.fuel?.toLowerCase() === activeFilter;

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
            <h1>Caminhonetes</h1>
            <div className={styles.toolbarActions}>
              <button className={styles.iconButton} aria-label="Buscar" type="button">
                <FaSearch aria-hidden="true" />
              </button>
              <button className={styles.iconButton} aria-label="Filtrar" type="button">
                <FaFilter aria-hidden="true" />
              </button>
            </div>
          </header>

          <ListingResultsFilters
            activeFilter={activeFilter}
            ariaLabel="Filtros de caminhonetes"
            filters={pickupFilters}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearch}
            resultCount={filteredListings.length}
            searchLabel="Buscar caminhonetes"
            searchValue={search}
          />

          <div className={styles.resultList}>
            {filteredListings.length ? filteredListings.map((listing) => (
              <Link
                className={styles.resultCard}
                href={`/listings/vehicles/pickups/${listing.slug}`}
                key={listing.slug}
              >
                <PickupMedia imageKind={listing.imageKind} />
                <span className={styles.resultCopy}>
                  <h2>{listing.title}</h2>
                  <span className={styles.listingMeta}>
                    <b>{listing.modelYear}</b>
                    <b>{listing.fuel}</b>
                    <b>{listing.mileage}</b>
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
                <h2>Nenhuma caminhonete encontrada</h2>
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
