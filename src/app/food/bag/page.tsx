import Link from "next/link";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import styles from "@/app/food/_components/food.module.css";
import { getFoodCartSummary, getSalamancaCombo } from "@/repositories/food-repository";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export default function FoodBagPage() {
  const combo = getSalamancaCombo();
  const summary = getFoodCartSummary();

  return (
    <AppShell>
      <section className={styles.foodScreen}>
        <div className={styles.foodScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para cardapio" href="/food/snacks/hamburgueria-salamanca-cadore" />
            <h1>Sacola</h1>
            <span />
          </header>

          <section className={styles.panel}>
            <h2>Hamburgueria Salamanca Ca&apos;dore</h2>
            <article className={styles.cartItem}>
              <strong>{combo.title}</strong>
              <p>Smash classico, batata pequena, molho verde e refrigerante.</p>
              <small>{combo.price}</small>
              <div className={styles.cartActions}>
                <button aria-label="Diminuir" type="button"><FaMinus aria-hidden="true" /></button>
                <button aria-label="Aumentar" type="button"><FaPlus aria-hidden="true" /></button>
                <button aria-label="Remover" type="button"><FaTrash aria-hidden="true" /></button>
              </div>
            </article>
          </section>

          <section className={styles.panel}>
            <h2>Cupom de desconto</h2>
            <Link className={styles.secondaryAction} href="/wallet">Adicionar</Link>
          </section>

          <section className={styles.panel}>
            <h2>Pagamento</h2>
            <p>Pix selecionado</p>
          </section>

          <section className={styles.summaryList}>
            <span className={styles.summaryRow}><span>Subtotal</span><strong>{summary.subtotal}</strong></span>
            <span className={styles.summaryRow}><span>Frete</span><strong>{summary.fee}</strong></span>
            <span className={styles.summaryRow}><span>Cupom</span><strong>{summary.discount}</strong></span>
            <span className={styles.summaryRow}><span>Total</span><strong>{summary.total}</strong></span>
          </section>
        </div>
        <div className={styles.stickyBar}>
          <span className={styles.quantity}>1 item</span>
          <Link className={styles.primaryAction} href="/food/review">Finalizar pedido</Link>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
