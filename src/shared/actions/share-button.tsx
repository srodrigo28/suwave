import { FaShareAlt } from "react-icons/fa";

type ShareButtonProps = {
  ariaLabel: string;
  className?: string;
};

export function ShareButton({ ariaLabel, className }: ShareButtonProps) {
  return (
    <button aria-label={ariaLabel} className={className} type="button">
      <FaShareAlt aria-hidden="true" />
    </button>
  );
}
