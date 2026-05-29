"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Notification } from "@/models/notification";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import styles from "@/app/_components/suwave-home.module.css";

function NotificationCard({ notification }: { notification: Notification }) {
  const Icon = notification.icon;
  const content = (
    <>
      <span className={`${styles.notificationIcon} ${styles[notification.tone]}`}>
        <Icon aria-hidden="true" />
      </span>
      <div className={styles.notificationCopy}>
        <h2>{notification.title}</h2>
        <p>{notification.body}</p>
      </div>
      <span className={styles.notificationMeta}>
        <small>{notification.createdAt}</small>
        {notification.read ? null : <i aria-label="Nao lida" />}
      </span>
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
            <span />
            <h1>Notificacoes</h1>
            <Link aria-label="Fechar notificacoes" href="/">
              <FaTimes aria-hidden="true" />
            </Link>
          </motion.header>

          <motion.section className={styles.notificationSearch} variants={riseMotion}>
            <FaSearch aria-hidden="true" />
            <span>Buscar nas notificacoes...</span>
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

          <motion.footer className={styles.notificationLegend} variants={riseMotion}>
            <span>
              <i />
              Nao lida
            </span>
            <span>
              <i />
              Lida
            </span>
          </motion.footer>
        </motion.div>
      </motion.section>
    </AppShell>
  );
}
