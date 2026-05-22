import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

type BackButtonProps = {
  ariaLabel: string;
  className?: string;
  href: string;
};

export function BackButton({ ariaLabel, className, href }: BackButtonProps) {
  return (
    <Link aria-label={ariaLabel} className={className} href={href}>
      <FaChevronLeft aria-hidden="true" />
    </Link>
  );
}
