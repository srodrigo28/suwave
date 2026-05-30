"use client";

import Image from "next/image";
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
  FaHandshake,
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
  imageSrc?: string;
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
      { href: "/food/snacks", icon: FaHamburger, id: "snacks", name: "Lanches" },
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
    name: "Farmácia",
    subcategories: [
      { icon: FaPrescriptionBottleAlt, id: "medicine", name: "Medicamentos" },
      { icon: FaMedkit, id: "medical-equipment", name: "Equipamentos médicos" },
      { icon: FaHeart, id: "wellness", name: "Saúde e bem-estar" },
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
    name: "Moda e vestuário",
    subcategories: [
      { icon: FaTshirt, id: "men", name: "Masculino" },
      { icon: FaTshirt, id: "women", name: "Feminino" },
      { icon: FaBaby, id: "kids-fashion", name: "Infantil" },
      { icon: FaRing, id: "accessories-fashion", name: "Acessórios" },
    ],
  },
  {
    id: "services",
    name: "Prestadores de serviço",
    subcategories: [
      { href: "/services/builders", icon: FaTools, id: "builders", name: "Pedreiros" },
      { icon: FaWrench, id: "mechanics", name: "Mecânicos" },
      { icon: FaPaintRoller, id: "painters", name: "Pintores" },
      { href: "/services/hairdressers", icon: FaHeart, id: "beauty", name: "Cabeleireiras" },
    ],
  },
  {
    id: "jobs",
    name: "Empregos",
    subcategories: [
      { href: "/jobs", icon: FaBriefcase, id: "job-categories", name: "Categorias de vagas" },
      { href: "/jobs/companies", icon: FaBuilding, id: "companies", name: "Empresas" },
      { icon: FaPen, id: "resume", name: "Currículo" },
    ],
  },
  {
    id: "properties",
    name: "Venda e locação de imóveis",
    subcategories: [
      { href: "/listings/properties/houses", icon: FaHome, id: "houses", name: "Casas" },
      { icon: FaBuilding, id: "apartments", name: "Apartamentos" },
      { icon: FaSeedling, id: "farms", name: "Chácaras" },
      { icon: FaStore, id: "commercial", name: "Comercial" },
    ],
  },
  {
    id: "automotive",
    name: "Automóveis",
    subcategories: [
      {
        href: "/listings/vehicles/bicycles",
        icon: FaBicycle,
        id: "bicycle",
        imageSrc: "/listings/categories/bicycle.png",
        name: "Bicicleta",
      },
      {
        icon: FaMotorcycle,
        id: "motorcycles",
        imageSrc: "/listings/categories/motorcycle-red.png",
        name: "Motos",
      },
      {
        icon: FaCar,
        id: "cars",
        imageSrc: "/listings/categories/car-red.png",
        name: "Carros",
      },
      {
        href: "/listings/vehicles/pickups",
        icon: FaTruck,
        id: "pickups",
        imageSrc: "/listings/categories/truck.png",
        name: "Caminhonetes",
        selected: true,
      },
      {
        icon: FaTruck,
        id: "trucks",
        imageSrc: "/listings/categories/van.png",
        name: "Caminhões",
      },
      {
        icon: FaCar,
        id: "vans",
        imageSrc: "/listings/categories/van-v2.png",
        name: "Ônibus / Vans",
      },
      {
        icon: FaTruck,
        id: "heavy",
        imageSrc: "/listings/categories/heavy-vehicle.png",
        name: "Veículo Pesado",
      },
      {
        icon: FaHandshake,
        id: "consortium",
        imageSrc: "/listings/categories/consortium.png",
        name: "Consórcio",
      },
      {
        icon: FaCar,
        id: "boats",
        imageSrc: "/listings/categories/boat.png",
        name: "Náutica",
      },
      {
        icon: FaCar,
        id: "classic-cars",
        imageSrc: "/listings/categories/vintage-car.png",
        name: "Carros Antigos",
      },
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
    name: "Eventos e notícia",
    subcategories: [
      { href: "/events/public", icon: FaNewspaper, id: "events", name: "Eventos públicos" },
      { href: "/events/private", icon: FaNewspaper, id: "private-events", name: "Eventos privados" },
      { href: "/events", icon: FaNewspaper, id: "local-news", name: "Notícias locais" },
    ],
  },
  {
    id: "pets",
    name: "Animais de estimação",
    subcategories: [
      { icon: FaDog, id: "dogs", name: "Cachorros" },
      { icon: FaPaw, id: "pet-products", name: "Produtos pet" },
      { icon: FaMedkit, id: "vets", name: "Veterinários" },
    ],
  },
  {
    id: "agro",
    name: "Agropecuária",
    subcategories: [
      { icon: FaSeedling, id: "seeds", name: "Sementes" },
      { icon: FaTruck, id: "farm-machines", name: "Máquinas agrícolas" },
      { icon: FaStore, id: "farm-stores", name: "Lojas agro" },
    ],
  },
  {
    id: "parts",
    name: "Autopeças e acessórios",
    subcategories: [
      { icon: FaWrench, id: "parts", name: "Peças" },
      { icon: FaTools, id: "accessories", name: "Acessórios" },
      { icon: FaChargingStation, id: "batteries", name: "Baterias" },
    ],
  },
  {
    id: "computing",
    name: "Informática",
    subcategories: [
      { icon: FaLaptop, id: "notebooks", name: "Notebooks" },
      { icon: FaTv, id: "monitors", name: "Monitores" },
      { icon: FaTools, id: "support", name: "Suporte técnico" },
    ],
  },
  {
    id: "electronics",
    name: "Tecnologia e eletrônicos",
    subcategories: [
      { icon: FaMobileAlt, id: "phones", name: "Smartphones" },
      { icon: FaTv, id: "tvs", name: "TVs" },
      { icon: FaLaptop, id: "gadgets", name: "Eletrônicos" },
    ],
  },
  {
    id: "building",
    name: "Construção e materiais",
    subcategories: [
      { icon: FaHammer, id: "materials", name: "Materiais" },
      { icon: FaTools, id: "construction-tools", name: "Ferramentas" },
      { icon: FaPaintRoller, id: "finishing", name: "Acabamento" },
    ],
  },
  {
    id: "furniture",
    name: "Móveis e decoração",
    subcategories: [
      { icon: FaHome, id: "furniture", name: "Móveis" },
      { icon: FaPaintRoller, id: "decor", name: "Decoração" },
      { icon: FaStore, id: "planned", name: "Planejados" },
    ],
  },
  {
    id: "phones",
    name: "Celular e telefonia",
    subcategories: [
      { icon: FaMobileAlt, id: "cellphones", name: "Celulares" },
      { icon: FaTools, id: "phone-repair", name: "Assistência técnica" },
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
    name: "Produtos para saúde e beleza",
    subcategories: [
      { icon: FaHeart, id: "beauty-products", name: "Beleza" },
      { icon: FaMedkit, id: "health-products", name: "Saúde" },
      { icon: FaPrescriptionBottleAlt, id: "supplements", name: "Suplementos" },
    ],
  },
  {
    id: "office",
    name: "Papelaria e escritório",
    subcategories: [
      { icon: FaPen, id: "stationery", name: "Papelaria" },
      { icon: FaBriefcase, id: "office", name: "Escritório" },
    ],
  },
  {
    id: "electric",
    name: "Materiais elétricos",
    subcategories: [
      { icon: FaChargingStation, id: "wires", name: "Fios e cabos" },
      { icon: FaTools, id: "electric-installation", name: "Instalação" },
    ],
  },
  {
    id: "jewelry",
    name: "Joias e acessórios",
    subcategories: [
      { icon: FaRing, id: "jewelry", name: "Joias" },
      { icon: FaRing, id: "watches", name: "Relógios" },
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
    name: "Bebês",
    subcategories: [
      { icon: FaBaby, id: "baby-products", name: "Produtos para bebês" },
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
      { icon: FaStore, id: "others", name: "Outros anúncios" },
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
        {subcategory.imageSrc ? (
          <Image
            alt=""
            aria-hidden="true"
            fill
            sizes="64px"
            src={subcategory.imageSrc}
          />
        ) : (
          <Icon aria-hidden="true" />
        )}
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
