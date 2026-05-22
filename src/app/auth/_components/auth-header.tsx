import { BackButton } from "@/shared/navigation/back-button";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import styles from "./auth-flow.module.css";

export function AuthHeader({ backHref, title }: { backHref: string; title: string }) {
  return (
    <header className={styles.authHeader}>
      <BackButton ariaLabel="Voltar" href={backHref} />
      <h1>{title}</h1>
      <Link aria-label="Sair para inicio" className={styles.authClose} href="/">
        <FaTimes aria-hidden="true" />
      </Link>
    </header>
  );
}
