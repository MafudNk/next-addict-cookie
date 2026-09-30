import { products, campaigns } from "../catalog";

// Data layer. Saat backend siap, cukup ganti isi fungsi-fungsi ini menjadi
// fetch ke API (mis. next: { tags: ["products"] }); halaman tidak perlu diubah.

/**
 * @param {{category?: string, collection?: string, orderable?: boolean}} [filter]
 * @returns {Promise<import("../catalog").Product[]>}
 */
export async function getProducts({ category, collection, orderable } = {}) {
  return products
    .filter((p) => !category || p.category === category)
    .filter((p) => !collection || p.collection === collection)
    .filter((p) => !orderable || (p.status === "available" && p.price != null))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProductBySlug(slug, category) {
  return (
    products.find((p) => p.slug === slug && (!category || p.category === category)) ?? null
  );
}

export async function getProductsByIds(ids) {
  return products.filter((p) => ids.includes(p.id));
}

export async function getCampaign(id = "ramadhan-2026") {
  return campaigns.find((c) => c.id === id) ?? null;
}
