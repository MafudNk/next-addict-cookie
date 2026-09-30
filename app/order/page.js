import Link from "next/link";
import OrderPicker from "./OrderPicker";
import { getProducts } from "@/lib/api/products";

export const metadata = { title: "Pesan Cookies" };

export default async function OrderPage() {
  const products = await getProducts({ orderable: true });

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 rounded-xl shadow-md bg-orange-50">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">🛒 Pesan Cookies</h2>

      <div className="mb-6 bg-white rounded-xl p-4 border border-orange-200">
        <h3 className="font-bold text-lg mb-3">🌙 Ramadhan Special (Limited)</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>🎁 Signature Cookies (Aneka kue kering)</p>
          <p>🍍 Nastar Gold Butter</p>
          <p>🍫 Luxe Chocolate Bite</p>
        </div>
        <Link href="/ramadhan" className="inline-block mt-3 text-orange-600 font-medium underline">
          Lihat Detail Ramadhan →
        </Link>
      </div>

      <OrderPicker products={products} />
    </div>
  );
}
