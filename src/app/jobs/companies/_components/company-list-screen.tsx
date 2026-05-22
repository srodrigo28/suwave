"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaChevronRight, FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { CompanyLogo } from "@/app/companies/_components/company-logo";
import type { Company } from "@/models/company";
import { BackButton } from "@/shared/navigation/back-button";
import {
  containerMotion,
  riseMotion,
} from "@/shared/motion/motion-variants";
import styles from "@/app/_components/suwave-home.module.css";

export function CompanyListScreen({ companies }: { companies: Company[] }) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.jobsScreen}
      initial={{ opacity: 0, x: 28 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <header className={styles.jobsHeader}>
        <BackButton ariaLabel="Voltar para categorias" href="/jobs" />
        <h1>Vagas abertas</h1>
        <button aria-label="Filtrar vagas" type="button">
          <FaFilter aria-hidden="true" />
        </button>
      </header>

      <label className={styles.jobsSearch}>
        <FaSearch aria-hidden="true" />
        <span>Buscar empresas ou vagas</span>
      </label>

      <motion.section
        animate="visible"
        className={styles.companyList}
        initial="hidden"
        variants={containerMotion}
      >
        {companies.map((company) => (
          <motion.div key={company.slug} variants={riseMotion} whileTap={{ scale: 0.985 }}>
            <Link
              className={`${styles.companyRow} ${
                company.featured ? styles.companyFeatured : ""
              }`}
              href={`/companies/${company.slug}`}
            >
              <CompanyLogo brand={company.brand} />
              <span className={styles.companyCopy}>
                <strong>{company.name}</strong>
                <small>{company.segment}</small>
                <em>
                  <FaMapMarkerAlt aria-hidden="true" />
                  {company.place}
                </em>
              </span>
              <FaChevronRight className={styles.companyArrow} aria-hidden="true" />
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
}
