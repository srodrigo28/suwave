"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaCheck,
  FaCreditCard,
  FaHeadset,
  FaMapMarkerAlt,
  FaReceipt,
  FaRedo,
  FaShieldAlt,
  FaStore,
  FaTruck,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Order } from "@/models/order";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { useAuthStore } from "@/stores/auth-store";
import styles from "../../_components/orders.module.css";

function TrackingStep({
  description,
  label,
  status,
  time,
}: Order["trackingSteps"][number]) {
  return (
    <li className={`${styles.trackingStep} ${styles[status]}`}>
      <span>{status === "pending" ? null : <FaCheck aria-hidden="true" />}</span>
      <div>
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
      {time ? <small>{time}</small> : null}
    </li>
  );
}

export function OrderDetailScreen({ order }: { order: Order }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    if (!profileCompleted) {
      router.replace("/auth/profile");
    }
  }, [isAuthenticated, profileCompleted, router]);

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.ordersScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <div className={styles.ordersScroll}>
          <header className={styles.detailHeader}>
            <Link aria-label="Voltar para pedidos" href="/orders">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Pedido {order.shortId}</h1>
            <span />
          </header>

          <section className={styles.detailHero}>
            <span>
              <FaTruck aria-hidden="true" />
            </span>
            <small>Status atual</small>
            <h2>{order.statusLabel}</h2>
            <p>{order.estimatedDelivery}</p>
            <strong>Codigo de entrega: {order.deliveryCode}</strong>
          </section>

          <section className={styles.detailPanel}>
            <h2>Acompanhamento</h2>
            <ol className={styles.trackingList}>
              {order.trackingSteps.map((step) => (
                <TrackingStep key={step.label} {...step} />
              ))}
            </ol>
          </section>

          <section className={styles.detailPanel}>
            <h2>Itens do pedido</h2>
            {order.items.map((item) => (
              <div className={styles.itemRow} key={item.name}>
                <span>{item.quantity}x</span>
                <div>
                  <strong>{item.name}</strong>
                  {item.details ? <p>{item.details}</p> : null}
                </div>
                <b>{item.price}</b>
              </div>
            ))}
          </section>

          <section className={styles.infoGrid}>
            <article>
              <FaStore aria-hidden="true" />
              <small>Vendedor</small>
              <strong>{order.seller}</strong>
            </article>
            <article>
              <FaMapMarkerAlt aria-hidden="true" />
              <small>Entrega</small>
              <strong>{order.address}</strong>
            </article>
            <article>
              <FaCreditCard aria-hidden="true" />
              <small>Pagamento</small>
              <strong>{order.paymentMethod}</strong>
            </article>
            <article>
              <FaReceipt aria-hidden="true" />
              <small>Total</small>
              <strong>{order.total}</strong>
            </article>
          </section>

          <section className={styles.totalPanel}>
            <span>
              <small>Subtotal</small>
              <strong>{order.subtotal}</strong>
            </span>
            <span>
              <small>Entrega</small>
              <strong>{order.deliveryFee}</strong>
            </span>
            <span>
              <small>Total pago</small>
              <strong>{order.total}</strong>
            </span>
          </section>

          <div className={styles.detailActions}>
            <button type="button">
              <FaHeadset aria-hidden="true" />
              Suporte
            </button>
            <button type="button">
              <FaRedo aria-hidden="true" />
              Pedir novamente
            </button>
          </div>

          <aside className={styles.securityTip}>
            <FaShieldAlt aria-hidden="true" />
            <p>Use o codigo de entrega apenas quando receber o pedido.</p>
          </aside>
        </div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
