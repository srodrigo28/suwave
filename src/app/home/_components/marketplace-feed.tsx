"use client";

import { motion } from "motion/react";
import type { Listing } from "@/models/listing";
import {
  containerMotion,
  riseMotion,
} from "@/shared/motion/motion-variants";
import { ListingCard } from "./listing-card";
import styles from "@/app/_components/suwave-home.module.css";

export function MarketplaceFeed({ listings }: { listings: Listing[] }) {
  return (
    <motion.section className={styles.feed} variants={riseMotion}>
      <h2>Confira o que temos para você</h2>
      <motion.div className={styles.listings} variants={containerMotion}>
        {listings.map((listing) => (
          <ListingCard key={listing.title} listing={listing} />
        ))}
      </motion.div>
    </motion.section>
  );
}
