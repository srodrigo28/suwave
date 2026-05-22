"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaBars,
  FaBell,
  FaBox,
  FaBriefcase,
  FaCamera,
  FaCar,
  FaClock,
  FaChevronLeft,
  FaChevronDown,
  FaChevronRight,
  FaCube,
  FaDownload,
  FaGraduationCap,
  FaHamburger,
  FaHandshake,
  FaHome,
  FaMapMarkerAlt,
  FaMedkit,
  FaPercent,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaTicketAlt,
  FaTimes,
  FaFilter,
  FaUserGraduate,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import styles from "./suwave-home.module.css";

const categories = [
  { name: "Mercado", icon: FaShoppingCart, tone: "lime" },
  { name: "Comida e bebida", icon: FaHamburger, tone: "food" },
  { name: "Carona", icon: FaCar, tone: "green" },
  { name: "Envios", icon: FaCube, tone: "blue" },
  { name: "Farmácia", icon: FaMedkit, tone: "mint" },
  { name: "Prestadores de serviço", icon: FaHandshake, tone: "gray" },
  { name: "Empregos", icon: FaBriefcase, tone: "violet" },
  { name: "Mais categorias", icon: FaPlus, tone: "soft" },
] as const;

const categoryMenuItems = [
  "Todas",
  "Mercado",
  "Comida e bebida",
  "Farmácia",
  "Envios",
  "Carona",
  "Moda e vestuário",
  "Prestadores de serviço",
  "Empregos",
  "Venda e aluguel de imóveis",
  "Automóveis",
  "Desapego",
  "Emprego e negócio",
  "Animais de estimação",
  "Agropecuária",
  "Autopeças e acessórios",
  "Informática",
  "Tecnologia e eletrônicos",
  "Comunicação e mídia",
  "Móveis e decoração",
  "Ferramentas",
  "Produtos para saúde e beleza",
  "Papelaria e escritório",
  "Moda e calçados",
  "Joias e acessórios",
  "Brinquedos",
  "Esporte e lazer",
  "Bebês",
  "Instrumentos musicais",
  "Outros",
] as const;

const jobCategoryItems = [
  { name: "Vagas abertas", icon: FaBriefcase, action: "jobs" },
  { name: "Freelancer", icon: FaUserTie, action: undefined },
  { name: "Meio período", icon: FaClock, action: undefined },
  { name: "Estágio", icon: FaGraduationCap, action: undefined },
  { name: "Jovem aprendiz", icon: FaUserGraduate, action: undefined },
] as const;

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIOSDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

type Listing = {
  title: string;
  price: string;
  place: string;
  image: string;
  imageClassName: string;
  badge?: string;
};

const listings: Listing[] = [
  {
    title: "Conjunto Masculino Básico Premium",
    price: "R$ 89,90",
    place: "Sinop - MT",
    image: "/marketplace/beige-set.png",
    imageClassName: styles.outfit,
  },
  {
    title: "Casa à venda no Jardim das Oliveiras",
    price: "R$ 750.000,00",
    place: "Sinop - MT",
    image: "/marketplace/modern-house.png",
    imageClassName: styles.house,
  },
  {
    title: "Smartphone preto 256 GB",
    price: "R$ 3.499,00",
    place: "Sinop - MT",
    image: "/marketplace/phone-pair.png",
    imageClassName: styles.phonePair,
  },
  {
    title: "Pizza grande com entrega",
    price: "R$ 49,90",
    place: "Centro",
    image: "/marketplace/pizza-promo.png",
    imageClassName: styles.pizza,
    badge: "Promoção",
  },
];

type NavItem = {
  name: string;
  icon: IconType;
  active?: boolean;
  floating?: boolean;
};

const navItems: NavItem[] = [
  { name: "Início", icon: FaHome, active: true },
  { name: "Ajuda", icon: FaWhatsapp },
  { name: "Anunciar", icon: FaPlus, floating: true },
  { name: "Pedidos", icon: FaBox },
  { name: "Mais", icon: FaBars },
];

type Company = {
  name: string;
  segment: string;
  place: string;
  brand: "bino" | "shell" | "guia" | "lincoln" | "teresa";
  featured?: boolean;
};

