import Image from "next/image";
import type { ListingImageKind } from "@/models/listing";
import styles from "./listing-flow.module.css";

type PickupMediaProps = {
  className?: string;
  eager?: boolean;
  imageKind: ListingImageKind;
  sizes?: string;
};

const pickupSources = {
  "pickup-black": "/listings/pickup-black.png",
  "pickup-white": "/listings/pickup-white.png",
};

export function PickupMedia({
  className,
  eager = false,
  imageKind,
  sizes = "(max-width: 560px) 44vw, 220px",
}: PickupMediaProps) {
  const src =
    imageKind === "pickup-white"
      ? pickupSources["pickup-white"]
      : pickupSources["pickup-black"];

  return (
    <span aria-hidden="true" className={`${styles.pickupMedia} ${className ?? ""}`}>
      <Image
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        src={src}
      />
    </span>
  );
}
