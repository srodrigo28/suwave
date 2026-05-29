"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaSave,
  FaWallet,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { DeliveryQuote, MobilityRoute } from "@/models/mobility";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import styles from "@/app/mobility/_components/mobility.module.css";

export function LocalDeliveryScreen({
  quotes,
  route,
}: {
  quotes: DeliveryQuote[];
  route: MobilityRoute;
}) {
  return (
    <AppShell>
      <section className={styles.mobilityScreen}>
        <motion.div
          animate="visible"
          className={styles.mobilityScroll}
          initial="hidden"
          variants={containerMotion}
        >
          <header className={styles.topBar}>
            <Link aria-label="Voltar para categorias" href="/listings">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <h1>Enviar dentro da cidade</h1>
            <span />
          </header>

          <motion.section className={styles.heroPanel} variants={riseMotion}>
            <span>
              <FaBoxOpen aria-hidden="true" />
            </span>
            <div>
              <h2>Envios dentro da cidade</h2>
              <p>Envie seus produtos com rapidez, seguranca e rastreio.</p>
            </div>
          </motion.section>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <h2>Coleta</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.inlineFields}>
                <label>
                  CEP de coleta
                  <input defaultValue="78550-000" />
                </label>
                <label>
                  Complemento
                  <input placeholder="Opcional" />
                </label>
              </div>
              <label>
                Endereco completo
                <input defaultValue={route.origin.address} />
              </label>
            </div>
            <div className={styles.supportActions}>
              <button type="button">
                <FaMapMarkerAlt aria-hidden="true" />
                Meus enderecos
              </button>
              <button type="button">
                <FaSave aria-hidden="true" />
                Salvar
              </button>
            </div>
          </motion.section>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <h2>Entrega</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.inlineFields}>
                <label>
                  Destinatario
                  <input defaultValue="Marina Costa" />
                </label>
                <label>
                  Telefone
                  <input defaultValue="(66) 99988-1402" />
                </label>
              </div>
              <label>
                Endereco completo
                <input defaultValue={route.destination.address} />
              </label>
              <label>
                Referencia
                <input defaultValue="Portao azul ao lado da farmacia" />
              </label>
            </div>
          </motion.section>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <h2>Detalhes do envio</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.inlineFields}>
                <label>
                  Tipo de produto
                  <input defaultValue="Pacote pequeno" />
                </label>
                <label>
                  Peso estimado
                  <input defaultValue="Ate 2 kg" />
                </label>
              </div>
              <label>
                Observacoes
                <textarea defaultValue="Produto embalado e pronto para retirada." />
              </label>
            </div>
          </motion.section>

          <motion.section className={styles.mapCard} variants={riseMotion}>
            <h2>Resultado do frete</h2>
            <div className={styles.routeSummary}>
              <article>
                <small>{route.origin.label}</small>
                <strong>{route.origin.address}</strong>
              </article>
              <article>
                <small>{route.destination.label}</small>
                <strong>{route.destination.address}</strong>
              </article>
            </div>
            <div className={styles.mapCanvas} aria-label="Mapa da rota">
              <span className={styles.mapDriver}>
                <FaMotorcycle aria-hidden="true" />
              </span>
              <span className={styles.mapDriver}>
                <FaMotorcycle aria-hidden="true" />
              </span>
            </div>
            <div className={styles.tripMetrics}>
              <article>
                <small>Distancia</small>
                <strong>{route.distance}</strong>
              </article>
              <article>
                <small>Tempo</small>
                <strong>{route.duration}</strong>
              </article>
              <article>
                <small>Seguro</small>
                <strong>Incluso</strong>
              </article>
            </div>
          </motion.section>

          <motion.div className={styles.quoteList} variants={containerMotion}>
            {quotes.map((quote, index) => (
              <motion.article
                className={`${styles.quoteCard} ${index === 0 ? styles.selectedCard : ""}`}
                key={quote.id}
                variants={riseMotion}
              >
                <div className={styles.quoteHeader}>
                  <div>
                    <strong>{quote.title}</strong>
                    {quote.badge ? <div className={styles.badge}>{quote.badge}</div> : null}
                  </div>
                  <span className={styles.price}>{quote.price}</span>
                </div>
                <small>{quote.eta}</small>
                <p>{quote.description}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.section className={styles.sectionCard} variants={riseMotion}>
            <div className={styles.paymentRow}>
              <div>
                <small>Forma de pagamento</small>
                <strong>
                  <FaWallet aria-hidden="true" /> Carteira Suwave
                </strong>
              </div>
              <button type="button">Alterar</button>
            </div>
            <button className={styles.primaryAction} type="button">
              <FaCheckCircle aria-hidden="true" />
              Solicitar envio
            </button>
          </motion.section>
        </motion.div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
