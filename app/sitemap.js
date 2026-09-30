import { getProducts } from "@/lib/api/products";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  if (!SITE_URL) return [];
  const soft = await getProducts({ category: "soft" });
  const routes = ["", "/produk", "/order", "/ramadhan", "/ramadhan/hampers", "/ramadhan/signature"];
  return [
    ...routes.map((r) => ({ url: `${SITE_URL}${r}` })),
    ...soft.map((p) => ({ url: `${SITE_URL}/produk/${p.slug}` })),
  ];
}
