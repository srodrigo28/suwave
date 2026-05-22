import { FaShoppingCart } from "react-icons/fa";
import type { CompanyBrand } from "@/models/company";
import styles from "@/app/_components/suwave-home.module.css";

export function CompanyLogo({ brand }: { brand: CompanyBrand }) {
  if (brand === "bino") {
    return (
      <span className={`${styles.companyLogo} ${styles.binoLogo}`}>
        <FaShoppingCart aria-hidden="true" />
        <b>BINO</b>
      </span>
    );
  }

  if (brand === "shell") {
    return (
      <span className={`${styles.companyLogo} ${styles.shellLogo}`}>
        <i />
      </span>
    );
  }

  if (brand === "guia") {
    return (
      <span className={`${styles.companyLogo} ${styles.guiaLogo}`}>
        <b>GUIA</b>
        <i />
      </span>
    );
  }

  if (brand === "lincoln") {
    return (
      <span className={`${styles.companyLogo} ${styles.lincolnLogo}`}>
        <i />
        <b>LINCOLN</b>
      </span>
    );
  }

  return (
    <span className={`${styles.companyLogo} ${styles.teresaLogo}`}>
      <i />
      <b>Teresa</b>
    </span>
  );
}
