import Link from "next/link";
import ProductImage from "./ProductImage";
import AvailabilityBadge from "./AvailabilityBadge";
import { formatRupiah } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link href={`/produk/${product.slug}`}>
      <div className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-md transition h-full">
        <ProductImage src={product.thumbnail} alt={product.name} width={300} height={300} className="rounded-2xl mx-auto mb-4" />
        <h3 className="font-semibold text-lg text-center text-gray-900">{product.name}</h3>
        <p className="text-center font-bold mt-2 text-gray-800">{formatRupiah(product.price)}</p>
        <div className="text-center mt-2"><AvailabilityBadge product={product} /></div>
      </div>
    </Link>
  );
}