const jobCompanies: Company[] = [
  {
    name: "Supermercado Bino",
    segment: "Supermercado",
    place: "Sinop - MT",
    brand: "bino",
    featured: true,
  },
  {
    name: "Posto Sinop",
    segment: "Posto de Combustível",
    place: "Sinop - MT",
    brand: "shell",
  },
  {
    name: "Lojas Guia",
    segment: "Varejo",
    place: "Sinop - MT",
    brand: "guia",
  },
  {
    name: "Restaurante Lincoln",
    segment: "Restaurante",
    place: "Sinop - MT",
    brand: "lincoln",
  },
  {
    name: "Padaria da Teresa",
    segment: "Padaria",
    place: "Sinop - MT",
    brand: "teresa",
  },
];

const containerMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
};

const riseMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

function SplashScreen() {
  return (
    <motion.div
      className={styles.splash}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.46, ease: "easeInOut" }}
    >
      <motion.div
        className={styles.splashLogo}
        initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.34 }}
      >
        <Image
          alt="Logo Suwave"
          height={312}
          priority
          src="/suwave-logo-transparent.png"
          width={312}
        />
      </motion.div>
      <motion.i
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.28, duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function StatusBar() {
  return (
    <div className={styles.statusBar} aria-label="Status do aparelho">
      <strong>9:41</strong>
      <div className={styles.island}>
        <span />
      </div>
      <div className={styles.deviceSignals}>
        <span className={styles.signal} />
        <span className={styles.wifi} />
        <span className={styles.battery} />
      </div>
    </div>
  );
}

