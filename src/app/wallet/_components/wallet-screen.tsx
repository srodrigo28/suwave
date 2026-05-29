"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaGift,
  FaHistory,
  FaInfoCircle,
  FaPlus,
  FaQuestionCircle,
  FaWallet,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { WalletSummary } from "@/models/finance";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./wallet.module.css";

export function WalletScreen({ wallet }: { wallet: WalletSummary }) {
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
            <h1>Carteira</h1>
            <Link aria-label="Ajuda da carteira" href="/help?topic=wallet">
              <FaQuestionCircle aria-hidden="true" />
            </Link>
          </motion.header>

          <motion.section className={styles.balanceHero} variants={riseMotion}>
            <div>
              <small>Saldo disponivel</small>
              <strong>{wallet.availableBalance}</strong>
              <p>Use o saldo dentro do app para compras, cashback e recompensas aprovadas.</p>
            </div>
            <span className={styles.walletMark}>
              <FaWallet aria-hidden="true" />
            </span>
          </motion.section>

          <motion.div className={styles.quickActions} variants={riseMotion}>
            <Link href="/help?topic=recharge">
              <FaPlus aria-hidden="true" />
              Recarregar
            </Link>
            <Link href="/wallet/statement">
              <FaHistory aria-hidden="true" />
              Extrato
            </Link>
          </motion.div>

          <motion.div className={styles.metricGrid} variants={containerMotion}>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Cashback</small>
              <strong>{wallet.cashbackBalance}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Comissao</small>
              <strong>{wallet.commissionBalance}</strong>
            </motion.article>
            <motion.article className={styles.metricCard} variants={riseMotion}>
              <small>Status</small>
              <strong>{wallet.affiliate.statusLabel}</strong>
            </motion.article>
          </motion.div>

          <motion.section className={styles.couponPanel} variants={riseMotion}>
            <div className={styles.sectionTitle}>
              <h2>Cupons de desconto</h2>
              <Link href="/help?topic=coupons">Como usar</Link>
            </div>
            <div className={styles.couponList}>
              {wallet.coupons.map((coupon) => (
                <article className={styles.couponCard} key={coupon.id}>
                  <small>{coupon.storeName}</small>
                  <strong>{coupon.discount}</strong>
                  <p>Valido ate {coupon.expiresAt}. Nao cumulativo com outras promocoes.</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaInfoCircle aria-hidden="true" />
            <p>
              Saldo carregado nao pode ser sacado ou transferido. Comissoes de afiliado seguem as regras
              da conta e ficam registradas no extrato.
            </p>
          </motion.aside>

          <motion.aside className={styles.financeNote} variants={riseMotion}>
            <FaGift aria-hidden="true" />
            <p>Cashback soma automaticamente ao saldo quando a loja ou o produto tiver campanha ativa.</p>
          </motion.aside>
        </motion.div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
