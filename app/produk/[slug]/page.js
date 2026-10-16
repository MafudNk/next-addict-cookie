import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { getProducts, getProductBySlug, getCampaign } from "@/lib/api/products";
import { formatRupiah } from "@/lib/format";

const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const BACK = {
  soft: { href: "/produk", label: "Semua produk" },
  hampers: { href: "/promo/hampers", label: "Semua hampers" },
  signature: { href: "/promo/signature", label: "Semua signature" },
};

export async function generateStaticParams() {
  try {
    return (await getProducts()).map((p) => ({ slug: p.slug }));
  } catch {
    return []; // BE tidak terjangkau saat build; halaman dirender saat diminta
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    ...(product.images[0] && { openGraph: { images: [product.images[0]] } }),
  };
}

// Satu halaman detail untuk semua produk (soft, signature, hampers); isinya mengikuti data BE.
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const campaign = await getCampaign(product.campaignId).catch(() => null);
  const back = BACK[product.category] ?? BACK.soft;

  return (
    <section className="bg-orange-50 py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="md:w-2/3">
          {campaign && (
            <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full mb-3">
              {campaign.name}
            </span>
          )}
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-orange-600 mb-4">
            {formatRupiah(product.price)} <AvailabilityBadge product={product} className="ml-2 align-middle" />
          </p>
          {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}

          {product.ingredients.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Bahan</h2>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                {product.ingredients.map((bahan) => (
                  <li key={bahan}>{bahan}</li>
                ))}
              </ul>
            </>
          )}

          {product.bundle.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Isi Paket</h2>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                {product.bundle.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {campaign && (
            <div className="bg-orange-100 rounded-2xl p-4 text-sm space-y-1 text-gray-800 mb-6">
              <p>
                <b>Pre-Order:</b> {dateFmt.format(new Date(campaign.preorderStart))} – {dateFmt.format(new Date(campaign.preorderEnd))}
              </p>
              {product.quota != null && <p><b>Kuota:</b> {product.quota}{product.remaining != null && product.remaining < product.quota ? ` (sisa ${product.remaining})` : ""}</p>}
              {campaign.delivery.map((d) => (
                <p key={d.region}>🚚 {d.region}: {dateFmt.format(new Date(d.date))}</p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <Link href={back.href} className="border border-orange-300 px-6 py-3 rounded-full text-orange-600 font-medium">
              {back.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
