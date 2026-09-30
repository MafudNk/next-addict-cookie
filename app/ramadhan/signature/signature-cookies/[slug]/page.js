import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getProducts, getProductBySlug } from "@/lib/api/products";
import { formatRupiah } from "@/lib/format";

export async function generateStaticParams() {
  const items = await getProducts({ category: "signature", collection: "signature-cookies" });
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getProductBySlug(slug, "signature");
  return item ? { title: item.name, description: item.description } : {};
}

export default async function SignatureCookieDetail({ params }) {
  const { slug } = await params;
  const item = await getProductBySlug(slug, "signature");
  if (!item || item.collection !== "signature-cookies") notFound();

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImage src={item.images[0]} alt={item.name} width={500} height={500} className="rounded-3xl" priority />

        <div className="space-y-6">
          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">🌙 Ramadhan Signature</span>
          <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
          <p className="text-gray-700">{item.description}</p>
          <p className="text-2xl font-bold text-gray-900">{formatRupiah(item.price)}</p>

          <div className="flex gap-3">
            <AddToCartButton product={item} />
            <Link href="/ramadhan/signature/signature-cookies" className="border px-6 py-3 rounded-full text-gray-800">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
