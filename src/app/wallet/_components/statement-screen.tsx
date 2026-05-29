"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowLeft, FaExchangeAlt, FaFilter, FaMinus, FaPlus } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { WalletMovement, WalletSummary } from "@/models/finance";
import { fetchWalletMovements } from "@/services/finance-client";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./wallet.module.css";

type Filter = "all" | "in" | "out";

function MovementIcon({ movement }: { movement: WalletMovement }) {
  const isOut = movement.type === "out";

  return (
    <span className={`${styles.movementIcon} ${isOut ? styles.movementIconOut : ""}`}>
      {isOut ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
    </span>
  );
}

export function StatementScreen({ wallet }: { wallet: WalletSummary }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [apiMovements, setApiMovements] = useState<WalletMovement[] | null>(null);
  const [syncState, setSyncState] = useState<"api" | "fallback" | "loading">("loading");
  const sourceMovements = apiMovements ?? wallet.movements;
  const movements = useMemo(() => {
    if (filter === "all") {
      return sourceMovements;
    }

    return sourceMovements.filter((movement) => movement.type === filter);
  }, [filter, sourceMovements]);

  useEffect(() => {
    let mounted = true;

    fetchWalletMovements()
      .then((movementsFromApi) => {
        if (!mounted) {
          return;
        }
        setApiMovements(movementsFromApi);
        setSyncState("api");
      })
      .catch(() => {
        if (mounted) {
          setSyncState("fallback");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.financeScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <motion.div
          animate="visible"
          className={styles.financeScroll}
          initial="hidden"
          variants={containerMotion}
        >
          <motion.header className={styles.financeHeader} variants={riseMotion}>
            <Link aria-label="Voltar para carteira" href="/wallet">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Extrato</h1>
            <Link aria-label="Filtrar extrato" href="/wallet/statement">
              <FaFilter aria-hidden="true" />
            </Link>
          </motion.header>

          <span className={`${styles.syncPill} ${syncState === "fallback" ? styles.syncPillMuted : ""}`}>
            {syncState === "loading" ? "Sincronizando" : syncState === "api" ? "API conectada" : "Dados demonstrativos"}
          </span>

          <motion.div className={styles.filterRow} variants={riseMotion}>
            {[
              ["all", "Todos"],
              ["in", "Entradas"],
              ["out", "Saidas"],
            ].map(([value, label]) => (
              <button
                className={`${styles.filterButton} ${filter === value ? styles.filterButtonActive : ""}`}
                key={value}
                onClick={() => setFilter(value as Filter)}
                type="button"
              >
                {label}
              </button>
            ))}
          </motion.div>

          <motion.section className={styles.movementPanel} variants={riseMotion}>
            <div className={styles.sectionTitle}>
              <h2>Junho de 2026</h2>
              <Link href="/wallet">Saldo {wallet.availableBalance}</Link>
            </div>
            <div className={styles.movementList}>
              {movements.map((movement) => (
                <article className={styles.movementCard} key={movement.id}>
                  <MovementIcon movement={movement} />
                  <div>
                    <small>{movement.createdAt}</small>
                    <strong>{movement.title}</strong>
                    <small>{movement.description}</small>
                  </div>
                  <span className={movement.type === "in" ? styles.movementValueIn : styles.movementValueOut}>
                    {movement.amount}
                  </span>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaExchangeAlt aria-hidden="true" />
            <p className={styles.statementFooter}>Ultima atualizacao: {wallet.lastUpdatedAt}</p>
          </motion.aside>
        </motion.div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
