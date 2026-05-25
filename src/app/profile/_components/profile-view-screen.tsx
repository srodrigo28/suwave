"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaBirthdayCake,
  FaCheckCircle,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
  FaPen,
  FaShieldAlt,
  FaSignOutAlt,
  FaStar,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { ShareButton } from "@/shared/actions/share-button";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { dateIsoToDisplay, maskCpf, maskWhatsapp } from "@/shared/forms/masks";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/_components/suwave-home.module.css";

function fallback(value?: string) {
  return value?.trim() ? value : "Nao informado";
}

function initials(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (!parts.length) {
    return "SU";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function maskDocument(value?: string) {
  const masked = maskCpf(value ?? "");

  if (!masked) {
    return "Nao informado";
  }

  return "***.***.***-**";
}

function ProfileInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.profileInfo}>
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export function ProfileViewScreen() {
  const router = useRouter();
  const accountDraft = useAuthStore((state) => state.accountDraft);
  const clearLocalSession = useAuthStore((state) => state.clearLocalSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const profileDraft = useAuthStore((state) => state.profileDraft);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/announce");
    }
  }, [isAuthenticated, router]);

  const fullName = fallback(profileDraft.fullName ?? accountDraft.fullName);
  const email = fallback(accountDraft.email);
  const emailStatus = accountDraft.emailVerified ? "Verificado" : "Pendente";
  const accountStatus = accountDraft.accountVerified ? "Ativa (Verificado)" : "Ativa (Pendente)";
  const whatsapp = fallback(maskWhatsapp(profileDraft.whatsapp ?? accountDraft.whatsapp ?? ""));
  const city = fallback(profileDraft.city);
  const birthDate = fallback(dateIsoToDisplay(profileDraft.birthDate));
  const avatarUrl = profileDraft.avatarUrl;

  const confirmLogout = () => {
    clearLocalSession();
    setIsLogoutModalOpen(false);
    router.replace("/auth/announce");
  };

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.homeScreen}
      initial={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <motion.section
        animate="visible"
        className={`${styles.content} ${styles.profileViewContent}`}
        initial="hidden"
        variants={containerMotion}
      >
        <motion.header className={styles.profileViewHeader} variants={riseMotion}>
          <Link aria-label="Voltar" href="/more">
            <FaArrowLeft aria-hidden="true" />
          </Link>
          <ShareButton ariaLabel="Compartilhar perfil" className={styles.profileHeaderAction} />
        </motion.header>

        <motion.section className={styles.profileHero} variants={riseMotion}>
          <div className={styles.profileAvatar}>
            {avatarUrl ? (
              <Image alt="" fill sizes="210px" src={avatarUrl} unoptimized />
            ) : (
              <strong>{initials(fullName)}</strong>
            )}
          </div>
          <span className={styles.profileOnline}>
            <i />
            Online
          </span>
          <h1>{fullName}</h1>
          <p>
            <b>4,8</b>
            <FaStar aria-hidden="true" />
            <span>(128 avaliacoes)</span>
          </p>
          <small>Membro desde 2022</small>
        </motion.section>

        {!profileCompleted ? (
          <motion.div className={styles.profileIncomplete} variants={riseMotion}>
            <FaShieldAlt aria-hidden="true" />
            <span>Complete seu perfil para aumentar a confianca nos seus anuncios.</span>
            <Link href="/auth/profile">Completar</Link>
          </motion.div>
        ) : null}

        <motion.div className={styles.profilePanelGrid} variants={containerMotion}>
          <motion.section className={styles.profilePanel} variants={riseMotion}>
            <h2>Dados do Perfil</h2>
            <ProfileInfo icon={<FaIdCard aria-hidden="true" />} label="CPF" value={maskDocument(profileDraft.cpf)} />
            <ProfileInfo icon={<FaBirthdayCake aria-hidden="true" />} label="Data de Nascimento" value={birthDate} />
          </motion.section>

          <motion.section className={styles.profilePanel} variants={riseMotion}>
            <h2>Contatos</h2>
            <ProfileInfo icon={<FaWhatsapp aria-hidden="true" />} label="WhatsApp" value={whatsapp} />
          </motion.section>

          <motion.section className={styles.profilePanel} variants={riseMotion}>
            <h2>Localizacao</h2>
            <ProfileInfo icon={<FaMapMarkerAlt aria-hidden="true" />} label="Cidade" value={city} />
          </motion.section>

          <motion.section className={styles.profilePanel} variants={riseMotion}>
            <h2>Seguranca</h2>
            <ProfileInfo icon={<FaEnvelope aria-hidden="true" />} label="Email" value={`${email} (${emailStatus})`} />
            <ProfileInfo
              icon={<FaCheckCircle aria-hidden="true" />}
              label="Status da Conta"
              value={accountStatus}
            />
          </motion.section>
        </motion.div>

        <motion.section className={styles.profileAbout} variants={riseMotion}>
          <h2>Sobre Mim</h2>
          <p>
            Perfil Suwave pronto para comprar, vender e conversar com seguranca.
          </p>
        </motion.section>

        <motion.div className={styles.profileActions} variants={riseMotion}>
          <Link href="/auth/profile?mode=edit">
            <FaPen aria-hidden="true" />
            Editar Perfil
          </Link>
          <button onClick={() => setIsLogoutModalOpen(true)} type="button">
            <FaSignOutAlt aria-hidden="true" />
            Sair da conta
          </button>
        </motion.div>

        <motion.aside className={styles.profileSecurityTip} variants={riseMotion}>
          <FaShieldAlt aria-hidden="true" />
          <div>
            <strong>Atencao a sua seguranca!</strong>
            <p>Mantenha seus dados atualizados e use senhas seguras.</p>
          </div>
        </motion.aside>
      </motion.section>
      {isLogoutModalOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.logoutModalOverlay}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.section
            animate={{ scale: 1, y: 0 }}
            aria-modal="true"
            className={styles.logoutModal}
            initial={{ scale: 0.94, y: 18 }}
            role="dialog"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              aria-label="Fechar"
              className={styles.logoutModalClose}
              onClick={() => setIsLogoutModalOpen(false)}
              type="button"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <span className={styles.logoutModalIcon}>
              <FaSignOutAlt aria-hidden="true" />
            </span>
            <h2>Sair da conta?</h2>
            <p>Voce sera desconectado deste dispositivo.</p>
            <div className={styles.logoutModalActions}>
              <button onClick={() => setIsLogoutModalOpen(false)} type="button">
                Cancelar
              </button>
              <button onClick={confirmLogout} type="button">
                Sair
              </button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
      <BottomNavigation />
    </motion.div>
  );
}
