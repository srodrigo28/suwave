import type { Listing } from "@/models/listing";

const listings: Listing[] = [
  {
    image: "/marketplace/beige-set.png",
    imageKind: "outfit",
    place: "Sinop - MT",
    price: "R$ 89,90",
    productId: "produto-conjunto-masculino-premium",
    tags: ["destaque"],
    title: "Conjunto Masculino Básico Premium",
  },
  {
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    place: "Sinop - MT",
    price: "R$ 750.000,00",
    tags: ["destaque"],
    title: "Casa à venda no Jardim das Oliveiras",
  },
  {
    image: "/marketplace/phone-pair.png",
    imageKind: "phonePair",
    place: "Sinop - MT",
    price: "R$ 3.499,00",
    tags: ["destaque"],
    title: "Smartphone preto 256 GB",
  },
  {
    badge: "Promocao",
    image: "/marketplace/pizza-promo.png",
    imageKind: "pizza",
    place: "Centro",
    price: "R$ 49,90",
    productId: "produto-pizza-grande-entrega",
    title: "Pizza grande com entrega",
  },
];

const pickupListings: Listing[] = [
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "38.000 km",
    modelYear: "2021",
    place: "Sinop - MT",
    price: "R$ 179.900,00",
    seller: "Auto Center Silva",
    slug: "ford-ranger-xlt-3-2-4x4",
    title: "Ford Ranger XLT 3.2 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "45.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 189.900,00",
    seller: "Auto Center Silva",
    slug: "toyota-hilux-srx-2-8-4x4",
    title: "Toyota Hilux SRX 2.8 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "41.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 169.900,00",
    seller: "Auto Center Silva",
    slug: "chevrolet-s10-ltz-2-8-4x4",
    title: "Chevrolet S10 LTZ 2.8 4x4",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "33.000 km",
    modelYear: "2022",
    place: "Sinop - MT",
    price: "R$ 174.900,00",
    seller: "Auto Center Silva",
    slug: "mitsubishi-l200-triton-sport",
    title: "Mitsubishi L200 Triton Sport HPE",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Preta",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-black",
    mileage: "36.000 km",
    modelYear: "2023",
    place: "Sinop - MT",
    price: "R$ 182.900,00",
    seller: "Auto Center Silva",
    slug: "volkswagen-amarok-v6",
    title: "Volkswagen Amarok V6",
    transmission: "Automatica",
  },
  {
    category: "Caminhonetes",
    color: "Branca",
    fuel: "Diesel",
    image: "",
    imageKind: "pickup-white",
    mileage: "54.000 km",
    modelYear: "2021",
    place: "Sinop - MT",
    price: "R$ 159.900,00",
    seller: "Auto Center Silva",
    slug: "nissan-frontier-le",
    title: "Nissan Frontier LE",
    transmission: "Automatica",
  },
];

const bicycleListings: Listing[] = [
  {
    category: "Automoveis e outros transportes > Bicicletas",
    color: "Preto/Laranja",
    condition: "Usado",
    description:
      "Bicicleta revisada, quadro em aluminio, pneus bons, suspensao dianteira e freios a disco. Ideal para cidade e trilhas leves.",
    gears: "21",
    image: "/listings/categories/bicycle-v2.png",
    imageKind: "bicycle",
    place: "Sinop - MT",
    price: "R$ 750,00",
    seller: "Joao Silva",
    slug: "bicicleta-mtb-aro-29-aluminio-21-marchas",
    title: "Bicicleta MTB Aro 29 Aluminio 21 Marchas",
    wheelSize: "29",
  },
  {
    category: "Automoveis e outros transportes > Bicicletas",
    color: "Azul",
    condition: "Novo",
    description:
      "Modelo novo para passeio urbano, selim confortavel, freios regulados e garantia da loja.",
    gears: "18",
    image: "/listings/categories/bicycle.png",
    imageKind: "bicycle",
    place: "Sinop - MT",
    price: "R$ 1.190,00",
    seller: "Bike Center Sinop",
    slug: "bicicleta-urbana-aro-26-confort",
    title: "Bicicleta Urbana Aro 26 Confort",
    wheelSize: "26",
  },
  {
    category: "Automoveis e outros transportes > Bicicletas",
    color: "Vermelho",
    condition: "Usado",
    description:
      "Bicicleta infantil com rodinhas removiveis, pintura conservada e corrente lubrificada.",
    gears: "1",
    image: "/listings/categories/bicycle-v2.png",
    imageKind: "bicycle",
    place: "Sinop - MT",
    price: "R$ 390,00",
    seller: "Marina Costa",
    slug: "bicicleta-infantil-aro-16",
    title: "Bicicleta Infantil Aro 16",
    wheelSize: "16",
  },
];

