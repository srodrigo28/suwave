import Link from "next/link";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import styles from "@/app/food/_components/food.module.css";
import { getFoodCartSummary } from "@/repositories/food-repository";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export default function FoodReviewPage() {
  const summary = getFoodCartSummary();

  return (
    <AppShell>
      <section className={styles.foodScreen}>
        <div className={styles.foodScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para sacola" href="/food/bag" />
            <h1>Revisar pedido</h1>
            <span />
          </header>

          <section className={styles.panel}>
            <h2>Entrega</h2>
            <p>35-45 min · Entrega parceira</p>
            <p><FaMapMarkerAlt aria-hidden="true" /> Rua das Primaveras, 220 - Centro</p>
          </section>

          <section className={styles.panel}>
            <h2>Pagamento</h2>
            <p>Pix · {summary.total}</p>
          </section>

          <section className={styles.summaryList}>
            <span className={styles.summaryRow}><span>Subtotal</span><strong>{summary.subtotal}</strong></span>
            <span className={styles.summaryRow}><span>Taxa</span><strong>{summary.fee}</strong></span>
            <span className={styles.summaryRow}><span>Cupom</span><strong>{summary.discount}</strong></span>
            <span className={styles.summaryRow}><span>Total</span><strong>{summary.total}</strong></span>
          </section>
        </div>
        <div className={styles.stickyBar}>
          <Link className={styles.secondaryAction} href="/food/bag">Alterar pedido</Link>
          <Link className={styles.primaryAction} href="/orders/pedido-lanche-salamanca-8391">
            <FaCheckCircle aria-hidden="true" />
            Fazer pedido
          </Link>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
