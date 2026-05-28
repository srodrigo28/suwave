"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowLeft, FaBell, FaChevronRight } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Notification } from "@/models/notification";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "@/app/_components/suwave-home.module.css";

function NotificationCard({ notification }: { notification: Notification }) {
  const Icon = notification.icon;
  const content = (
    <>
      <span className={`${styles.notificationIcon} ${styles[notification.tone]}`}>
        <Icon aria-hidden="true" />
      </span>
      <div className={styles.notificationCopy}>
        <small>{notification.createdAt}</small>
        <h2>{notification.title}</h2>
        <p>{notification.body}</p>
        {notification.actionLabel ? <strong>{notification.actionLabel}</strong> : null}
      </div>
      {notification.read ? null : <i aria-label="Nao lida" />}
      {notification.actionHref ? <FaChevronRight aria-hidden="true" /> : null}
    </>
  );

  if (notification.actionHref) {
    return (
      <Link className={styles.notificationCard} href={notification.actionHref}>
        {content}
      </Link>
    );
  }

  return <article className={styles.notificationCard}>{content}</article>;
}

export function NotificationsScreen({
  notifications,
}: {
  notifications: Notification[];
}) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.homeScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <motion.div
          animate="visible"
          className={`${styles.content} ${styles.notificationContent}`}
          initial="hidden"
          variants={containerMotion}
        >
          <motion.header className={styles.notificationHeader} variants={riseMotion}>
            <Link aria-label="Voltar para inicio" href="/">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Notificacoes</h1>
            <span>
              <FaBell aria-hidden="true" />
              {unreadCount ? <b>{unreadCount}</b> : null}
            </span>
          </motion.header>

          <motion.section className={styles.notificationHero} variants={riseMotion}>
            <small>Central SUWAVE</small>
            <h2>{unreadCount ? `${unreadCount} avisos novos` : "Tudo em dia"}</h2>
            <p>Acompanhe pedidos, pagamentos, anuncios e mensagens importantes em um so lugar.</p>
          </motion.section>

          <motion.div
            aria-label="Lista de notificacoes"
            className={styles.notificationList}
            variants={containerMotion}
          >
            {notifications.map((notification) => (
              <motion.div key={notification.id} variants={riseMotion}>
                <NotificationCard notification={notification} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
