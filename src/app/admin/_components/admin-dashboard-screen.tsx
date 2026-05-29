import Link from "next/link";
import {
  FaArrowLeft,
  FaBell,
  FaChartLine,
  FaChevronRight,
  FaClipboardCheck,
  FaCog,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminDashboard, AdminMetricTone } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./admin-dashboard.module.css";

const metricClass: Record<AdminMetricTone, string> = {
  blue: styles.metricBlue,
  green: styles.metricGreen,
  red: styles.metricRed,
  yellow: styles.metricYellow,
};

export function AdminDashboardScreen({ dashboard }: { dashboard: AdminDashboard }) {
  return (
    <AppShell>
      <section className={styles.adminScreen}>
        <div className={styles.adminScroll}>
          <header className={styles.adminHeader}>
            <Link aria-label="Voltar para menu mais" href="/more">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <div>
              <small>Operacao SUWAVE</small>
              <h1>Admin</h1>
            </div>
            <button aria-label="Configurar permissoes" type="button">
              <FaCog aria-hidden="true" />
            </button>
          </header>

          <section className={styles.controlStrip} aria-label="Resumo operacional">
            <span>
              <FaShieldAlt aria-hidden="true" />
              Super admin
            </span>
            <span>
              <FaBell aria-hidden="true" />
              17 alertas
            </span>
          </section>

          <section className={styles.metricGrid} aria-label="Metricas do admin">
            {dashboard.metrics.map((metric) => (
              <article className={`${styles.metricCard} ${metricClass[metric.tone]}`} key={metric.id}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
                <p>{metric.helper}</p>
              </article>
            ))}
          </section>

          <section className={styles.sectionPanel} aria-label="Areas do admin">
            <header>
              <h2>CRUD principal</h2>
              <FaClipboardCheck aria-hidden="true" />
            </header>
            <div className={styles.sectionGrid}>
              {dashboard.sections.map((section) => (
                <Link className={styles.adminSection} href={section.href} key={section.id}>
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.summary}</small>
                  </span>
                  <em>{section.pending}</em>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.queuePanel} aria-label="Fila de trabalho">
            <header>
              <h2>Fila de moderacao</h2>
              <FaExclamationTriangle aria-hidden="true" />
            </header>
            <div className={styles.queueList}>
              {dashboard.queue.map((item) => (
                <article className={styles.queueItem} key={item.id}>
                  <span className={`${styles.priority} ${styles[item.priority]}`}>{item.priority}</span>
                  <div>
                    <small>{item.area} - {item.age}</small>
                    <strong>{item.title}</strong>
                    <p>{item.owner} - {item.status}</p>
                  </div>
                  <button aria-label={`Abrir ${item.title}`} type="button">
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.rolesPanel} aria-label="Permissoes">
            <header>
              <h2>Permissoes</h2>
              <FaUsers aria-hidden="true" />
            </header>
            <div>
              {dashboard.roles.map((role) => (
                <span className={styles.rolePill} key={role.id}>
                  <b>{role.label}</b>
                  {role.scope}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.reportsPanel} aria-label="Relatorios">
            <FaChartLine aria-hidden="true" />
            <div>
              <strong>Relatorios e logs</strong>
              <p>Base pronta para vendas, usuarios, pedidos, financeiro, moderacao e auditoria.</p>
            </div>
          </section>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
