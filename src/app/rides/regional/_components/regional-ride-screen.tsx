"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaCar,
  FaCheckCircle,
  FaMinus,
  FaPlus,
  FaSearchLocation,
  FaShieldAlt,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { MobilityRoute, RideOption } from "@/models/mobility";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import styles from "@/app/mobility/_components/mobility.module.css";

export function RegionalRideScreen({
  options,
  route,
}: {
  options: RideOption[];
  route: MobilityRoute;
}) {
  const [passengers, setPassengers] = useState(2);
  const selectedOption = options.find((option) => option.selected) ?? options[0];
  const total = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
      }).format(selectedOption.pricePerPassenger * passengers),
    [passengers, selectedOption.pricePerPassenger],
  );

  return (
    <AppShell>
      <section className={styles.mobilityScreen}>
        <motion.div
          animate="visible"
          className={styles.mobilityScroll}
          initial="hidden"
          variants={containerMotion}
        >
          <header className={styles.topBar}>
            <Link aria-label="Voltar para categorias" href="/listings">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Carona fora da cidade</h1>
            <span />
          </header>

          <motion.section className={styles.mapCard} variants={riseMotion}>
            <div className={styles.mapCanvas} aria-label="Mapa da viagem">
              <span className={styles.mapDriver}>
                <FaCar aria-hidden="true" />
              </span>
              <span className={styles.mapDriver}>
                <FaCar aria-hidden="true" />
              </span>
            </div>
            <div className={styles.tripMetrics}>
              <article>
                <small>Distancia</small>
                <strong>{route.distance}</strong>
              </article>
              <article>
                <small>Tempo</small>
                <strong>{route.duration}</strong>
              </article>
              <article>
                <small>Data</small>
                <strong>Hoje</strong>
              </article>
            </div>
          </motion.section>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <h2>Trajeto</h2>
            <div className={styles.fieldGrid}>
              <label>
                Origem
                <input defaultValue={route.origin.address} />
              </label>
              <label>
                Destino
                <input defaultValue={route.destination.address} />
              </label>
              <label>
                Quando voce quer viajar?
                <input defaultValue="Hoje" />
              </label>
            </div>
          </motion.section>

          <motion.div className={styles.rideList} variants={containerMotion}>
            {options.map((option) => (
              <motion.article
                className={`${styles.rideCard} ${option.selected ? styles.selectedCard : ""}`}
                key={option.id}
                variants={riseMotion}
              >
                <div className={styles.rideHeader}>
                  <div>
                    <strong>{option.title}</strong>
                    <small>{option.seats}</small>
                  </div>
                  <span className={styles.price}>{option.priceLabel}</span>
                </div>
                <p>{option.description}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <h2>Solicitar carona economica</h2>
            <div className={styles.stepper}>
              <button
                aria-label="Diminuir passageiros"
                disabled={passengers <= 1}
                onClick={() => setPassengers((current) => Math.max(1, current - 1))}
                type="button"
              >
                <FaMinus aria-hidden="true" />
              </button>
              <div>
                <strong>{passengers}</strong>
                <p>passageiros</p>
              </div>
              <button
                aria-label="Aumentar passageiros"
                disabled={passengers >= 4}
                onClick={() => setPassengers((current) => Math.min(4, current + 1))}
                type="button"
              >
                <FaPlus aria-hidden="true" />
              </button>
            </div>
            <div className={styles.routeSummary}>
              <article>
                <small>Tipo</small>
                <strong>{selectedOption.title}</strong>
              </article>
              <article>
                <small>Valor estimado</small>
                <strong>{total}</strong>
              </article>
            </div>
            <button className={styles.primaryAction} type="button">
              <FaSearchLocation aria-hidden="true" />
              Pedir carona
            </button>
          </motion.section>

          <motion.aside className={styles.statusPanel} variants={riseMotion}>
            <strong>
              <FaCheckCircle aria-hidden="true" />
              Procurando motoristas disponiveis
            </strong>
            <p>Quando um motorista aceitar, os dados do motorista aparecem aqui.</p>
            <small>
              <FaShieldAlt aria-hidden="true" /> Viagens seguras com motoristas verificados.
            </small>
          </motion.aside>
        </motion.div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
