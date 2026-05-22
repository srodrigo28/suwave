"use client";

import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FaBoxes,
  FaBreadSlice,
  FaBroom,
  FaCashRegister,
  FaChevronRight,
  FaClock,
  FaGlobe,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaStore,
  FaUserGraduate,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { CompanyLogo } from "@/app/companies/_components/company-logo";
import type { Company } from "@/models/company";
import type { JobVacancy, JobVacancyIcon } from "@/models/job";
import { ShareButton } from "@/shared/actions/share-button";
import { BackButton } from "@/shared/navigation/back-button";
import {
  containerMotion,
  riseMotion,
} from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "@/app/_components/suwave-home.module.css";

const vacancyIcons: Record<JobVacancyIcon, IconType> = {
  "bread": FaBreadSlice,
  "boxes": FaBoxes,
  "broom": FaBroom,
  "cash-register": FaCashRegister,
  "student": FaUserGraduate,
};

function VacancyRow({ vacancy }: { vacancy: JobVacancy }) {
  const Icon = vacancyIcons[vacancy.icon];

  return (
    <motion.article className={styles.vacancyRow} variants={riseMotion}>
      <span className={`${styles.vacancyIcon} ${styles[vacancy.tone]}`}>
        <Icon aria-hidden="true" />
      </span>
      <span className={styles.vacancyCopy}>
        <strong>{vacancy.title}</strong>
        <small>
          <FaUsers aria-hidden="true" />
          {vacancy.role}
        </small>
        <em>
          <FaClock aria-hidden="true" />
          {vacancy.schedule}
        </em>
      </span>
      <button type="button">Enviar mensagem</button>
    </motion.article>
  );
}

export function CompanyDetailsScreen({
  company,
  vacancies,
}: {
  company: Company;
  vacancies: JobVacancy[];
}) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.companyScreen}
      initial={{ opacity: 0, x: 28 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.companyContent}>
        <header className={styles.companyHeader}>
          <BackButton ariaLabel="Voltar para vagas" href="/jobs/companies" />
          <h1>{company.name}</h1>
          <ShareButton ariaLabel="Compartilhar empresa" />
        </header>

        <section className={styles.companyIntro}>
          <CompanyLogo brand={company.brand} />
          <span>
            <strong>{company.name}</strong>
            <small>{company.segment}</small>
            <em>
              <FaMapMarkerAlt aria-hidden="true" />
              {company.place}
            </em>
          </span>
          <FaChevronRight aria-hidden="true" />
        </section>

        {company.brand === "bino" ? (
          <button className={styles.binoVacancyBanner} type="button">
            <FaShoppingCart aria-hidden="true" />
            <b>BINO</b>
            <strong>VAGAS ABERTAS</strong>
            <small>Clique aqui, saiba mais</small>
          </button>
        ) : null}

        <section className={styles.companyAbout}>
          <h2>Sobre a empresa</h2>
          {company.summary ? <p>{company.summary}</p> : null}

          <dl>
            <div>
              <dt>
                <FaStore aria-hidden="true" />
                Segmento
              </dt>
              <dd>{company.segment}</dd>
            </div>
            {company.employeeRange ? (
              <div>
                <dt>
                  <FaUsers aria-hidden="true" />
                  Funcionarios
                </dt>
                <dd>{company.employeeRange}</dd>
              </div>
            ) : null}
            {company.hours ? (
              <div>
                <dt>
                  <FaClock aria-hidden="true" />
                  Horario de funcionamento
                </dt>
                <dd>{company.hours}</dd>
              </div>
            ) : null}
            {company.phone ? (
              <div>
                <dt>
                  <FaWhatsapp aria-hidden="true" />
                  WhatsApp
                </dt>
                <dd>{company.phone}</dd>
              </div>
            ) : null}
            {company.site ? (
              <div>
                <dt>
                  <FaGlobe aria-hidden="true" />
                  Site
                </dt>
                <dd>{company.site}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        <motion.section
          animate="visible"
          className={styles.vacancySection}
          initial="hidden"
          variants={containerMotion}
        >
          <h2>Vagas disponiveis</h2>
          {vacancies.map((vacancy) => (
            <VacancyRow key={vacancy.title} vacancy={vacancy} />
          ))}
        </motion.section>
      </div>
      <BottomNavigation />
    </motion.div>
  );
}
