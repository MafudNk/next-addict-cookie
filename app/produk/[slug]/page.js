import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { getProducts, getProductBySlug } from "@/lib/api/products";
import { formatRupiah } from "@/lib/format";

export async function generateStaticParams() {
  try {
    const products = await getProducts({ category: "soft" });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return []; // BE tidak terjangkau saat build; halaman dirender saat diminta
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, "soft");
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug, "soft");
  if (!product) notFound();

  return (
    <section className="bg-orange-50 py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-orange-600 mb-4">{formatRupiah(product.price)}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">Bahan</h2>
          <ul className="list-disc pl-5 text-gray-700 mb-6">
            {product.ingredients.map((bahan) => (
              <li key={bahan}>{bahan}</li>
            ))}
          </ul>

          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
