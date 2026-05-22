"use client";

import { motion } from "motion/react";
import { AppShell } from "@/app/_components/app-shell";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./auth-flow.module.css";

export function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.authScreen}
        initial={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className={styles.authScroll}>{children}</div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
