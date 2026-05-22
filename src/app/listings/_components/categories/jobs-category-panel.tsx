import Link from "next/link";
import { jobCategoryItems } from "@/app/jobs/_components/job-category-items";
import styles from "../listing-flow.module.css";

export function JobsCategoryPanel() {
  return (
    <section className={styles.jobsCategoryPanel} aria-label="Categorias de empregos">
      {jobCategoryItems.map(({ href, icon: Icon, id, name }) =>
        href ? (
          <Link
            className={`${styles.jobsCategory} ${styles.jobsCategoryActive}`}
            href={href}
            key={id}
          >
            <span>
              <Icon aria-hidden="true" />
            </span>
            {name}
          </Link>
        ) : (
          <button className={styles.jobsCategory} key={id} type="button">
            <span>
              <Icon aria-hidden="true" />
            </span>
            {name}
          </button>
        ),
      )}
    </section>
  );
}
