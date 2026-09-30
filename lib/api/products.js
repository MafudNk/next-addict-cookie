import { apiGet } from "./client";

// Data layer: satu-satunya tempat halaman mengambil katalog. Semua data datang
// dari backend; bentuk Product/Campaign ada di docs/api-contract.md.

/** @typedef {{id:string,slug:string,name:string,category:"soft"|"signature"|"hampers",price:number|null,thumbnail:string,images:string[],description:string,ingredients:string[],bundle:string[],status:"available"|"sold_out",campaignId:string|null,collection:string|null,quota:number|null,sortOrder:number}} Product */
/** @typedef {{id:string,name:string,preorderStart:string,preorderEnd:string,delivery:{region:string,date:string}[],status:"open"|"closed"}} Campaign */

/** @returns {Promise<Product[]>} */
export async function getProducts({ category, collection, orderable } = {}) {
  const q = new URLSearchParams();
  if (category) q.set("category", category);
  if (collection) q.set("collection", collection);
  if (orderable) q.set("orderable", "true");
  const qs = q.toString();
  return (await apiGet(`/api/products${qs ? `?${qs}` : ""}`, { tags: ["products"] })) ?? [];
}

/** @returns {Promise<Product|null>} */
export async function getProductBySlug(slug, category) {
  const product = await apiGet(`/api/products/${encodeURIComponent(slug)}`, { tags: ["products"] });
  return product && (!category || product.category === category) ? product : null;
}

/** @returns {Promise<Campaign|null>} */
export async function getCampaign(id = "ramadhan-2026") {
  if (!id) return null;
  return apiGet(`/api/campaigns/${encodeURIComponent(id)}`, { tags: ["campaigns"] });
}
