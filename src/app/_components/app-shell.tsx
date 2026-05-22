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
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.46, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        className={styles.splashLogo}
        initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.34 }}
      >
        <Image
          alt="Logo Suwave"
          height={312}
          priority
          src="/suwave-logo-transparent.png"
          width={312}
        />
      </motion.div>
      <motion.i
        animate={{ scaleX: 1 }}
        initial={{ scaleX: 0 }}
        transition={{ delay: 0.28, duration: 0.8, ease: "easeInOut" }}
      />
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
  const [isSplashVisible, setIsSplashVisible] = useState(showSplash);

  useEffect(() => {
    if (!showSplash) {
      return;
    }

    const splashTimer = window.setTimeout(() => setIsSplashVisible(false), 1550);

    return () => window.clearTimeout(splashTimer);
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
      <AnimatePresence>{isSplashVisible ? <SplashScreen /> : null}</AnimatePresence>
      <motion.section
        animate={isSplashVisible ? "hidden" : "visible"}
        className={styles.phone}
        initial="hidden"
      >
        <div className={styles.screen}>
          <DeviceStatusBar />
          {children}
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
