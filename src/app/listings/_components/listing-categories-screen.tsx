"use client";

import { useState } from "react";
import { AppShell } from "@/app/_components/app-shell";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { AutomotiveCategoryPanel } from "./categories/automotive-category-panel";
import { JobsCategoryPanel } from "./categories/jobs-category-panel";
import styles from "./listing-flow.module.css";

const categories = [
  { id: "automotive", name: "Automoveis" },
  { id: "jobs", name: "Empregos" },
  { id: "market", name: "Mercado" },
  { id: "food", name: "Comida e bebida" },
  { id: "pharmacy", name: "Farmacia" },
  { id: "shipping", name: "Envios" },
  { id: "rides", name: "Carona" },
  { id: "fashion", name: "Moda e vestuario" },
  { id: "services", name: "Prestadores de servico" },
  { id: "properties", name: "Venda e locacao de imoveis" },
  { id: "news", name: "Eventos e noticia" },
  { id: "pets", name: "Animais de estimacao" },
  { id: "agro", name: "Agropecuaria" },
  { id: "parts", name: "Autopecas e acessorios" },
  { id: "computing", name: "Informatica" },
  { id: "electronics", name: "Tecnologia e eletronicos" },
  { id: "building", name: "Construcao e materiais" },
  { id: "furniture", name: "Moveis e decoracao" },
  { id: "phones", name: "Celular e telefonia" },
  { id: "tools", name: "Ferramentas" },
  { id: "office", name: "Papelaria e escritorio" },
  { id: "jewelry", name: "Joias e acessorios" },
  { id: "toys", name: "Brinquedos" },
  { id: "sports", name: "Esportes e lazer" },
  { id: "babies", name: "Bebes" },
  { id: "music", name: "Instrumentos musicais" },
  { id: "other", name: "Outros" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

type ListingCategoriesScreenProps = {
  initialCategory?: CategoryId;
};

const categoryPanels: Partial<Record<CategoryId, React.ReactNode>> = {
  automotive: <AutomotiveCategoryPanel />,
  jobs: <JobsCategoryPanel />,
};

export function ListingCategoriesScreen({
  initialCategory = "automotive",
}: ListingCategoriesScreenProps) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>(initialCategory);

  return (
    <AppShell>
      <section className={styles.flowScreen}>
        <div className={styles.flowScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para inicio" href="/" />
            <h1>Categorias</h1>
          </header>
          <div className={styles.categoryLayout}>
            <nav className={styles.categoryRail} aria-label="Categorias de listings">
              {categories.map(({ id, name }) => (
                <button
                  className={id === activeCategory ? styles.activeCategory : ""}
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </nav>
            {categoryPanels[activeCategory] ?? (
              <section className={styles.emptyCategoryPanel} aria-label="Subcategorias" />
            )}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
