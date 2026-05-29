"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaAppleAlt,
  FaBaby,
  FaBasketballBall,
  FaBicycle,
  FaBriefcase,
  FaBuilding,
  FaCar,
  FaCarrot,
  FaChargingStation,
  FaDog,
  FaDrumstickBite,
  FaGuitar,
  FaHamburger,
  FaHammer,
  FaHeart,
  FaHome,
  FaLaptop,
  FaMedkit,
  FaMobileAlt,
  FaMotorcycle,
  FaNewspaper,
  FaPaintRoller,
  FaPaw,
  FaPen,
  FaPizzaSlice,
  FaPrescriptionBottleAlt,
  FaRing,
  FaSeedling,
  FaShippingFast,
  FaShoppingBasket,
  FaSnowflake,
  FaStore,
  FaTools,
  FaTruck,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWrench,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./listing-flow.module.css";

type Subcategory = {
  href?: string;
  icon: IconType;
  id: string;
  name: string;
  selected?: boolean;
};

type CategoryGroup = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

const categoryGroups: CategoryGroup[] = [
  {
    id: "market",
    name: "Mercado",
    subcategories: [
      { icon: FaStore, id: "supermarket", name: "Supermercado", selected: true },
      { icon: FaCarrot, id: "produce", name: "Verdureira" },
      { icon: FaSeedling, id: "natural", name: "Produto Natural" },
      { icon: FaDrumstickBite, id: "butcher", name: "Acougue" },
      { icon: FaShoppingBasket, id: "wholesale", name: "Atacado" },
    ],
  },
  {
    id: "food",
    name: "Comida e bebida",
    subcategories: [
      { icon: FaUtensils, id: "restaurants", name: "Restaurantes" },
      { icon: FaHamburger, id: "snacks", name: "Lanches" },
      { icon: FaShoppingBasket, id: "drinks", name: "Distribuidora de Bebidas" },
      { icon: FaPizzaSlice, id: "pizza", name: "Pizzarias" },
      { icon: FaAppleAlt, id: "japanese", name: "Japonesa" },
      { icon: FaSnowflake, id: "ice-cream", name: "Sorvete" },
      { icon: FaSeedling, id: "acai", name: "Acai" },
      { icon: FaStore, id: "bakery", name: "Padaria" },
      { icon: FaUtensils, id: "lunch-box", name: "Marmitas" },
      { icon: FaDrumstickBite, id: "skewers", name: "Espetinho de Carnes" },
      { icon: FaHamburger, id: "pastel", name: "Pastel" },
      { icon: FaAppleAlt, id: "cakes", name: "Doces e Bolos" },
    ],
  },
  {
    id: "pharmacy",
    name: "Farmacia",
    subcategories: [
      { icon: FaPrescriptionBottleAlt, id: "medicine", name: "Medicamentos" },
      { icon: FaMedkit, id: "medical-equipment", name: "Equipamentos medicos" },
      { icon: FaHeart, id: "wellness", name: "Saude e bem-estar" },
    ],
  },
  {
    id: "shipping",
    name: "Envios",
    subcategories: [
      {
        href: "/shipping/local",
        icon: FaShippingFast,
        id: "local-delivery",
        name: "Envios dentro da cidade",
      },
      { icon: FaTruck, id: "regional-delivery", name: "Envios fora da cidade" },
    ],
  },
  {
    id: "rides",
    name: "Carona",
    subcategories: [
      { icon: FaCar, id: "city-rides", name: "Carona dentro da cidade" },
      {
        href: "/rides/regional",
        icon: FaCar,
        id: "regional-rides",
        name: "Carona fora da cidade",
      },
    ],
  },
  {
    id: "fashion",
    name: "Moda vestuario",
    subcategories: [
      { icon: FaTshirt, id: "men", name: "Masculino" },
      { icon: FaTshirt, id: "women", name: "Feminino" },
      { icon: FaBaby, id: "kids-fashion", name: "Infantil" },
      { icon: FaRing, id: "accessories-fashion", name: "Acessorios" },
    ],
  },
  {
    id: "services",
    name: "Prestadores de servico",
    subcategories: [
      { icon: FaTools, id: "builders", name: "Pedreiros" },
      { icon: FaWrench, id: "mechanics", name: "Mecanicos" },
      { icon: FaPaintRoller, id: "painters", name: "Pintores" },
      { icon: FaHeart, id: "beauty", name: "Cabeleireiras" },
    ],
  },
  {
    id: "jobs",
    name: "Empregos",
    subcategories: [
      { href: "/jobs", icon: FaBriefcase, id: "job-categories", name: "Categorias de vagas" },
      { href: "/jobs/companies", icon: FaBuilding, id: "companies", name: "Empresas" },
      { icon: FaPen, id: "resume", name: "Curriculo" },
    ],
  },
  {
    id: "properties",
    name: "Venda e locacao de imoveis",
    subcategories: [
      { icon: FaHome, id: "houses", name: "Casas" },
      { icon: FaBuilding, id: "apartments", name: "Apartamentos" },
      { icon: FaSeedling, id: "farms", name: "Chacaras" },
      { icon: FaStore, id: "commercial", name: "Comercial" },
    ],
  },
  {
    id: "automotive",
    name: "Automoveis",
    subcategories: [
      { icon: FaBicycle, id: "bicycle", name: "Bicicleta" },
      { icon: FaMotorcycle, id: "motorcycles", name: "Motos" },
      { icon: FaCar, id: "cars", name: "Carros" },
      {
        href: "/listings/vehicles/pickups",
        icon: FaTruck,
        id: "pickups",
        name: "Caminhonetes",
        selected: true,
      },
      { icon: FaTruck, id: "trucks", name: "Caminhoes" },
      { icon: FaCar, id: "vans", name: "Onibus / Vans" },
    ],
  },
  {
    id: "secondhand",
    name: "Desapego",
    subcategories: [
      { icon: FaStore, id: "used-products", name: "Produtos usados" },
      { icon: FaHome, id: "home-items", name: "Itens de casa" },
      { icon: FaTshirt, id: "used-clothes", name: "Roupas" },
    ],
  },
  {
    id: "news",
    name: "Evento e noticia",
    subcategories: [
      { href: "/events/public", icon: FaNewspaper, id: "events", name: "Eventos publicos" },
      { href: "/events/private", icon: FaNewspaper, id: "private-events", name: "Eventos privados" },
      { href: "/events", icon: FaNewspaper, id: "local-news", name: "Noticias locais" },
    ],
  },
  {
    id: "pets",
    name: "Animais de estimacao",
    subcategories: [
      { icon: FaDog, id: "dogs", name: "Cachorros" },
      { icon: FaPaw, id: "pet-products", name: "Produtos pet" },
      { icon: FaMedkit, id: "vets", name: "Veterinarios" },
    ],
  },
  {
    id: "agro",
    name: "Agropecuaria",
    subcategories: [
      { icon: FaSeedling, id: "seeds", name: "Sementes" },
      { icon: FaTruck, id: "farm-machines", name: "Maquinas agricolas" },
      { icon: FaStore, id: "farm-stores", name: "Lojas agro" },
    ],
  },
  {
    id: "parts",
    name: "Autopecas e acessorios",
    subcategories: [
      { icon: FaWrench, id: "parts", name: "Pecas" },
      { icon: FaTools, id: "accessories", name: "Acessorios" },
      { icon: FaChargingStation, id: "batteries", name: "Baterias" },
    ],
  },
  {
    id: "computing",
    name: "Informatica",
    subcategories: [
      { icon: FaLaptop, id: "notebooks", name: "Notebooks" },
      { icon: FaTv, id: "monitors", name: "Monitores" },
      { icon: FaTools, id: "support", name: "Suporte tecnico" },
    ],
  },
  {
    id: "electronics",
    name: "Tecnologia e eletronicos",
    subcategories: [
      { icon: FaMobileAlt, id: "phones", name: "Smartphones" },
      { icon: FaTv, id: "tvs", name: "TVs" },
      { icon: FaLaptop, id: "gadgets", name: "Eletronicos" },
    ],
  },
  {
    id: "building",
    name: "Construcao e materiais",
    subcategories: [
      { icon: FaHammer, id: "materials", name: "Materiais" },
      { icon: FaTools, id: "construction-tools", name: "Ferramentas" },
      { icon: FaPaintRoller, id: "finishing", name: "Acabamento" },
    ],
  },
  {
    id: "furniture",
    name: "Moveis e decoracao",
    subcategories: [
      { icon: FaHome, id: "furniture", name: "Moveis" },
      { icon: FaPaintRoller, id: "decor", name: "Decoracao" },
      { icon: FaStore, id: "planned", name: "Planejados" },
    ],
  },
  {
    id: "phones",
    name: "Celular e telefonia",
    subcategories: [
      { icon: FaMobileAlt, id: "cellphones", name: "Celulares" },
      { icon: FaTools, id: "phone-repair", name: "Assistencia tecnica" },
      { icon: FaChargingStation, id: "chargers", name: "Carregadores" },
    ],
  },
  {
    id: "tools",
    name: "Ferramentas",
    subcategories: [
      { icon: FaTools, id: "hand-tools", name: "Ferramentas manuais" },
      { icon: FaWrench, id: "electric-tools", name: "Ferramentas eletricas" },
    ],
  },
  {
    id: "health-beauty",
    name: "Produtos para saude e beleza",
    subcategories: [
      { icon: FaHeart, id: "beauty-products", name: "Beleza" },
      { icon: FaMedkit, id: "health-products", name: "Saude" },
      { icon: FaPrescriptionBottleAlt, id: "supplements", name: "Suplementos" },
    ],
  },
  {
    id: "office",
    name: "Papelaria e escritorio",
    subcategories: [
      { icon: FaPen, id: "stationery", name: "Papelaria" },
      { icon: FaBriefcase, id: "office", name: "Escritorio" },
    ],
  },
  {
    id: "electric",
    name: "Materiais eletricos",
    subcategories: [
      { icon: FaChargingStation, id: "wires", name: "Fios e cabos" },
      { icon: FaTools, id: "electric-installation", name: "Instalacao" },
    ],
  },
  {
    id: "jewelry",
    name: "Joias e acessorios",
    subcategories: [
      { icon: FaRing, id: "jewelry", name: "Joias" },
      { icon: FaRing, id: "watches", name: "Relogios" },
    ],
  },
  {
    id: "toys",
    name: "Brinquedos",
    subcategories: [
      { icon: FaBaby, id: "kids-toys", name: "Infantis" },
      { icon: FaBasketballBall, id: "games", name: "Jogos" },
    ],
  },
  {
    id: "sports",
    name: "Esportes e lazer",
    subcategories: [
      { icon: FaBasketballBall, id: "sports-products", name: "Esportes" },
      { icon: FaBicycle, id: "outdoor", name: "Lazer" },
    ],
  },
  {
    id: "babies",
    name: "Bebes",
    subcategories: [
      { icon: FaBaby, id: "baby-products", name: "Produtos para bebes" },
      { icon: FaTshirt, id: "baby-clothes", name: "Roupas infantis" },
    ],
  },
  {
    id: "music",
    name: "Instrumentos musicais",
    subcategories: [
      { icon: FaGuitar, id: "guitars", name: "Cordas" },
      { icon: FaGuitar, id: "audio", name: "Audio" },
    ],
  },
  {
    id: "other",
    name: "Outros",
    subcategories: [
      { icon: FaStore, id: "others", name: "Outros anuncios" },
      { icon: FaTools, id: "custom", name: "Sob consulta" },
    ],
  },
];

