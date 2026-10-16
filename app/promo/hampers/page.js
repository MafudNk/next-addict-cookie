import ProductCard from "@/components/ProductCard";
import { getCampaignProducts } from "@/lib/api/products";

export const metadata = { title: "Hampers" };

export default async function HampersPage() {
  const { campaign, products } = await getCampaignProducts("hampers");

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">🎁 Hampers</h1>
      {campaign && <p className="text-center text-gray-600 mb-10">{campaign.name}</p>}

      {products.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada hampers untuk campaign ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
              {p.quota != null && <p className="text-xs text-red-500 mt-2 text-center">Kuota terbatas ({p.quota} box)</p>}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
