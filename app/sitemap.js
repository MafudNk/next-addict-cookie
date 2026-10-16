import { getProducts } from "@/lib/api/products";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  if (!SITE_URL) return [];
  const products = await getProducts();
  const routes = ["", "/produk", "/order", "/promo", "/promo/hampers", "/promo/signature"];
  return [
    ...routes.map((r) => ({ url: `${SITE_URL}${r}` })),
    ...products.map((p) => ({ url: `${SITE_URL}/produk/${p.slug}` })),
  ];
}
