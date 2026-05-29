"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaDownload,
  FaEye,
  FaFilter,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { AdminReport, AdminReportStatus } from "@/models/admin";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "../../_components/admin-dashboard.module.css";

const filters: Array<{ label: string; value: AdminReportStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Prontos", value: "ready" },
  { label: "Processando", value: "processing" },
  { label: "Agendados", value: "scheduled" },
];

const statusIcon = {
  processing: FaSyncAlt,
  ready: FaCheckCircle,
  scheduled: FaCalendarAlt,
};

const statusClass = {
  processing: styles.pending,
  ready: styles.approved,
  scheduled: styles.paused,
};

function AdminReportRow({ report }: { report: AdminReport }) {
  const StatusIcon = statusIcon[report.status];

  return (
    <article className={styles.listingRow}>
      <span className={styles.listingThumb}>RP</span>
      <div className={styles.userInfo}>
        <small>{report.owner} - {report.period}</small>
        <strong>{report.name}</strong>
        <p>{report.metric}</p>
        <span>
          <b>{report.trend}</b>
          <b>{report.updatedAt}</b>
        </span>
      </div>
      <em className={`${styles.userStatus} ${statusClass[report.status]}`}>
        <StatusIcon aria-hidden="true" />
        {report.statusLabel}
      </em>
      <div className={styles.userActions}>
        <button aria-label={`Visualizar relatorio ${report.name}`} type="button">
          <FaEye aria-hidden="true" />
        </button>
        <button aria-label={`Baixar relatorio ${report.name}`} type="button">
          <FaDownload aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function AdminReportsScreen({ reports }: { reports: AdminReport[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AdminReportStatus | "all">("all");
  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const haystack = [
          report.name,
          report.owner,
          report.period,
          report.metric,
          report.trend,
          report.statusLabel,
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery = haystack.includes(query.trim().toLowerCase());
        const matchesFilter = activeFilter === "all" || report.status === activeFilter;

        return matchesQuery && matchesFilter;
      }),
    [activeFilter, query, reports],
  );
  const readyCount = reports.filter((report) => report.status === "ready").length;
  const automationCount = reports.filter((report) => report.status !== "ready").length;

  return (
    <AppShell>
      <section className={styles.adminScreen}>
        <div className={styles.adminScroll}>
          <header className={styles.adminHeader}>
            <Link aria-label="Voltar para admin" href="/admin">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <div>
              <small>Admin CRUD</small>
              <h1>Relatorios</h1>
            </div>
            <button aria-label="Filtros de relatorios" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.userToolbar} aria-label="Busca de relatorios">
            <label>
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Buscar relatorios"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, area, periodo, metrica ou tendencia"
                type="search"
                value={query}
              />
            </label>
            <div>
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter.value ? styles.filterActive : ""}
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.userSummary} aria-label="Resumo de relatorios">
            <article>
              <small>Total filtrado</small>
              <strong>{filteredReports.length}</strong>
            </article>
            <article>
              <small>Prontos</small>
              <strong>{readyCount}</strong>
            </article>
            <article>
              <small>Automacoes</small>
              <strong>{automationCount}</strong>
            </article>
          </section>

          <section className={styles.usersPanel} aria-label="Lista de relatorios">
            {filteredReports.length ? (
              filteredReports.map((report) => <AdminReportRow key={report.id} report={report} />)
            ) : (
              <article className={styles.emptyAdminState}>
                <FaChartLine aria-hidden="true" />
                <h2>Nenhum relatorio encontrado</h2>
                <p>Altere a busca ou escolha outro filtro.</p>
              </article>
            )}
          </section>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
