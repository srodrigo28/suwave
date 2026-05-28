"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FaBoxOpen,
  FaChevronRight,
  FaClock,
  FaReceipt,
  FaSearch,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Order } from "@/models/order";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { useAuthStore } from "@/stores/auth-store";
import styles from "./orders.module.css";

function ProtectedState({
  description,
  href,
  label,
  title,
}: {
  description: string;
  href: string;
  label: string;
  title: string;
}) {
  return (
    <section className={styles.protectedState}>
      <span>
        <FaShieldAlt aria-hidden="true" />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href={href}>{label}</Link>
    </section>
  );
}

function OrderCard({ order }: { order: Order }) {
  const active = order.status !== "delivered" && order.status !== "cancelled";

  return (
    <Link className={styles.orderCard} href={`/orders/${order.id}`}>
      <span className={styles.sellerAvatar}>{order.sellerAvatar}</span>
      <div className={styles.orderSummary}>
        <small>{order.shortId} • {order.placedAt}</small>
        <h2>{order.seller}</h2>
        <p>{order.items[0]?.name}</p>
        <strong>{order.total}</strong>
        <em className={active ? styles.statusLive : styles.statusDone}>
          {active ? <FaTruck aria-hidden="true" /> : <FaReceipt aria-hidden="true" />}
          {order.statusLabel}
        </em>
      </div>
      <FaChevronRight aria-hidden="true" />
    </Link>
  );
}

export function OrdersScreen({ orders }: { orders: Order[] }) {
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
        {!isAuthenticated ? (
          <ProtectedState
            description="Entre na sua conta para acompanhar compras, entregas, pagamentos e suporte."
            href="/auth/login"
            label="Entrar na conta"
            title="Entre para ver seus pedidos"
          />
        ) : !profileCompleted ? (
          <ProtectedState
            description="Complete seu perfil para liberar acompanhamento, endereco e historico de compras."
            href="/auth/profile"
            label="Completar perfil"
            title="Perfil incompleto"
          />
        ) : (
          <div className={styles.ordersScroll}>
            <header className={styles.ordersHeader}>
              <div>
                <small>Minhas compras</small>
                <h1>Pedidos</h1>
              </div>
              <button aria-label="Buscar pedido" type="button">
                <FaSearch aria-hidden="true" />
              </button>
            </header>

            <section className={styles.currentOrder}>
              <span>
                <FaClock aria-hidden="true" />
              </span>
              <div>
                <small>Pedido em andamento</small>
                <strong>{orders[0]?.statusLabel ?? "Nenhum pedido ativo"}</strong>
                <p>{orders[0]?.estimatedDelivery ?? "Quando houver um pedido, ele aparece aqui."}</p>
              </div>
              {orders[0] ? <Link href={`/orders/${orders[0].id}`}>Acompanhar</Link> : null}
            </section>

            <section className={styles.orderList} aria-label="Lista de pedidos">
              {orders.length ? (
                orders.map((order) => <OrderCard key={order.id} order={order} />)
              ) : (
                <div className={styles.emptyState}>
                  <FaBoxOpen aria-hidden="true" />
                  <h2>Nenhum pedido ainda</h2>
                  <p>Suas compras e solicitações aparecem aqui quando forem criadas.</p>
                </div>
              )}
            </section>
          </div>
        )}
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
