"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import styles from "./suwave-home.module.css";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type AppShellProps = {
  children: React.ReactNode;
  showSplash?: boolean;
};

const splashSessionKey = "suwave-splash-seen";

function isIOSDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function SplashScreen() {
  return (
    <motion.div
      className={styles.splash}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <div className={styles.splashWordmark}>
        <span>SUWAVE</span>
        <i aria-hidden="true" />
      </div>
    </motion.div>
  );
}

function DeviceStatusBar() {
  return (
    <div className={styles.statusBar} aria-label="Status do aparelho">
      <strong>9:41</strong>
      <div className={styles.island}>
        <span />
      </div>
      <div className={styles.deviceSignals}>
        <span className={styles.signal} />
        <span className={styles.wifi} />
        <span className={styles.battery} />
      </div>
    </div>
  );
}

function InstallSheet({
  canInstall,
  isIOS,
  onClose,
  onInstall,
}: {
  canInstall: boolean;
  isIOS: boolean;
  onClose: () => void;
  onInstall: () => void;
}) {
  return (
    <div className={styles.installOverlay}>
      <motion.aside
        animate={{ opacity: 1, y: 0 }}
        aria-label="Instalar Suwave"
        className={styles.installSheet}
        exit={{ opacity: 0, y: 32 }}
        initial={{ opacity: 0, y: 36 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <button
          aria-label="Fechar convite de instalacao"
          className={styles.installClose}
          onClick={onClose}
          type="button"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className={styles.installLead}>
          <span className={styles.installMark}>
            <Image
              alt=""
              fill
              sizes="54px"
              src="/suwave-logo-transparent.png"
            />
          </span>
          <div>
            <strong>Instalar Suwave</strong>
            <p>Abra mais rapido e use como aplicativo no celular.</p>
          </div>
        </div>

        {isIOS ? (
          <p className={styles.installHint}>
            No iPhone, toque em Compartilhar e depois em Adicionar a Tela de Inicio.
          </p>
        ) : !canInstall ? (
          <p className={styles.installHint}>
            Se o navegador nao abrir a instalacao, use o menu e toque em Instalar app.
          </p>
        ) : null}

        <div className={styles.installActions}>
          <button onClick={onClose} type="button">
            Agora nao
          </button>
          <button onClick={onInstall} type="button">
            <FaDownload aria-hidden="true" />
            {canInstall ? "Instalar" : "Entendi"}
          </button>
        </div>
      </motion.aside>
    </div>
  );
}

export function AppShell({ children, showSplash = false }: AppShellProps) {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [isIOS] = useState(isIOSDevice);
  const [isSplashVisible, setIsSplashVisible] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      return;
    }

    if (window.sessionStorage.getItem(splashSessionKey)) {
      return;
    }

    window.sessionStorage.setItem(splashSessionKey, "true");
    const splashStartTimer = window.setTimeout(() => setIsSplashVisible(true), 0);
    const splashTimer = window.setTimeout(() => setIsSplashVisible(false), 1700);

    return () => {
      window.clearTimeout(splashStartTimer);
      window.clearTimeout(splashTimer);
    };
  }, [showSplash]);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const isMobileViewport = window.matchMedia("(max-width: 560px)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isStandalone || !isMobileViewport || !isTouchDevice) {
      return;
    }

    const sheetTimer = window.setTimeout(() => setShowInstallSheet(true), 700);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
      setShowInstallSheet(true);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setShowInstallSheet(false);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.clearTimeout(sheetTimer);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS || !installPrompt) {
      setShowInstallSheet(false);
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallSheet(false);
  };

  return (
    <main className={styles.stage}>
      <motion.section
        animate={isSplashVisible ? "hidden" : "visible"}
        className={styles.phone}
        initial="hidden"
      >
        <div className={`${styles.screen} ${isSplashVisible ? styles.splashActive : ""}`}>
          <DeviceStatusBar />
          {children}
          <AnimatePresence>{isSplashVisible ? <SplashScreen /> : null}</AnimatePresence>
        </div>
      </motion.section>
      <AnimatePresence>
        {showInstallSheet && !isSplashVisible ? (
          <InstallSheet
            canInstall={Boolean(installPrompt)}
            isIOS={isIOS}
            onClose={() => setShowInstallSheet(false)}
            onInstall={handleInstall}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
