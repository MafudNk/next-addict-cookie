import Link from "next/link";
import CategoryCards from "@/components/CategoryCards";
import Notice from "@/components/Notice";
import { getCurrentCampaign } from "@/lib/api/products";
const fmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const metadata = { title: "Promo" };

export default async function CampaignLanding() {
  const campaign = await getCurrentCampaign().catch(() => null);
  const isOpen = campaign?.isOpen ?? false;

  return (
    <main className="bg-[#FBF7F2] text-[#2E2E2E]">

      {/* HERO */}
      <section className="px-6 py-20 text-center">
        <p className="text-sm tracking-widest text-[#3A5A40] mb-3 uppercase">
          {campaign?.name ?? "Koleksi Spesial"}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          {campaign?.content.headline || campaign?.name || "Koleksi Spesial"}
        </h1>
        {campaign?.content.summary && (
          <p className="max-w-xl mx-auto text-gray-600 mb-8">{campaign.content.summary}</p>
        )}

        <Link
          href="#kategori"
          className="inline-block bg-[#C9A24D] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          {campaign?.content.ctaLabel || "Lihat Koleksi"}
        </Link>
      </section>

      {/* HIGHLIGHT */}
      <section className="px-6 py-14 bg-[#EFE6D8]">
        <Notice />
      </section>

      {/* KATEGORI */}
      <section id="kategori" className="px-6 py-20">
        <CategoryCards />
      </section>

      {/* URGENCY */}
      <section className="px-6 py-16 text-center bg-[#3A5A40] text-white">
        {isOpen ? (
          <>
            <h3 className="text-2xl font-semibold mb-3">Pre-Order Dibuka Terbatas</h3>
            <p className="mb-6 text-sm opacity-90">
              Produksi dibatasi untuk menjaga kualitas. Pre-order sampai {fmt.format(new Date(campaign.preorderEnd))}.
            </p>
            <Link
              href="/order"
              className="inline-block bg-[#C9A24D] px-8 py-3 rounded-full font-medium hover:opacity-90"
            >
              Pesan Sekarang
            </Link>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-3">Pre-Order Ditutup</h3>
            <p className="text-sm opacity-90">
              {campaign
                ? `Pre-order ${campaign.name} berlangsung ${fmt.format(new Date(campaign.preorderStart))} – ${fmt.format(new Date(campaign.preorderEnd))}. Terima kasih atas antusiasmenya 🤍`
                : "Pre-order sedang ditutup. Terima kasih atas antusiasmenya 🤍"}
            </p>
          </>
        )}
      </section>

    </main>
  );
}