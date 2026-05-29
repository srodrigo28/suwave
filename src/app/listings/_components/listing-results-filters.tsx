"use client";

import { FaFilter, FaSearch } from "react-icons/fa";
import styles from "@/app/listings/_components/listing-flow.module.css";

export type ListingFilterOption = {
  label: string;
  value: string;
};

type ListingResultsFiltersProps = {
  activeFilter: string;
  ariaLabel: string;
  filters: ListingFilterOption[];
  resultCount: number;
  searchLabel: string;
  searchValue: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export function ListingResultsFilters({
  activeFilter,
  ariaLabel,
  filters,
  resultCount,
  searchLabel,
  searchValue,
  onFilterChange,
  onSearchChange,
}: ListingResultsFiltersProps) {
  const activeLabel = filters.find((filter) => filter.value === activeFilter)?.label ?? "Todas";

  return (
    <section className={styles.filterPanel} aria-label={ariaLabel}>
      <label className={styles.searchBar}>
        <FaSearch aria-hidden="true" />
        <input
          aria-label={searchLabel}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchLabel}
          type="search"
          value={searchValue}
        />
      </label>

      <div className={styles.filterTabs} aria-label={ariaLabel}>
        {filters.map((filter) => (
          <button
            className={filter.value === activeFilter ? styles.filterTabActive : ""}
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.filterSummary}>
        <span className={styles.resultCount}>{resultCount} resultados</span>
        <span className={styles.filterChip}>
          <FaFilter aria-hidden="true" />
          {activeLabel}
        </span>
      </div>
    </section>
  );
}
