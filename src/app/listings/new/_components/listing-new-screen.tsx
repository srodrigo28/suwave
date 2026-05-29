"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowDown,
  FaArrowUp,
  FaBullhorn,
  FaChevronRight,
  FaCheckCircle,
  FaMagic,
  FaShieldAlt,
  FaImages,
  FaRoute,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { getProductMediaRules, getProductTypes } from "@/repositories/product-repository";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

type DraftMedia = {
  fileName: string;
  id: string;
  isCover: boolean;
  objectUrl: string;
  position: number;
  sizeLabel: string;
  status: "ready";
  type: "image" | "video";
};

const MAX_IMAGES = 5;
const MAX_VIDEO_SIZE = 40 * 1024 * 1024;
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const announcementTypes = [
  {
    id: "new-product",
    label: "Produtos novos",
    description: "Lojas, estoque, variacoes e venda com checkout.",
  },
  {
    id: "used-product",
    label: "Produtos usados",
    description: "Desapego, unico item e contato direto com comprador.",
  },
  {
    id: "service",
    label: "Servicos",
    description: "Agenda, raio de atendimento e orcamento.",
  },
  {
    id: "event",
    label: "Eventos e noticia",
    description: "Divulgacao, ingresso, cidade e moderacao.",
  },
] as const;

const categoryOptions = {
  "new-product": ["Mercado", "Comida e bebida", "Moda vestuario", "Automoveis", "Venda e locacao de imoveis"],
  "used-product": ["Moda vestuario", "Automoveis", "Tecnologia e eletronicos", "Moveis e decoracao", "Outros"],
  service: ["Prestadores de servico", "Empregos"],
  event: ["Eventos", "Evento e noticia"],
} satisfies Record<(typeof announcementTypes)[number]["id"], string[]>;

const subcategoryOptions: Record<string, string[]> = {
  Automoveis: ["Bicicleta", "Motos", "Carros", "Caminhonetes"],
  "Comida e bebida": ["Restaurantes", "Lanches", "Pizzarias", "Marmitas"],
  Empregos: ["Vagas abertas", "Freelancer", "Estagios"],
  Eventos: ["Evento publico", "Evento privado"],
  "Moda vestuario": ["Roupas", "Calcados", "Bolsas", "Acessorios"],
  "Prestadores de servico": ["Pedreiro", "Cabeleireiro", "Eletricista", "Pintor"],
  "Tecnologia e eletronicos": ["Smartphones", "Notebooks", "TVs"],
  "Venda e locacao de imoveis": ["Casa", "Apartamento", "Terreno"],
};

const aiSuggestions: Record<string, string[]> = {
  Calcados: ["Tenis / Calcados", "Sandalias", "Botas"],
  Caminhonetes: ["Picape diesel", "Utilitario 4x4", "Veiculo comercial"],
  Cabeleireiro: ["Salao de beleza", "Atendimento profissional", "Servico com agenda"],
  Casa: ["Casa a venda", "Casa para locacao", "Imovel patrocinado"],
  Lanches: ["Combo de lanche", "Produto de restaurante", "Oferta com adicionais"],
  Pedreiro: ["Servico de reforma", "Construcao do zero", "Orcamento por visita"],
  Roupas: ["Camiseta / Camisa / Blusa", "Conjuntos", "Vestidos / Saias"],
};

function formatFileSize(size: number) {
  const megabytes = size / 1024 / 1024;
  return `${megabytes.toFixed(megabytes >= 10 ? 0 : 1)} MB`;
}

function normalizeCover(media: DraftMedia[]) {
  const firstImageId = media.find((item) => item.type === "image")?.id;

  return media.map((item, index) => ({
    ...item,
    isCover: item.id === firstImageId,
    position: index,
  }));
}

