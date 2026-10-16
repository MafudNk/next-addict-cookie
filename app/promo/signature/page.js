import ProductCard from "@/components/ProductCard";
import { getCampaignProducts } from "@/lib/api/products";

export const metadata = { title: "Signature" };

const humanize = (slug) => slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export default async function SignaturePage() {
  const { campaign, products } = await getCampaignProducts("signature");

  // Kelompokkan per koleksi (data dari BE), bukan daftar kartu yang ditulis di kode.
  const groups = new Map();
  for (const p of products) groups.set(p.collection ?? "", [...(groups.get(p.collection ?? "") ?? []), p]);
  const sections = [...groups.entries()];

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">🌙 Signature</h1>
      {campaign && <p className="text-center text-gray-600 mb-10">{campaign.name}</p>}

      {sections.length === 0 && <p className="text-center text-gray-600">Belum ada produk signature untuk campaign ini.</p>}

      <div className="space-y-12 max-w-6xl mx-auto">
        {sections.map(([collection, items]) => (
          <section key={collection || "lainnya"}>
            {sections.length > 1 && collection && (
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{humanize(collection)}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
