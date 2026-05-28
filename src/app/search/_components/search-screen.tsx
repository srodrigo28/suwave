"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCamera,
  FaCheckCircle,
  FaImage,
  FaMapMarkerAlt,
  FaRegImage,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { SearchCategory, SearchResult, SearchSuggestion } from "@/models/search";
import { searchGlobalResults } from "@/repositories/search-repository";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./search.module.css";

const listingImageClasses: Record<SearchResult["imageKind"], string> = {
  house: styles.house,
  outfit: styles.outfit,
  phonePair: styles.phonePair,
  "pickup-black": styles.phonePair,
  "pickup-white": styles.phonePair,
  pizza: styles.pizza,
};

function SearchResultCard({ result }: { result: SearchResult }) {
  const content = (
    <>
      <div className={styles.resultImage}>
        {result.badge ? <b>{result.badge}</b> : null}
        <Image
          alt=""
          className={listingImageClasses[result.imageKind]}
          fill
          sizes="110px"
          src={result.image}
        />
      </div>
      <div className={styles.resultCopy}>
        <small>{result.kind}</small>
        <h2>{result.title}</h2>
        <strong>{result.price}</strong>
        <p>
          <FaMapMarkerAlt aria-hidden="true" />
          {result.place}
        </p>
      </div>
    </>
  );

  if (result.href) {
    return (
      <Link className={styles.resultCard} href={result.href}>
        {content}
      </Link>
    );
  }

  return <article className={styles.resultCard}>{content}</article>;
}

function ImageSearchSheet({
  onClose,
  onImageSearch,
}: {
  onClose: () => void;
  onImageSearch: (query: string) => void;
}) {
  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      aria-label="Buscar por imagem"
      className={styles.imageSheet}
      exit={{ opacity: 0, y: 24 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <header>
        <div>
          <small>Reconhecimento visual</small>
          <h2>Buscar por imagem</h2>
        </div>
        <button aria-label="Fechar busca por imagem" onClick={onClose} type="button">
          <FaTimes aria-hidden="true" />
        </button>
      </header>

      <button onClick={() => onImageSearch("smartphone")} type="button">
        <FaCamera aria-hidden="true" />
        <span>
          <strong>Tirar foto</strong>
          <small>Simula captura e busca por produtos parecidos.</small>
        </span>
      </button>
      <button onClick={() => onImageSearch("casa")} type="button">
        <FaRegImage aria-hidden="true" />
        <span>
          <strong>Escolher da galeria</strong>
          <small>Simula analise de imagem salva no aparelho.</small>
        </span>
      </button>
    </motion.aside>
  );
}

export function SearchScreen({
  categories,
  initialImageMode = false,
  initialResults,
  suggestions,
}: {
  categories: SearchCategory[];
  initialImageMode?: boolean;
  initialResults: SearchResult[];
  suggestions: SearchSuggestion[];
}) {
  const [query, setQuery] = useState("");
  const [showImageSheet, setShowImageSheet] = useState(initialImageMode);
  const [imageSearchDone, setImageSearchDone] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) {
      return initialResults;
    }

    return searchGlobalResults(query);
  }, [initialResults, query]);

  const handleImageSearch = (nextQuery: string) => {
    setQuery(nextQuery);
    setImageSearchDone(true);
    setShowImageSheet(false);
  };

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.searchScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <motion.div
          animate="visible"
          className={styles.searchScroll}
          initial="hidden"
          variants={containerMotion}
        >
          <motion.header className={styles.searchHeader} variants={riseMotion}>
            <Link aria-label="Voltar para inicio" href="/">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <div>
              <small>Busca global</small>
              <h1>Encontre no app inteiro</h1>
            </div>
            <span>
              <FaSearch aria-hidden="true" />
            </span>
          </motion.header>

          <motion.label className={styles.searchBox} variants={riseMotion}>
            <FaSearch aria-hidden="true" />
            <input
              aria-label="Pesquisar no aplicativo"
              autoFocus
              onChange={(event) => {
                setQuery(event.target.value);
                setImageSearchDone(false);
              }}
              placeholder="O que voce procura?"
              type="search"
              value={query}
            />
            <button
              aria-label="Buscar por imagem"
              onClick={() => setShowImageSheet(true)}
              type="button"
            >
              <FaCamera aria-hidden="true" />
            </button>
          </motion.label>

          {imageSearchDone ? (
            <motion.div className={styles.successHint} variants={riseMotion}>
              <FaCheckCircle aria-hidden="true" />
              Resultados relacionados a imagem selecionada
            </motion.div>
          ) : null}

          <motion.section className={styles.searchHero} variants={riseMotion}>
            <small>SUWAVE regional</small>
            <h2>Produtos, lojas, servicos e categorias em Sinop</h2>
            <p>Resultados preparados para respeitar cidade ativa e disponibilidade local.</p>
          </motion.section>

          <motion.div className={styles.categoryRail} variants={containerMotion}>
            {categories.map(({ icon: Icon, id, label, query: categoryQuery }) => (
              <motion.button
                key={id}
                onClick={() => {
                  setQuery(categoryQuery);
                  setImageSearchDone(false);
                }}
                type="button"
                variants={riseMotion}
              >
                <Icon aria-hidden="true" />
                {label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className={styles.suggestionList} variants={containerMotion}>
            {suggestions.map((suggestion) => (
              <motion.button
                key={suggestion.id}
                onClick={() => {
                  setQuery(suggestion.query);
                  setImageSearchDone(false);
                }}
                type="button"
                variants={riseMotion}
              >
                {suggestion.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.section className={styles.resultsSection} variants={riseMotion}>
            <header>
              <h2>{query.trim() ? "Resultados" : "Recomendados"}</h2>
              <span>{results.length} itens</span>
            </header>

            {results.length ? (
              <motion.div className={styles.resultList} variants={containerMotion}>
                {results.map((result) => (
                  <motion.div key={`${result.kind}-${result.title}`} variants={riseMotion}>
                    <SearchResultCard result={result} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.article className={styles.emptyState} variants={riseMotion}>
                <FaImage aria-hidden="true" />
                <h2>Nada encontrado</h2>
                <p>Tente buscar por produto, loja, categoria, servico ou veiculo.</p>
              </motion.article>
            )}
          </motion.section>
        </motion.div>

        <AnimatePresence>
          {showImageSheet ? (
            <div className={styles.sheetOverlay}>
              <ImageSearchSheet
                onClose={() => setShowImageSheet(false)}
                onImageSearch={handleImageSearch}
              />
            </div>
          ) : null}
        </AnimatePresence>

        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
