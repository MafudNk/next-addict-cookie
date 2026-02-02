import Link from "next/link";

export default function CategoryCards() {
  const categories = [
    {
      title: "Soft Cookies Spesial Hampers",
      desc: "Paket eksklusif Ramadhan & Lebaran, siap kirim sebagai hadiah.",
      href: "/ramadhan/hampers",
      badge: "Limited",
      emoji: "🎁",
      highlight: true,
    },
    {
      title: "Ramadhan Signature Series",
      desc: "Koleksi spesial yang hanya hadir di bulan suci.",
      href: "/ramadhan/signature",
      badge: "New",
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
      href: "/custom-hampers",
      badge: null,
      emoji: "🏢",
    },
  ];

  return (
    <section className="bg-orange-50 px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <Link key={i} href={cat.href}>
            <div
              className={`relative cursor-pointer rounded-2xl p-6 shadow-sm transition hover:shadow-md
              ${
                cat.highlight
                  ? "bg-orange-100 border border-orange-200"
                  : "bg-white"
              }`}
            >
              {/* Badge */}
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