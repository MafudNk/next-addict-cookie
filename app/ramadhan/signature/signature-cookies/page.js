import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getProducts } from "@/lib/api/products";
import { formatRupiah } from "@/lib/format";

export const metadata = { title: "Ramadhan Signature Cookie" };

export default async function SignatureCookiesPage() {
  const items = await getProducts({ category: "signature", collection: "signature-cookies" });

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Ramadhan Signature Cookie</h1>
      <p className="text-center text-gray-600 mb-10">A Luxurious Bite for Meaningful Moments</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item) => (
          <Link key={item.id} href={`/ramadhan/signature/signature-cookies/${item.slug}`}>
            <div className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-md transition">
              <ProductImage src={item.thumbnail} alt={item.name} width={300} height={300} className="rounded-2xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-center text-gray-900">{item.name}</h3>
              <p className="text-center font-bold mt-2 text-gray-800">{formatRupiah(item.price)}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-10">Note: Semua variant hanya 50 toples</p>
    </main>
  );
}
