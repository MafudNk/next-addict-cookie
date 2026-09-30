import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getCampaign, getProducts, getProductBySlug } from "@/lib/api/products";
import { formatRupiah } from "@/lib/format";

// Hanya produk premium (Nastar Gold Butter, Luxe Chocolate Bite).
// "signature-cookies" punya folder sendiri dan diprioritaskan Next.js.
export async function generateStaticParams() {
  try {
    const items = await getProducts({ category: "signature", collection: "premium" });
    return items.map((p) => ({ slug: p.slug }));
  } catch {
    return []; // BE tidak terjangkau saat build; halaman dirender saat diminta
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getProductBySlug(slug, "signature");
  return item ? { title: item.name, description: item.description } : {};
}

const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function SignatureDetailPage({ params }) {
  const { slug } = await params;
  const item = await getProductBySlug(slug, "signature");
  if (!item || item.collection !== "premium") notFound();
  const campaign = await getCampaign(item.campaignId);

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <ProductImage src={item.images[0]} alt={item.name} width={600} height={600} className="rounded-2xl" priority />
        </div>

        <div className="space-y-6">
          <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            🌙 Ramadhan Signature · Limited
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
          <p className="text-gray-700">{item.description}</p>
          <p className="text-2xl font-bold text-gray-900">{formatRupiah(item.price)}</p>

          {campaign && (
            <div className="bg-orange-100 rounded-2xl p-4 text-sm space-y-1 text-gray-800">
              <p>
                <b>Pre-Order:</b> {dateFmt.format(new Date(campaign.preorderStart))} – {dateFmt.format(new Date(campaign.preorderEnd))}
              </p>
              {item.quota && <p><b>Kuota:</b> {item.quota} box</p>}
              <p>🚚 Ready sebelum Lebaran</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <AddToCartButton product={item} />
            <Link href="/ramadhan/signature" className="border border-orange-300 px-6 py-3 rounded-full text-orange-600 font-medium">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
