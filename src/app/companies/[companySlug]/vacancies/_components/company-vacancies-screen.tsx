"use client";

import { motion } from "motion/react";
import type { Company } from "@/models/company";
import type { JobVacancy } from "@/models/job";
import { ShareButton } from "@/shared/actions/share-button";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import {
  containerMotion,
  riseMotion,
} from "@/shared/motion/motion-variants";
import { VacancyRow } from "../../_components/company-details-screen";
import styles from "@/app/_components/suwave-home.module.css";

export function CompanyVacanciesScreen({
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
      <div className={`${styles.companyContent} ${styles.vacancyContinuation}`}>
        <header className={styles.companyHeader}>
          <BackButton
            ariaLabel={`Voltar para ${company.name}`}
            href={`/companies/${company.slug}`}
          />
          <h1>{company.name}</h1>
          <ShareButton ariaLabel="Compartilhar empresa" />
        </header>

        <motion.section
          animate="visible"
          className={styles.vacancySection}
          initial="hidden"
          variants={containerMotion}
        >
          <motion.h2 variants={riseMotion}>
            Vagas disponiveis (continuacao)
          </motion.h2>
          {vacancies.map((vacancy) => (
            <VacancyRow key={vacancy.title} vacancy={vacancy} />
          ))}
        </motion.section>
      </div>
      <BottomNavigation />
    </motion.div>
  );
}
