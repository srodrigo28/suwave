"use client";

import Link from "next/link";
import { FaBath, FaBed, FaCar, FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export function HouseResultsScreen({ listings }: { listings: Listing[] }) {
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

          <label className={styles.searchBar}>
            <FaSearch aria-hidden="true" />
            <span>Buscar casas</span>
          </label>
          <div className={styles.filterTabs} aria-label="Filtros de casas">
            <button className={styles.filterTabActive} type="button">Todas</button>
            <button type="button">Venda</button>
            <button type="button">Locacao</button>
          </div>

          <div className={styles.resultList}>
            {listings.map((listing, index) => (
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
            ))}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
