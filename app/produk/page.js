import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getProducts } from "@/lib/api/products";

export const metadata = {
  title: "Produk",
  description: "Semua varian soft cookies Addict Bite Cookie.",
};

export default async function ProductPage() {
  const cookies = await getProducts({ category: "soft" });
  return (
    <section className="bg-orange-50 px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cookies.map((product) => (
          <Link key={product.id} href={`/produk/${product.slug}`}>
            <div className="rounded-2xl shadow p-4 flex flex-col items-center bg-white">
              <ProductImage
                src={product.thumbnail}
                alt={product.name}
                width={180}
                height={180}
                className="object-cover rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold text-center text-gray-900">{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
