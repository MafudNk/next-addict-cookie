import { apiGet } from "./client";

// Data layer: satu-satunya tempat halaman mengambil katalog. Semua data datang
// dari backend; bentuk Product/Campaign ada di docs/api-contract.md.

/** @typedef {{id:string,slug:string,name:string,category:"soft"|"signature"|"hampers",price:number|null,thumbnail:string,images:string[],description:string,ingredients:string[],bundle:string[],status:"available"|"sold_out",campaignId:string|null,collection:string|null,quota:number|null,remaining:number|null,orderable:boolean,sortOrder:number}} Product */
/** @typedef {{headline:string,summary:string,ctaLabel:string,chips:string[],teaserImage:string|null,announcementOpen:string,announcementClosed:string,highlights:string[],notes:string[]}} CampaignContent */
/** @typedef {{id:string,name:string,preorderStart:string,preorderEnd:string,delivery:{region:string,date:string}[],status:"open"|"closed",isOpen:boolean,content:CampaignContent}} Campaign */

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

/** Campaign milik sebuah produk (Product.campaignId). @returns {Promise<Campaign|null>} */
export async function getCampaign(id) {
  if (!id) return null;
  return apiGet(`/api/campaigns/${encodeURIComponent(id)}`, { tags: ["campaigns"] });
}

/** Campaign yang sedang tampil di situs; id-nya ditentukan BE, bukan ditulis di kode. @returns {Promise<Campaign|null>} */
export async function getCurrentCampaign() {
  return apiGet("/api/campaigns/current", { tags: ["campaigns"] });
}

/** Produk milik campaign yang sedang aktif, opsional per kategori. @returns {Promise<{campaign: Campaign|null, products: Product[]}>} */
export async function getCampaignProducts(category) {
  const campaign = await getCurrentCampaign().catch(() => null);
  if (!campaign) return { campaign: null, products: [] };
  const products = (await getProducts({ category })).filter((p) => p.campaignId === campaign.id);
  return { campaign, products };
}
