"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaBath, FaBed, FaCar, FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { ListingResultsFilters } from "@/app/listings/_components/listing-results-filters";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

const houseFilters = [
  { label: "Todas", value: "all" },
  { label: "Venda", value: "venda" },
  { label: "Locacao", value: "locacao" },
  { label: "Destaque", value: "destaque" },
];

export function HouseResultsScreen({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const title = listing.title.toLowerCase();
        const haystack = [
          listing.title,
          listing.place,
          listing.price,
          listing.neighborhood,
          listing.bedrooms,
          listing.bathrooms,
          listing.parkingSpaces,
          listing.seller,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch = haystack.includes(search.trim().toLowerCase());
        const matchesFilter =
          activeFilter === "all" ||
          title.includes(activeFilter) ||
          (activeFilter === "destaque" && listing.tags?.includes("destaque"));

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
            <h1>Casas disponiveis</h1>
            <div className={styles.toolbarActions}>
              <button className={styles.iconButton} aria-label="Filtrar" type="button">
                <FaFilter aria-hidden="true" />
              </button>
            </div>
          </header>

          <ListingResultsFilters
            activeFilter={activeFilter}
            ariaLabel="Filtros de casas"
            filters={houseFilters}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearch}
            resultCount={filteredListings.length}
            searchLabel="Buscar casas"
            searchValue={search}
          />

          <div className={styles.resultList}>
            {filteredListings.length ? filteredListings.map((listing, index) => (
              <Link
                className={`${styles.resultCard} ${index === 0 ? styles.resultCardActive : ""}`}
                href={`/listings/properties/houses/${listing.slug}`}
                key={listing.slug}
              >
                <PickupMedia imageKind={listing.imageKind} />
                <span className={styles.resultCopy}>
                  {listing.tags?.includes("destaque") ? (
                    <small className={styles.statusBadge}>Destaque</small>
                  ) : null}
                  <h2>{listing.title}</h2>
                  <span className={styles.listingMeta}>
                    <b><FaBed aria-hidden="true" /> {listing.bedrooms}</b>
                    <b><FaBath aria-hidden="true" /> {listing.bathrooms}</b>
                    <b><FaCar aria-hidden="true" /> {listing.parkingSpaces}</b>
                  </span>
                  <strong className={styles.price}>{listing.price}</strong>
                  <em className={styles.place}>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {listing.neighborhood} · {listing.place}
                  </em>
                </span>
              </Link>
            )) : (
              <article className={styles.emptyResults}>
                <FaSearch aria-hidden="true" />
                <h2>Nenhuma casa encontrada</h2>
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
