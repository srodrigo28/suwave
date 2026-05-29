import type { Product, ProductMediaRule, ProductType } from "@/models/product";

const productTypes: ProductType[] = [
  {
    description: "Carros, motos, caminhonetes e outros veiculos com dados tecnicos.",
    id: "vehicle",
    label: "Veiculo",
    requiredFields: ["Marca", "Modelo", "Ano", "Km", "Combustivel", "Cambio", "Cor"],
  },
  {
    description: "Roupas e acessorios com tamanho, cor, condicao e variacoes.",
    id: "fashion",
    label: "Moda e vestuario",
    requiredFields: ["Tamanho", "Genero", "Condicao", "Cor"],
  },
  {
    description: "Itens de loja ou restaurante com preparo, adicionais e disponibilidade.",
    id: "food",
    label: "Comida e bebida",
    requiredFields: ["Loja", "Tempo de preparo", "Disponibilidade"],
  },
  {
    description: "Venda ou locacao com dados de area, quartos e endereco aproximado.",
    id: "real_estate",
    label: "Imovel",
    requiredFields: ["Operacao", "Tipo", "Quartos", "Banheiros", "Area"],
  },
  {
    description: "Prestacao de servico com agenda, raio de atendimento e preco base.",
    id: "service",
    label: "Servico",
    requiredFields: ["Area atendida", "Preco base", "Disponibilidade"],
  },
];

const mediaRules: ProductMediaRule[] = [
  {
    description: "A primeira imagem sera usada como capa do anuncio.",
    id: "cover",
    label: "Capa obrigatoria",
  },
  {
    description: "Cada cadastro aceita ate 5 imagens, com ordenacao e remocao antes de publicar.",
    id: "five-images",
    label: "Ate 5 imagens",
  },
  {
    description: "Video e opcional e deve entrar como midia complementar do produto.",
    id: "optional-video",
    label: "Video opcional",
  },
];

const products: Product[] = [
  {
    attributes: {
      vehicle: {
        brand: "Ford",
        color: "Branca",
        fuel: "Diesel",
        mileage: "38.000 km",
        model: "Ranger XLT",
        modelYear: "2021",
        transmission: "Automatica",
      },
    },
    categoryId: "automotive",
    checkoutHref: "/help?product=produto-ford-ranger-xlt-2021",
    city: "Sinop",
    createdAt: "2026-05-28T18:00:00Z",
    currency: "BRL",
    description: "Caminhonete diesel com revisoes em dia, pronta para vistoria em Sinop.",
    id: "produto-ford-ranger-xlt-2021",
    media: [
      {
        altText: "Ford Ranger branca em destaque",
        createdAt: "2026-05-28T18:00:00Z",
        id: "media-ranger-cover",
        isCover: true,
        position: 0,
        status: "ready",
        thumbnailUrl: "/listings/pickup-white.png",
        type: "image",
        url: "/listings/pickup-white.png",
      },
    ],
    price: "R$ 179.900,00",
    publishedAt: "2026-05-28T18:00:00Z",
    sellerId: "seller-auto-center-silva",
    sellerName: "Auto Center Silva",
    state: "MT",
    status: "published",
    subcategoryId: "pickups",
    title: "Ford Ranger XLT 3.2 4x4",
    type: "vehicle",
    updatedAt: "2026-05-28T18:00:00Z",
  },
  {
    attributes: {
      fashion: {
        color: "Bege",
        condition: "Novo",
        gender: "Masculino",
        size: "M, G e GG",
      },
    },
    categoryId: "fashion",
    checkoutHref: "/orders/pedido-tenis-sport-style-4926",
    city: "Sinop",
    createdAt: "2026-05-28T18:05:00Z",
    currency: "BRL",
    description: "Conjunto novo com tecido leve, ideal para uso diario.",
    id: "produto-conjunto-masculino-premium",
    media: [
      {
        altText: "Conjunto masculino bege",
        createdAt: "2026-05-28T18:05:00Z",
        id: "media-conjunto-cover",
        isCover: true,
        position: 0,
        status: "ready",
        thumbnailUrl: "/marketplace/beige-set.png",
        type: "image",
        url: "/marketplace/beige-set.png",
      },
    ],
    price: "R$ 89,90",
    publishedAt: "2026-05-28T18:05:00Z",
    sellerId: "seller-loja-sport-style",
    sellerName: "Loja Sport Style",
    state: "MT",
    status: "published",
    subcategoryId: "men",
    title: "Conjunto Masculino Basico Premium",
    type: "fashion",
    updatedAt: "2026-05-28T18:05:00Z",
  },
  {
    attributes: {
      food: {
        availability: "Hoje ate 23h",
        preparationTime: "35-45 min",
        store: "Hamburgueria Salamanca Ca'dore",
      },
    },
    categoryId: "food",
    checkoutHref: "/food/snacks/hamburgueria-salamanca-cadore",
    city: "Sinop",
    createdAt: "2026-05-28T18:10:00Z",
    currency: "BRL",
    description: "Pizza grande promocional com entrega local e adicionais opcionais.",
    id: "produto-pizza-grande-entrega",
    media: [
      {
        altText: "Pizza grande promocional",
        createdAt: "2026-05-28T18:10:00Z",
        id: "media-pizza-cover",
        isCover: true,
        position: 0,
        status: "ready",
        thumbnailUrl: "/marketplace/pizza-promo.png",
        type: "image",
        url: "/marketplace/pizza-promo.png",
      },
    ],
    price: "R$ 49,90",
    publishedAt: "2026-05-28T18:10:00Z",
    sellerId: "seller-hamburgueria-salamanca",
    sellerName: "Hamburgueria Salamanca Ca'dore",
    state: "MT",
    status: "published",
    subcategoryId: "pizza",
    title: "Pizza grande com entrega",
    type: "food",
    updatedAt: "2026-05-28T18:10:00Z",
  },
];

export function getProductTypes() {
  return productTypes;
}

export function getProductMediaRules() {
  return mediaRules;
}

export function getSeedProducts() {
  return products;
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getRelatedProducts(productId: string) {
  const product = getProductById(productId);

  if (!product) {
    return [];
  }

  return products.filter((item) => item.id !== product.id && item.type === product.type);
}