const navigationCategories = [
  { id: "all", name: "Todas" },
  ...categoryGroups.map(({ id, name }) => ({ id, name })),
];

function CategoryTile({ subcategory }: { subcategory: Subcategory }) {
  const Icon = subcategory.icon;
  const className = `${styles.subcategory} ${
    subcategory.selected ? styles.subcategoryActive : ""
  }`;
  const content = (
    <>
      <span>
        <Icon aria-hidden="true" />
      </span>
      {subcategory.name}
    </>
  );

  if (subcategory.href) {
    return (
      <Link className={className} href={subcategory.href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} type="button">
      {content}
    </button>
  );
}

type ListingCategoriesScreenProps = {
  initialCategory?: string;
};

export function ListingCategoriesScreen({
  initialCategory = "all",
}: ListingCategoriesScreenProps) {
  const [displayCategory, setDisplayCategory] = useState(initialCategory);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const activeGroup = useMemo(
    () => categoryGroups.find((group) => group.id === displayCategory),
    [displayCategory],
  );
  const visibleGroups = activeGroup ? [activeGroup] : categoryGroups;

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea || displayCategory !== "all") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveCategory(visibleEntry.target.id.replace("category-", ""));
        }
      },
      {
        root: scrollArea,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.15, 0.3, 0.45],
      },
    );

    categoryGroups.forEach((group) => {
      const element = sectionRefs.current[group.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [displayCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setDisplayCategory(categoryId);
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    sectionRefs.current[categoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <AppShell>
      <section className={styles.flowScreen}>
        <header className={styles.topBar}>
          <BackButton ariaLabel="Voltar para inicio" href="/" />
          <h1>Categorias</h1>
          <span aria-hidden="true" />
        </header>
        <div className={styles.categoryLayout}>
          <nav className={styles.categoryRail} aria-label="Categorias de listings">
            {navigationCategories.map(({ id, name }) => (
              <button
                className={id === activeCategory ? styles.activeCategory : ""}
                key={id}
                onClick={() => handleCategoryClick(id)}
                type="button"
              >
                {name}
              </button>
            ))}
          </nav>

          <div
            className={styles.categoryContent}
            ref={scrollAreaRef}
          >
            {visibleGroups.map((group) => (
              <section
                className={styles.categorySection}
                id={`category-${group.id}`}
                key={group.id}
                ref={(element) => {
                  sectionRefs.current[group.id] = element;
                }}
              >
                <h2>{group.name}</h2>
                <div className={styles.subcategoryPanel}>
                  {group.subcategories.map((subcategory) => (
                    <CategoryTile key={subcategory.id} subcategory={subcategory} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
