import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, getSeedProducts } from "@/repositories/product-repository";
import { ProductDetailScreen } from "./_components/product-detail-screen";

export function generateStaticParams() {
  return getSeedProducts().map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[productId]">) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailScreen product={product} relatedProducts={getRelatedProducts(product.id)} />;
}
