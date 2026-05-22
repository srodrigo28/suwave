"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { Listing } from "@/models/listing";
import { riseMotion } from "@/shared/motion/motion-variants";
import styles from "@/app/_components/suwave-home.module.css";

const listingImageClasses = {
  house: styles.house,
  outfit: styles.outfit,
  phonePair: styles.phonePair,
  "pickup-black": styles.phonePair,
  "pickup-white": styles.phonePair,
  pizza: styles.pizza,
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.article className={styles.listing} variants={riseMotion}>
      <div className={styles.listingImage}>
        {listing.badge ? <b>{listing.badge}</b> : null}
        <Image
          alt=""
          className={listingImageClasses[listing.imageKind]}
          fill
          sizes="(max-width: 640px) 42vw, 220px"
          src={listing.image}
        />
      </div>
      <div className={styles.listingCopy}>
        <h2>{listing.title}</h2>
        <strong>{listing.price}</strong>
        <p>
          <FaMapMarkerAlt aria-hidden="true" />
          {listing.place}
        </p>
      </div>
    </motion.article>
  );
}
