"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaChartLine,
  FaCopy,
  FaMoneyBillWave,
  FaPiggyBank,
  FaUniversity,
  FaUserFriends,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AffiliateAccount } from "@/models/finance";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "@/app/wallet/_components/wallet.module.css";

export function AffiliateScreen({ affiliate }: { affiliate: AffiliateAccount }) {
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
            <Link aria-label="Voltar para mais" href="/more">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Conta Afiliado</h1>
            <Link aria-label="Ver carteira" href="/wallet">
              <FaPiggyBank aria-hidden="true" />
            </Link>
          </motion.header>

          <motion.section className={styles.affiliateHero} variants={riseMotion}>
            <small>{affiliate.statusLabel} ha {affiliate.activeDays} dias</small>
            <h2>{affiliate.availableCommission}</h2>
            <p>Comissao disponivel para sacar, carregar na carteira ou acompanhar no financeiro.</p>
            <div className={styles.affiliateCode}>
              <span>{affiliate.code}</span>
              <FaCopy aria-hidden="true" />
            </div>
          </motion.section>

          <motion.div className={styles.metricGrid} variants={containerMotion}>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Total ganho</small>
              <strong>{affiliate.totalCommission}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Pendente</small>
              <strong>{affiliate.pendingCommission}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Conversao</small>
              <strong>{affiliate.conversionRate}</strong>
            </motion.article>
          </motion.div>

          <motion.section className={styles.withdrawPanel} variants={riseMotion}>
            <h2>Escolher forma de saque</h2>
            <div className={styles.withdrawalList}>
              {affiliate.withdrawalOptions.map((option) => (
                <article className={styles.withdrawalCard} key={option.id}>
                  {option.id === "wallet" ? (
                    <FaPiggyBank aria-hidden="true" />
                  ) : (
                    <FaUniversity aria-hidden="true" />
                  )}
                  <div>
                    <strong>{option.label}</strong>
                    <p>{option.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.amountBox}>
              <label htmlFor="withdrawal-amount">Valor para saque</label>
              <input defaultValue={affiliate.minWithdrawal} id="withdrawal-amount" inputMode="decimal" />
              <button type="button">Confirmar saque</button>
            </div>
          </motion.section>

          <motion.div className={styles.metricGrid} variants={containerMotion}>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Indicados</small>
              <strong>{affiliate.invitedCount}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Minimo</small>
              <strong>{affiliate.minWithdrawal}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Historico</small>
              <strong>AF</strong>
            </motion.article>
          </motion.div>

          <motion.section className={styles.rulePanel} variants={riseMotion}>
            <div className={styles.sectionTitle}>
              <h2>Regras do afiliado</h2>
              <Link href="/wallet/statement">Extrato</Link>
            </div>
            <div className={styles.ruleList}>
              {affiliate.rules.map((rule) => (
                <article className={styles.ruleCard} key={rule.id}>
                  <small>{rule.title}</small>
                  <p>{rule.description}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaMoneyBillWave aria-hidden="true" />
            <p>Solicitacoes de saque validam valor minimo, saldo disponivel e status financeiro.</p>
          </motion.aside>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaUserFriends aria-hidden="true" />
            <p>Dados sensiveis do comprador nao aparecem para o afiliado; o historico fica anonimo.</p>
          </motion.aside>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaChartLine aria-hidden="true" />
            <p>Produtos podem ativar afiliado aberto, por aprovacao ou fechado pelo vendedor.</p>
          </motion.aside>
        </motion.div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
