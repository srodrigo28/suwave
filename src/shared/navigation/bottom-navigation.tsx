"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { FaBars, FaBox, FaHome, FaPlus, FaWhatsapp } from "react-icons/fa";
import styles from "@/app/_components/suwave-home.module.css";

type NavigationItem = {
  href: string;
  icon: IconType;
  name: string;
  floating?: boolean;
};

const navigationItems: NavigationItem[] = [
  { href: "/", icon: FaHome, name: "Inicio" },
  { href: "/", icon: FaWhatsapp, name: "Ajuda" },
  { href: "/listings", icon: FaPlus, name: "Anunciar", floating: true },
  { href: "/", icon: FaBox, name: "Pedidos" },
  { href: "/jobs", icon: FaBars, name: "Mais" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav} aria-label="Navegacao principal">
      {navigationItems.map(({ href, icon: Icon, name, floating }) => {
        const active = isActivePath(pathname, href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`${styles.navItem} ${active ? styles.navActive : ""} ${
              floating ? styles.navFloating : ""
            }`}
            href={href}
            key={name}
          >
            <span>
              <Icon aria-hidden="true" />
            </span>
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
