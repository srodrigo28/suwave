"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaHamburger, FaMinus, FaPlus, FaShoppingBag, FaStar } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import styles from "@/app/food/_components/food.module.css";
import type { FoodCombo, Restaurant } from "@/models/food";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency" }).format(value);
}

export function RestaurantMenuScreen({
  combo,
  restaurant,
}: {
  combo: FoodCombo;
  restaurant: Restaurant;
}) {
  const [quantity, setQuantity] = useState(1);
  const selectedExtras = combo.optionGroups.flatMap((group) =>
    group.items.filter((item) => item.selected),
  );
  const total = useMemo(
    () => formatCurrency((combo.basePrice + selectedExtras.reduce((sum, item) => sum + item.priceDelta, 0)) * quantity),
    [combo.basePrice, quantity, selectedExtras],
  );

  return (
    <AppShell>
      <section className={styles.foodScreen}>
        <div className={styles.foodScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para restaurantes" href="/food/snacks" />
            <h1>Cardapio</h1>
            <Link className={styles.iconButton} aria-label="Sacola" href="/food/bag">
              <FaShoppingBag aria-hidden="true" />
            </Link>
          </header>

          <section className={styles.hero}>
            <Image alt="" fill priority sizes="360px" src="/marketplace/pizza-promo.png" />
          </section>

          <section className={styles.storeHeader}>
            <span className={styles.logo}><FaHamburger aria-hidden="true" /></span>
            <span>
              <h2>{restaurant.name}</h2>
              <span className={styles.metaLine}>
                <FaStar aria-hidden="true" /> {restaurant.rating}
                <span>{restaurant.deliveryTime}</span>
                <span>Loja aberta</span>
              </span>
            </span>
          </section>

          <div className={styles.couponRow}>
            <span>Cupom R$ 12</span>
            <span>Cupom R$ 10</span>
          </div>

          <section className={styles.comboInfo}>
            <h1>{combo.title}</h1>
            <p>{combo.description}</p>
            <span className={styles.priceLine}>
              <strong>{combo.price}</strong>
              <del>{combo.oldPrice}</del>
            </span>
          </section>

          {combo.optionGroups.map((group) => (
            <section className={styles.optionGroup} key={group.id}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <article
                  className={`${styles.optionCard} ${item.selected ? styles.optionCardActive : ""}`}
                  key={item.id}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                    <small>{item.priceLabel}</small>
                  </span>
                  <span className={styles.addIcon}><FaPlus aria-hidden="true" /></span>
                </article>
              ))}
            </section>
          ))}

          <label className={styles.observation}>
            <span>Alguma observacao?</span>
            <textarea placeholder="Ex: tirar cebola, maionese a parte etc." />
          </label>
        </div>

        <div className={styles.stickyBar}>
          <span className={styles.quantity}>
            <button aria-label="Diminuir quantidade" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
              <FaMinus aria-hidden="true" />
            </button>
            {quantity}
            <button aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => value + 1)} type="button">
              <FaPlus aria-hidden="true" />
            </button>
          </span>
          <Link className={styles.primaryAction} href="/food/snacks/hamburgueria-salamanca-cadore/address">
            Adicionar · {total}
          </Link>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