const houseListings: Listing[] = [
  {
    areaBuilt: "150 m2",
    areaLot: "300 m2",
    bathrooms: "2 banheiros",
    bedrooms: "3 quartos",
    category: "Venda e locacao de imoveis > Casas",
    description:
      "Casa ampla e aconchegante, com excelente acabamento, localizada em um dos melhores bairros de Sinop. Proxima a escolas, mercados e com facil acesso ao centro.",
    financing: "Sim",
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    listingType: "Venda",
    neighborhood: "Jardim das Oliveiras",
    parkingSpaces: "2 vagas",
    place: "Sinop - MT",
    price: "R$ 750.000,00",
    seller: "Oliveira Imoveis",
    slug: "casa-venda-jardim-das-oliveiras",
    tags: ["destaque"],
    title: "Casa a venda - Jardim das Oliveiras",
  },
  {
    areaBuilt: "132 m2",
    areaLot: "250 m2",
    bathrooms: "2 banheiros",
    bedrooms: "3 quartos",
    category: "Venda e locacao de imoveis > Casas",
    description:
      "Casa pronta para morar em rua tranquila, cozinha planejada e quintal nos fundos.",
    financing: "Sim",
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    listingType: "Venda",
    neighborhood: "Residencial Sao Francisco",
    parkingSpaces: "2 vagas",
    place: "Sinop - MT",
    price: "R$ 620.000,00",
    seller: "Norte Prime Imoveis",
    slug: "casa-venda-residencial-sao-francisco",
    title: "Casa a venda - Residencial Sao Francisco",
  },
  {
    areaBuilt: "98 m2",
    areaLot: "220 m2",
    bathrooms: "1 banheiro",
    bedrooms: "2 quartos",
    category: "Venda e locacao de imoveis > Casas",
    description:
      "Casa para locacao com boa ventilacao, garagem coberta e acesso rapido aos comercios do bairro.",
    financing: "Nao se aplica",
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    listingType: "Locacao",
    neighborhood: "Jardim Italia",
    parkingSpaces: "1 vaga",
    place: "Sinop - MT",
    price: "R$ 2.200,00",
    seller: "Imobiliaria Centro Norte",
    slug: "casa-locacao-jardim-italia",
    title: "Casa para locacao - Jardim Italia",
  },
  {
    areaBuilt: "180 m2",
    areaLot: "360 m2",
    bathrooms: "3 banheiros",
    bedrooms: "4 quartos",
    category: "Venda e locacao de imoveis > Casas",
    description:
      "Imovel espacoso com sala integrada, area gourmet e estrutura para escritorio.",
    financing: "Sim",
    image: "/marketplace/modern-house.png",
    imageKind: "house",
    listingType: "Venda",
    neighborhood: "Setor Industrial",
    parkingSpaces: "3 vagas",
    place: "Sinop - MT",
    price: "R$ 890.000,00",
    seller: "Oliveira Imoveis",
    slug: "casa-venda-setor-industrial",
    title: "Casa a venda - Setor Industrial",
  },
];

export function getMarketplaceListings() {
  return listings;
}

export function getPickupListings() {
  return pickupListings;
}

export function getPickupListingBySlug(listingSlug: string) {
  return pickupListings.find((listing) => listing.slug === listingSlug);
}

export function getBicycleListings() {
  return bicycleListings;
}

export function getBicycleListingBySlug(listingSlug: string) {
  return bicycleListings.find((listing) => listing.slug === listingSlug);
}

export function getHouseListings() {
  return houseListings;
}

export function getHouseListingBySlug(listingSlug: string) {
  return houseListings.find((listing) => listing.slug === listingSlug);
}