function BannerChip({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      className={`${styles.bannerChip} ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

function PromoBanner() {
  return (
    <section className={styles.banner} aria-label="Destaque do aplicativo">
      <div className={styles.bannerCopy}>
        <h1>
          Tudo que você precisa
          <em> em um só app!</em>
        </h1>
        <p>Prático, rápido e seguro.</p>
        <button type="button">
          Explorar agora
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className={styles.bannerArt} aria-hidden="true">
        <motion.div
          className={styles.heroPhone}
          animate={{ rotate: [-11, -8, -11], y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>SUWAVE</span>
        </motion.div>
        <BannerChip className={styles.cartChip}>
          <FaShoppingCart />
        </BannerChip>
        <BannerChip className={styles.deliveryChip}>
          <FaCube />
        </BannerChip>
        <BannerChip className={styles.foodChip}>
          <FaHamburger />
        </BannerChip>
        <BannerChip className={styles.carChip}>
          <FaCar />
        </BannerChip>
        <BannerChip className={styles.boxChip}>
          <FaCube />
        </BannerChip>
        <BannerChip className={styles.discountChip}>
          <FaPercent />
        </BannerChip>
      </div>
      <div className={styles.dots} aria-hidden="true">
        <b />
        <i />
        <i />
      </div>
    </section>
  );
}

function CategoryGrid({ onOpenCategories }: { onOpenCategories: () => void }) {
  return (
    <div className={styles.categoryGrid} aria-label="Categorias">
      {categories.map(({ name, icon: Icon, tone }, index) => (
        <motion.button
          className={styles.category}
          key={name}
          type="button"
          variants={riseMotion}
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -3 }}
          transition={{ delay: index * 0.02 }}
          onClick={
            name === "Empregos" || name === "Mais categorias"
              ? onOpenCategories
              : undefined
          }
        >
          <span className={styles[tone]}>
            <Icon aria-hidden="true" />
          </span>
          {name}
        </motion.button>
      ))}
    </div>
  );
}

function CategoriesScreen({
  onBack,
  onOpenJobs,
}: {
  onBack: () => void;
  onOpenJobs: () => void;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categoryMenuItems)[number]>("Empregos");
  const [selectedJobCategory, setSelectedJobCategory] =
    useState<(typeof jobCategoryItems)[number]["name"]>("Vagas abertas");

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.categoriesScreen}
      exit={{ opacity: 0, x: 28 }}
      initial={{ opacity: 0, x: 28 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <header className={styles.categoriesHeader}>
        <button aria-label="Voltar para início" onClick={onBack} type="button">
          <FaChevronLeft aria-hidden="true" />
        </button>
        <h1>Categorias</h1>
      </header>

      <div className={styles.categoryMenuLayout}>
        <nav className={styles.categoryMenu} aria-label="Lista de categorias">
          {categoryMenuItems.map((name) => (
            <button
              aria-current={name === selectedCategory ? "page" : undefined}
              className={name === selectedCategory ? styles.categoryMenuActive : ""}
              key={name}
              onClick={() => setSelectedCategory(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </nav>

        <section className={styles.jobCategoryPanel} aria-label="Categorias de empregos">
          {selectedCategory === "Empregos"
            ? jobCategoryItems.map(({ name, icon: Icon, action }) => (
                <motion.button
                  aria-pressed={name === selectedJobCategory}
                  className={`${styles.jobCategory} ${
                    name === selectedJobCategory ? styles.jobCategoryActive : ""
                  }`}
                  key={name}
                  onClick={() => {
                    setSelectedJobCategory(name);

                    if (action === "jobs") {
                      onOpenJobs();
                    }
                  }}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                >
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  {name}
                </motion.button>
              ))
            : null}
        </section>
      </div>
    </motion.div>
  );
}

function CompanyLogo({ brand }: { brand: Company["brand"] }) {
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

function JobsScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.jobsScreen}
      exit={{ opacity: 0, x: 28 }}
      initial={{ opacity: 0, x: 28 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <header className={styles.jobsHeader}>
        <button aria-label="Voltar para início" onClick={onBack} type="button">
          <FaChevronLeft aria-hidden="true" />
        </button>
        <h1>Vagas abertas</h1>
        <button aria-label="Filtrar vagas" type="button">
          <FaFilter aria-hidden="true" />
        </button>
      </header>

      <label className={styles.jobsSearch}>
        <FaSearch aria-hidden="true" />
        <span>Buscar empresas ou vagas</span>
      </label>

      <motion.section
        animate="visible"
        className={styles.companyList}
        initial="hidden"
        variants={containerMotion}
      >
        {jobCompanies.map((company) => (
          <motion.button
            className={`${styles.companyRow} ${
              company.featured ? styles.companyFeatured : ""
            }`}
            key={company.name}
            type="button"
            variants={riseMotion}
            whileTap={{ scale: 0.985 }}
          >
            <CompanyLogo brand={company.brand} />
            <span className={styles.companyCopy}>
              <strong>{company.name}</strong>
              <small>{company.segment}</small>
              <em>
                <FaMapMarkerAlt aria-hidden="true" />
                {company.place}
              </em>
            </span>
            <FaChevronRight className={styles.companyArrow} aria-hidden="true" />
          </motion.button>
        ))}
      </motion.section>
    </motion.div>
  );
}

function ListingCard({
  listing,
}: {
  listing: Listing;
}) {
  return (
    <motion.article className={styles.listing} variants={riseMotion}>
      <div className={styles.listingImage}>
        {listing.badge ? <b>{listing.badge}</b> : null}
        <Image
          alt=""
          className={listing.imageClassName}
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

function BottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Navegacao principal">
      {navItems.map(({ name, icon: Icon, active, floating }) => (
        <button
          className={`${styles.navItem} ${active ? styles.navActive : ""} ${
            floating ? styles.navFloating : ""
          }`}
          key={name}
          type="button"
        >
          <span>
            <Icon aria-hidden="true" />
          </span>
          {name}
        </button>
      ))}
    </nav>
  );
}

function InstallSheet({
  isIOS,
  onClose,
  onInstall,
  canInstall,
}: {
  isIOS: boolean;
  onClose: () => void;
  onInstall: () => void;
  canInstall: boolean;
}) {
  return (
    <div className={styles.installOverlay}>
      <motion.aside
        animate={{ opacity: 1, y: 0 }}
        aria-label="Instalar Suwave"
        className={styles.installSheet}
        exit={{ opacity: 0, y: 32 }}
        initial={{ opacity: 0, y: 36 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <button
          aria-label="Fechar convite de instalação"
          className={styles.installClose}
          onClick={onClose}
          type="button"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className={styles.installLead}>
          <span className={styles.installMark}>
            <Image
              alt=""
              fill
              sizes="54px"
              src="/suwave-logo-transparent.png"
            />
          </span>
          <div>
            <strong>Instalar Suwave</strong>
            <p>Abra mais rápido e use como aplicativo no celular.</p>
          </div>
        </div>

        {isIOS ? (
          <p className={styles.installHint}>
            No iPhone, toque em Compartilhar e depois em Adicionar à Tela de Início.
          </p>
        ) : !canInstall ? (
          <p className={styles.installHint}>
            Se o navegador não abrir a instalação, use o menu e toque em Instalar app.
          </p>
        ) : null}

        <div className={styles.installActions}>
          <button onClick={onClose} type="button">
            Agora não
          </button>
          <button onClick={onInstall} type="button">
            <FaDownload aria-hidden="true" />
            {canInstall ? "Instalar" : "Entendi"}
          </button>
        </div>
      </motion.aside>
    </div>
  );
}

export function SuwaveHome() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(
    null,
  );
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [isIOS] = useState(isIOSDevice);
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<"home" | "categories" | "jobs">("home");

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 1550);

    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const isMobileViewport = window.matchMedia("(max-width: 560px)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isStandalone || !isMobileViewport || !isTouchDevice) {
      return;
    }

    const sheetTimer = window.setTimeout(() => setShowInstallSheet(true), 700);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
      setShowInstallSheet(true);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setShowInstallSheet(false);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.clearTimeout(sheetTimer);

      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowInstallSheet(false);
      return;
    }

    if (!installPrompt) {
      setShowInstallSheet(false);
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallSheet(false);
  };

  return (
    <main className={styles.stage}>
      <AnimatePresence>{showSplash ? <SplashScreen /> : null}</AnimatePresence>
      <motion.section
        animate={showSplash ? "hidden" : "visible"}
        className={styles.phone}
        initial="hidden"
        variants={containerMotion}
      >
        <div className={styles.screen}>
          <StatusBar />
          <AnimatePresence mode="wait">
            {screen === "home" ? (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className={styles.homeScreen}
                exit={{ opacity: 0, x: -28 }}
                initial={{ opacity: 0, x: -18 }}
                key="home"
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className={styles.content}>
                  <motion.header className={styles.header} variants={riseMotion}>
                    <div className={styles.balance}>
                      <small>Saldo</small>
                      <strong>R$ 100,00</strong>
                      <button type="button">
                        <FaTicketAlt aria-hidden="true" />
                        Cupom <b>2</b>
                      </button>
                    </div>
                    <button className={styles.place} type="button">
                      <FaMapMarkerAlt aria-hidden="true" />
                      Sinop - MT
                      <FaChevronDown aria-hidden="true" />
                    </button>
                    <button className={styles.alert} type="button" aria-label="Notificacoes">
                      <FaBell aria-hidden="true" />
                      <b>2</b>
                    </button>
                  </motion.header>

                  <motion.label className={styles.search} variants={riseMotion}>
                    <FaSearch aria-hidden="true" />
                    <span>O que você procura?</span>
                    <button type="button" aria-label="Buscar por foto">
                      <FaCamera aria-hidden="true" />
                    </button>
                  </motion.label>

                  <motion.div variants={riseMotion}>
                    <PromoBanner />
                  </motion.div>

                  <CategoryGrid onOpenCategories={() => setScreen("categories")} />

                  <motion.section className={styles.feed} variants={riseMotion}>
                    <h2>Confira o que temos para você</h2>
                    <motion.div className={styles.listings} variants={containerMotion}>
                      {listings.map((listing) => (
                        <ListingCard key={listing.title} listing={listing} />
                      ))}
                    </motion.div>
                  </motion.section>
                </div>
                <BottomNav />
              </motion.div>
            ) : screen === "categories" ? (
              <CategoriesScreen
                key="categories"
                onBack={() => setScreen("home")}
                onOpenJobs={() => setScreen("jobs")}
              />
            ) : (
              <JobsScreen key="jobs" onBack={() => setScreen("categories")} />
            )}
          </AnimatePresence>
        </div>
      </motion.section>
      <AnimatePresence>
        {showInstallSheet && !showSplash ? (
          <InstallSheet
            canInstall={Boolean(installPrompt)}
            isIOS={isIOS}
            onClose={() => setShowInstallSheet(false)}
            onInstall={handleInstall}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
