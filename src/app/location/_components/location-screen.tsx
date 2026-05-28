"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaSearchLocation,
  FaStore,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { LocationCity } from "@/models/location";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./location.module.css";

const storageKey = "suwave-selected-city";

function cityLabel(city: LocationCity) {
  return `${city.name} - ${city.state}`;
}

function coverageLabel(city: LocationCity) {
  if (city.coverage === "full") {
    return "Cobertura completa";
  }

  if (city.coverage === "partial") {
    return "Cobertura parcial";
  }

  return "Em expansao";
}

function readStoredCity(cities: LocationCity[]) {
  if (typeof window === "undefined") {
    return cities[0];
  }

  const stored = window.localStorage.getItem(storageKey);
  return cities.find((city) => city.id === stored) ?? cities[0];
}

export function LocationScreen({ cities }: { cities: LocationCity[] }) {
  const [selectedCity, setSelectedCity] = useState(() => readStoredCity(cities));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "updating" | "saved">("idle");

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return cities;
    }

    return cities.filter((city) =>
      `${city.name} ${city.state} ${city.region}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [cities, query]);

  const handleSelectCity = (city: LocationCity) => {
    setSelectedCity(city);
    setStatus("updating");
    window.localStorage.setItem(storageKey, city.id);
    window.dispatchEvent(new Event("suwave-city-change"));

    window.setTimeout(() => {
      setStatus("saved");
    }, 420);
  };

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.locationScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <motion.div
          animate="visible"
          className={styles.locationScroll}
          initial="hidden"
          variants={containerMotion}
        >
          <motion.header className={styles.locationHeader} variants={riseMotion}>
            <Link aria-label="Voltar para inicio" href="/">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <div>
              <small>Localizacao global</small>
              <h1>Selecione sua cidade</h1>
            </div>
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
            </span>
          </motion.header>

          <motion.section className={styles.currentCity} variants={riseMotion}>
            <small>Cidade atual</small>
            <h2>{cityLabel(selectedCity)}</h2>
            <p>
              Conteudo, lojas, servicos, transportes e entregas serao filtrados
              por esta regiao.
            </p>
            <div className={styles.statusPill}>
              {status === "updating" ? (
                <>
                  <FaClock aria-hidden="true" />
                  Atualizando conteudo
                </>
              ) : status === "saved" ? (
                <>
                  <FaCheckCircle aria-hidden="true" />
                  Cidade aplicada
                </>
              ) : (
                <>
                  <FaMapMarkerAlt aria-hidden="true" />
                  {coverageLabel(selectedCity)}
                </>
              )}
            </div>
          </motion.section>

          <motion.label className={styles.locationSearch} variants={riseMotion}>
            <FaSearchLocation aria-hidden="true" />
            <input
              aria-label="Buscar cidade"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar cidade ou regiao"
              type="search"
              value={query}
            />
          </motion.label>

          <motion.div className={styles.cityList} variants={containerMotion}>
            {filteredCities.length ? (
              filteredCities.map((city) => {
                const isSelected = city.id === selectedCity.id;

                return (
                  <motion.button
                    aria-pressed={isSelected}
                    className={`${styles.cityCard} ${
                      isSelected ? styles.cityCardActive : ""
                    }`}
                    key={city.id}
                    onClick={() => handleSelectCity(city)}
                    type="button"
                    variants={riseMotion}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.cityPin}>
                      <FaMapMarkerAlt aria-hidden="true" />
                    </span>
                    <div>
                      <small>{city.region}</small>
                      <strong>{cityLabel(city)}</strong>
                      <p>
                        {coverageLabel(city)} - {city.deliveryEta}
                      </p>
                    </div>
                    {isSelected ? (
                      <FaCheckCircle aria-hidden="true" />
                    ) : (
                      <FaChevronRight aria-hidden="true" />
                    )}
                  </motion.button>
                );
              })
            ) : (
              <motion.article className={styles.emptyState} variants={riseMotion}>
                <FaInfoCircle aria-hidden="true" />
                <h2>Nenhuma cidade encontrada</h2>
                <p>Tente buscar por cidade, estado ou regiao atendida.</p>
              </motion.article>
            )}
          </motion.div>

          <motion.section className={styles.coveragePanel} variants={riseMotion}>
            <h2>Disponibilidade em {selectedCity.name}</h2>
            <div className={styles.coverageGrid}>
              <article>
                <FaStore aria-hidden="true" />
                <small>Lojas ativas</small>
                <strong>{selectedCity.sellers}</strong>
              </article>
              <article>
                <FaUsers aria-hidden="true" />
                <small>Servicos</small>
                <strong>{selectedCity.services}</strong>
              </article>
              <article>
                <FaTruck aria-hidden="true" />
                <small>Logistica</small>
                <strong>{selectedCity.deliveryEta}</strong>
              </article>
            </div>
            <p>{selectedCity.transport}</p>
            <div className={styles.highlightList}>
              {selectedCity.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </motion.section>

          <motion.aside className={styles.locationTip} variants={riseMotion}>
            <FaInfoCircle aria-hidden="true" />
            <p>
              Ao trocar de cidade, a SUWAVE prepara produtos, lojas, servicos,
              transportes e entregas conforme a disponibilidade regional.
            </p>
          </motion.aside>
        </motion.div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
