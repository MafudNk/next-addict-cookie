import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getCampaign, getProducts, getProductBySlug } from "@/lib/api/products";

export async function generateStaticParams() {
  const items = await getProducts({ category: "hampers" });
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hamper = await getProductBySlug(slug, "hampers");
  return hamper ? { title: hamper.name, description: hamper.description } : {};
}

const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function HampersDetail({ params }) {
  const { slug } = await params;
  const hamper = await getProductBySlug(slug, "hampers");
  if (!hamper) notFound();
  const campaign = await getCampaign(hamper.campaignId);

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <ProductImage src={hamper.images[0]} alt={hamper.name} width={600} height={600} className="rounded-2xl" priority />
        </div>

        <div className="space-y-6">
          <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            🎁 Ramadhan Special · Limited Edition
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{hamper.name}</h1>
          <p className="text-gray-700">{hamper.description}</p>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Isi Hampers:</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {hamper.bundle.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {campaign && (
            <div className="bg-orange-100 rounded-2xl p-4 text-sm space-y-1 text-gray-800">
              <p>
                <b>Pre-Order:</b> {dateFmt.format(new Date(campaign.preorderStart))} – {dateFmt.format(new Date(campaign.preorderEnd))}
              </p>
              <p><b>Kuota:</b> {hamper.quota} box</p>
              <p>🚚 Pengiriman sebelum Lebaran</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <AddToCartButton product={hamper} />
            <Link href="/ramadhan" className="border border-orange-300 px-6 py-3 rounded-full text-orange-600 font-medium">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
