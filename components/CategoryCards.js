import Link from "next/link";
import { getCurrentCampaign, getProducts } from "@/lib/api/products";
import { whatsappLink } from "@/lib/site";

// Kartu kategori dibentuk dari produk campaign aktif: kategori yang tidak punya
// produk tidak ditampilkan. Dua kartu terakhir bersifat tetap (bukan campaign).
export default async function CategoryCards() {
  const campaign = await getCurrentCampaign().catch(() => null);
  const products = campaign ? (await getProducts()).filter((p) => p.campaignId === campaign.id) : [];

  const group = (category) => {
    const items = products.filter((p) => p.category === category);
    if (items.length === 0) return null;
    const allGone = items.every((p) => !p.orderable);
    return { count: items.length, allGone };
  };

  const hampers = group("hampers");
  const signature = group("signature");

  const categories = [
    hampers && {
      title: "Hampers Spesial",
      desc: `Paket eksklusif ${campaign.name}, siap kirim sebagai hadiah.`,
      href: "/promo/hampers",
      badge: hampers.allGone ? "Tidak tersedia" : "Limited",
      emoji: "🎁",
      highlight: !hampers.allGone,
    },
    signature && {
      title: "Signature Series",
      desc: `Koleksi spesial ${campaign.name}.`,
      href: "/promo/signature",
      badge: signature.allGone ? "Tidak tersedia" : "New",
      emoji: "🌙",
    },
    {
      title: "Best Seller Cookies",
      desc: "Favorit pelanggan sepanjang tahun.",
      href: "/produk",
      badge: "Best Seller",
      emoji: "🍪",
    },
    {
      title: "Custom & Corporate Hampers",
      desc: "Hampers custom untuk kantor, relasi, dan keluarga besar.",
      href: whatsappLink("Halo, saya tertarik dengan Custom & Corporate Hampers"),
      external: true,
      badge: null,
      emoji: "🏢",
    },
  ].filter(Boolean);

  return (
    <section className="bg-orange-50 px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            {...(cat.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div
              className={`relative cursor-pointer rounded-2xl p-6 shadow-sm transition hover:shadow-md ${
                cat.highlight ? "bg-orange-100 border border-orange-200" : "bg-white"
              }`}
            >
              {cat.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500 text-white">
                  {cat.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {cat.emoji} {cat.title}
              </h3>
              <p className="text-gray-600 mb-4">{cat.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                Lihat Selengkapnya →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
