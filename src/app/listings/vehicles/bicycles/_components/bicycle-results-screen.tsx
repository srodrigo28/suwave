"use client";

import Link from "next/link";
import { FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export function BicycleResultsScreen({ listings }: { listings: Listing[] }) {
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

          <label className={styles.searchBar}>
            <FaSearch aria-hidden="true" />
            <span>Buscar bicicletas</span>
          </label>
          <div className={styles.filterTabs} aria-label="Filtros de bicicletas">
            <button className={styles.filterTabActive} type="button">Todas</button>
            <button type="button">Novas</button>
            <button type="button">Usadas</button>
          </div>

          <div className={styles.resultList}>
            {listings.map((listing, index) => (
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
            ))}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
