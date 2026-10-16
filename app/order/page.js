import Link from "next/link";
import OrderPicker from "./OrderPicker";
import { getProducts, getCurrentCampaign } from "@/lib/api/products";

export const metadata = { title: "Pesan Cookies" };

export default async function OrderPage() {
  const [products, campaign] = await Promise.all([
    getProducts({ orderable: true }),
    getCurrentCampaign().catch(() => null),
  ]);

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 rounded-xl shadow-md bg-orange-50">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">🛒 Pesan Cookies</h2>

      {campaign?.isOpen && (
        <div className="mb-6 bg-white rounded-xl p-4 border border-orange-200">
          <h3 className="font-bold text-lg mb-2">🌙 {campaign.content.headline || campaign.name}</h3>
          {campaign.content.summary && <p className="text-sm text-gray-700">{campaign.content.summary}</p>}
          <Link href="/promo" className="inline-block mt-3 text-orange-600 font-medium underline">
            {campaign.content.ctaLabel || "Lihat Koleksi"} →
          </Link>
        </div>
      )}

      <OrderPicker products={products} />
    </div>
  );
}
