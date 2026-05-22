import Image from "next/image";
import Link from "next/link";
import styles from "../listing-flow.module.css";

const automotiveCategories = [
  {
    id: "bicycle",
    image: "/listings/categories/bicycle-v2.png",
    name: "Bicicleta",
  },
  {
    id: "street-motorcycle",
    image: "/listings/categories/motorcycle-red-v2.png",
    name: "Motos",
  },
  { id: "cars", image: "/listings/categories/car-red-v2.png", name: "Carros" },
  {
    id: "off-road-motorcycle",
    image: "/listings/categories/motorcycle-blue-v2.png",
    name: "Motos",
  },
  {
    href: "/listings/vehicles/pickups",
    id: "pickups",
    image: "/listings/pickup-white.png",
    name: "Caminhonetes",
  },
  { id: "trucks", image: "/listings/categories/truck-v2.png", name: "Caminhoes" },
  { id: "vans", image: "/listings/categories/van-v2.png", name: "Onibus / Vans" },
  {
    id: "heavy-vehicle",
    image: "/listings/categories/heavy-vehicle-v2.png",
    name: "Veiculo Pesado",
  },
  {
    id: "consortium",
    image: "/listings/categories/consortium-v2.png",
    name: "Consorcio",
  },
  { id: "boats", image: "/listings/categories/boat-v2.png", name: "Nautica" },
  {
    id: "vintage-cars",
    image: "/listings/categories/vintage-car-v2.png",
    name: "Carros Antigos",
  },
] satisfies {
  id: string;
  image: string;
  name: string;
  href?: string;
}[];

function CategoryImage({ image, name }: { image: string; name: string }) {
  return (
    <Image
      alt=""
      fill
      loading="eager"
      sizes="60px"
      src={image}
      title={name}
    />
  );
}

export function AutomotiveCategoryPanel() {
  return (
    <section className={styles.subcategoryPanel} aria-label="Subcategorias de veiculos">
      {automotiveCategories.map(({ href, id, image, name }) =>
        href ? (
          <Link
            className={`${styles.subcategory} ${styles.subcategoryActive}`}
            href={href}
            key={id}
          >
            <span>
              <CategoryImage image={image} name={name} />
            </span>
            {name}
          </Link>
        ) : (
          <button className={styles.subcategory} key={id} type="button">
            <span>
              <CategoryImage image={image} name={name} />
            </span>
            {name}
          </button>
        ),
      )}
    </section>
  );
}