export function ListingNewScreen() {
  const router = useRouter();
  const clearLocalSession = useAuthStore((state) => state.clearLocalSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const fullName = useAuthStore(
    (state) => state.profileDraft.fullName ?? state.accountDraft.fullName,
  );
  const productTypes = getProductTypes();
  const mediaRules = getProductMediaRules();
  const [announcementType, setAnnouncementType] = useState<(typeof announcementTypes)[number]["id"]>("new-product");
  const [selectedCategory, setSelectedCategory] = useState("Moda vestuario");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Roupas");
  const [selectedAiType, setSelectedAiType] = useState("Camiseta / Camisa / Blusa");
  const [draftMedia, setDraftMedia] = useState<DraftMedia[]>([]);
  const [mediaError, setMediaError] = useState("");
  const draftMediaRef = useRef<DraftMedia[]>([]);
  const imageCount = draftMedia.filter((item) => item.type === "image").length;
  const hasVideo = draftMedia.some((item) => item.type === "video");
  const canPublishDraft = imageCount > 0 && !mediaError;
  const categoriesForType = categoryOptions[announcementType];
  const subcategoriesForCategory = subcategoryOptions[selectedCategory] ?? ["Outros"];
  const suggestionsForSubcategory = aiSuggestions[selectedSubcategory] ?? [
    "Produto simples",
    "Produto com variacao",
    "Anuncio patrocinado",
  ];
  const mediaStatus = useMemo(() => {
    if (draftMedia.length === 0) {
      return "vazio";
    }

    if (imageCount >= MAX_IMAGES) {
      return "limite atingido";
    }

    return "pronto";
  }, [draftMedia.length, imageCount]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/announce");
      return;
    }

    if (!profileCompleted) {
      router.replace("/auth/profile");
    }
  }, [isAuthenticated, profileCompleted, router]);

  useEffect(() => {
    draftMediaRef.current = draftMedia;
  }, [draftMedia]);

  useEffect(() => {
    return () => {
      draftMediaRef.current.forEach((item) => URL.revokeObjectURL(item.objectUrl));
    };
  }, []);

  function handleMediaChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (files.length === 0) {
      return;
    }

    setMediaError("");
    setDraftMedia((currentMedia) => {
      const nextMedia = [...currentMedia];
      let nextImageCount = currentMedia.filter((item) => item.type === "image").length;
      let nextHasVideo = currentMedia.some((item) => item.type === "video");

      for (const file of files) {
        const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;

        if (!type) {
          setMediaError("Use apenas imagens ou um video curto.");
          continue;
        }

        if (type === "image" && nextImageCount >= MAX_IMAGES) {
          setMediaError("Limite de 5 imagens atingido.");
          continue;
        }

        if (type === "video" && nextHasVideo) {
          setMediaError("Use apenas um video por anuncio.");
          continue;
        }

        if (type === "image" && file.size > MAX_IMAGE_SIZE) {
          setMediaError("Imagem acima de 8 MB.");
          continue;
        }

        if (type === "video" && file.size > MAX_VIDEO_SIZE) {
          setMediaError("Video acima de 40 MB.");
          continue;
        }

        nextMedia.push({
          fileName: file.name,
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          isCover: false,
          objectUrl: URL.createObjectURL(file),
          position: nextMedia.length,
          sizeLabel: formatFileSize(file.size),
          status: "ready",
          type,
        });

        nextImageCount += type === "image" ? 1 : 0;
        nextHasVideo = nextHasVideo || type === "video";
      }

      return normalizeCover(nextMedia);
    });
  }

  function removeMedia(mediaId: string) {
    setMediaError("");
    setDraftMedia((currentMedia) => {
      const item = currentMedia.find((media) => media.id === mediaId);
      if (item) {
        URL.revokeObjectURL(item.objectUrl);
      }

      return normalizeCover(currentMedia.filter((media) => media.id !== mediaId));
    });
  }

  function moveMedia(mediaId: string, direction: -1 | 1) {
    setDraftMedia((currentMedia) => {
      const currentIndex = currentMedia.findIndex((item) => item.id === mediaId);
      const targetIndex = currentIndex + direction;

      if (currentIndex < 0 || targetIndex < 0 || targetIndex >= currentMedia.length) {
        return currentMedia;
      }

      const nextMedia = [...currentMedia];
      const [item] = nextMedia.splice(currentIndex, 1);
      nextMedia.splice(targetIndex, 0, item);
      return normalizeCover(nextMedia);
    });
  }

  function selectAnnouncementType(nextType: (typeof announcementTypes)[number]["id"]) {
    const firstCategory = categoryOptions[nextType][0];
    const firstSubcategory = subcategoryOptions[firstCategory]?.[0] ?? "Outros";
    setAnnouncementType(nextType);
    setSelectedCategory(firstCategory);
    setSelectedSubcategory(firstSubcategory);
    setSelectedAiType((aiSuggestions[firstSubcategory] ?? ["Produto simples"])[0]);
  }

  function selectCategory(category: string) {
    const firstSubcategory = subcategoryOptions[category]?.[0] ?? "Outros";
    setSelectedCategory(category);
    setSelectedSubcategory(firstSubcategory);
    setSelectedAiType((aiSuggestions[firstSubcategory] ?? ["Produto simples"])[0]);
  }

  function selectSubcategory(subcategory: string) {
    setSelectedSubcategory(subcategory);
    setSelectedAiType((aiSuggestions[subcategory] ?? ["Produto simples"])[0]);
  }

  return (
    <AuthFrame>
      <div className={styles.productBasePanel}>
        <span className={styles.productBaseIcon}>
          <FaBullhorn aria-hidden="true" />
        </span>
        <h1>{fullName ? `${fullName}, anuncie agora` : "Pronto para anunciar"}</h1>
        <p>
          Base do cadastro preparada para tipos diferentes de produto, midias,
          rascunho e publicacao por modulo.
        </p>

        <section className={styles.mediaRules} aria-label="Regras de midia">
          <h2>Midias do anuncio</h2>
          <div>
            {mediaRules.map((rule, index) => (
              <article key={rule.id}>
                {index === 2 ? <FaVideo aria-hidden="true" /> : <FaImages aria-hidden="true" />}
                <strong>{rule.label}</strong>
                <small>{rule.description}</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.mediaUploader} aria-label="Upload de midias do anuncio">
          <header>
            <div>
              <h2>Adicionar midias</h2>
              <small>
                {imageCount}/{MAX_IMAGES} imagens · {hasVideo ? "video incluido" : "video opcional"} · {mediaStatus}
              </small>
            </div>
            <label>
              <FaImages aria-hidden="true" />
              <span>Selecionar</span>
              <input accept="image/*,video/*" multiple onChange={handleMediaChange} type="file" />
            </label>
          </header>

          {mediaError ? <p className={styles.mediaError}>{mediaError}</p> : null}

          {draftMedia.length > 0 ? (
            <div className={styles.mediaPreviewGrid}>
              {draftMedia.map((item, index) => (
                <article key={item.id} className={styles.mediaPreviewItem}>
                  <span className={styles.mediaPreviewFrame}>
                    {item.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" src={item.objectUrl} />
                    ) : (
                      <video muted playsInline src={item.objectUrl} />
                    )}
                    {item.isCover ? <b>Capa</b> : null}
                  </span>
                  <div>
                    <strong>{item.fileName}</strong>
                    <small>
                      {item.type === "image" ? "Imagem" : "Video"} · {item.sizeLabel} · pronto
                    </small>
                  </div>
                  <nav aria-label={`Organizar ${item.fileName}`}>
                    <button
                      aria-label="Mover para cima"
                      disabled={index === 0}
                      onClick={() => moveMedia(item.id, -1)}
                      type="button"
                    >
                      <FaArrowUp aria-hidden="true" />
                    </button>
                    <button
                      aria-label="Mover para baixo"
                      disabled={index === draftMedia.length - 1}
                      onClick={() => moveMedia(item.id, 1)}
                      type="button"
                    >
                      <FaArrowDown aria-hidden="true" />
                    </button>
                    <button aria-label="Remover midia" onClick={() => removeMedia(item.id)} type="button">
                      <FaTimes aria-hidden="true" />
                    </button>
                  </nav>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.mediaEmptyState}>
              <FaImages aria-hidden="true" />
              <strong>Nenhuma midia adicionada</strong>
              <small>A primeira imagem selecionada vira capa do anuncio.</small>
            </div>
          )}
        </section>

        <section className={styles.productTypeList} aria-label="Tipo de anuncio">
          <h2>O que voce deseja anunciar?</h2>
          <button className={styles.ruleButton} type="button">
            <FaShieldAlt aria-hidden="true" />
            <span>
              <strong>Regras de anuncio</strong>
              <small>IA valida titulo, descricao, imagens e preco antes de publicar.</small>
            </span>
            <FaChevronRight aria-hidden="true" />
          </button>
          {announcementTypes.map((type) => (
            <button
              className={`${styles.flowOption} ${announcementType === type.id ? styles.flowOptionActive : ""}`}
              key={type.id}
              onClick={() => selectAnnouncementType(type.id)}
              type="button"
            >
              <span>
                <strong>{type.label}</strong>
                <small>{type.description}</small>
              </span>
              <FaCheckCircle aria-hidden="true" />
            </button>
          ))}
        </section>

        <section className={styles.guidedPanel} aria-label="Escolha de categoria">
          <h2>Escolha da categoria</h2>
          <div className={styles.pillGrid}>
            {categoriesForType.map((category) => (
              <button
                className={selectedCategory === category ? styles.pillActive : ""}
                key={category}
                onClick={() => selectCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.guidedPanel} aria-label="Escolha da subcategoria">
          <h2>Escolha da subcategoria</h2>
          <div className={styles.pillGrid}>
            {subcategoriesForCategory.map((subcategory) => (
              <button
                className={selectedSubcategory === subcategory ? styles.pillActive : ""}
                key={subcategory}
                onClick={() => selectSubcategory(subcategory)}
                type="button"
              >
                {subcategory}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.guidedPanel} aria-label="Sugestao de tipo por IA">
          <h2>
            <FaMagic aria-hidden="true" />
            Tipo sugerido pela IA
          </h2>
          <div className={styles.pillGrid}>
            {suggestionsForSubcategory.map((suggestion) => (
              <button
                className={selectedAiType === suggestion ? styles.pillActive : ""}
                key={suggestion}
                onClick={() => setSelectedAiType(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <p>
            A estrutura do anuncio sera preparada para {selectedAiType.toLowerCase()} em{" "}
            {selectedSubcategory.toLowerCase()}.
          </p>
        </section>

        <section className={styles.guidedPanel} aria-label="Configuracoes gerais">
          <h2>Configuracoes gerais</h2>
          <div className={styles.configGrid}>
            <article>
              <strong>Frete gratis</strong>
              <small>Sinop, Claudia, Sorriso, Lucas do Rio Verde e Nova Mutum.</small>
            </article>
            <article>
              <strong>Afiliados liberados</strong>
              <small>Qualquer afiliado pode compartilhar e ganhar 10%.</small>
            </article>
            <article>
              <strong>Rascunho salvo</strong>
              <small>Status pendente de revisao antes de publicar.</small>
            </article>
          </div>
        </section>

        <section className={styles.reviewPanel} aria-label="Revisao final do anuncio">
          <h2>Revisao final</h2>
          <div>
            <strong>{selectedAiType}</strong>
            <small>{selectedCategory} / {selectedSubcategory}</small>
          </div>
          <div>
            <strong>{imageCount || 0} imagens</strong>
            <small>{hasVideo ? "Video incluido" : "Video opcional nao incluido"}</small>
          </div>
          <div>
            <strong>Moderacao IA</strong>
            <small>Pronta para bloquear conteudo proibido e manter rascunho.</small>
          </div>
        </section>

        <section className={styles.productTypeList} aria-label="Campos esperados por produto">
          <h2>Campos esperados</h2>
          {productTypes.slice(0, 3).map((productType) => (
            <article key={productType.id}>
              <div>
                <strong>{productType.label}</strong>
                <p>{productType.description}</p>
                <small>{productType.requiredFields.slice(0, 4).join(" / ")}</small>
              </div>
              <FaRoute aria-hidden="true" />
            </article>
          ))}
        </section>

        <div className={styles.authActions}>
          <Link className={styles.primaryAction} href="/listings">
            {canPublishDraft ? "Postar anuncio" : "Salvar rascunho"}
          </Link>
          <button className={styles.outlineAction} onClick={clearLocalSession} type="button">
            Limpar sessão local
          </button>
        </div>
      </div>
    </AuthFrame>
  );
}
