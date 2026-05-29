"use client";

import Link from "next/link";
import { FaHamburger, FaSearch, FaStar } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import styles from "@/app/food/_components/food.module.css";
import type { Restaurant } from "@/models/food";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export function SnackRestaurantsScreen({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <AppShell>
      <section className={styles.foodScreen}>
        <div className={styles.foodScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para categorias" href="/listings" />
            <h1>Restaurantes</h1>
            <span />
          </header>

          <label className={styles.searchBar}>
            <FaSearch aria-hidden="true" />
            <span>Buscar em Restaurantes</span>
          </label>

          <div className={styles.restaurantList}>
            {restaurants.map((restaurant) => (
              <Link
                className={`${styles.restaurantCard} ${restaurant.selected ? styles.restaurantCardActive : ""}`}
                href={`/food/snacks/${restaurant.id}`}
                key={restaurant.id}
              >
                <span className={styles.logo}>
                  <FaHamburger aria-hidden="true" />
                </span>
                <span className={styles.restaurantCopy}>
                  <h2>{restaurant.name}</h2>
                  <span className={styles.metaLine}>
                    <FaStar aria-hidden="true" /> {restaurant.rating}
                    <span>{restaurant.deliveryTime}</span>
                    <span>{restaurant.deliveryFee}</span>
                  </span>
                  <span className={styles.badgeRow}>
                    {restaurant.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </span>
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
