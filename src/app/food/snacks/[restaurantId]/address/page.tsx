import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import styles from "@/app/food/_components/food.module.css";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export default function ConfirmAddressPage() {
  return (
    <AppShell>
      <section className={styles.foodScreen}>
        <div className={styles.foodScroll}>
          <div className={styles.hero} />
        </div>
        <div className={styles.addressSheet}>
          <section>
            <h1>Seu endereco esta certo?</h1>
            <p>O endereco nao e o mesmo da sua localizacao, confira antes de continuar.</p>
            <article className={styles.addressCard}>
              <strong><FaMapMarkerAlt aria-hidden="true" /> Rua das Primaveras, 220</strong>
              <p>Centro · Sinop - MT · Casa 2</p>
            </article>
            <div className={styles.addressActions}>
              <Link className={styles.secondaryAction} href="/location">Trocar endereco</Link>
              <Link className={styles.primaryAction} href="/food/bag">Continuar assim</Link>
            </div>
          </section>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
