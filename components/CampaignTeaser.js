import Link from "next/link";
import Image from "next/image";
import { getCurrentCampaign } from "@/lib/api/products";

// Teks & gambar berasal dari campaign.content (diatur di admin). Kosong = teks netral.
export default async function CampaignTeaser() {
  const campaign = await getCurrentCampaign().catch(() => null);
  if (!campaign) return null;
  const { headline, summary, ctaLabel, chips, teaserImage } = campaign.content;

  return (
    <section className="px-4 md:px-20 py-12 bg-[#FBF7F2]">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-sm tracking-widest text-[#3A5A40] mb-2 uppercase">{campaign.name}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{headline || campaign.name}</h2>
          {summary && <p className="text-gray-600 mb-4">{summary}</p>}

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs mb-6">
              {chips.map((chip) => (
                <span key={chip} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                  {chip}
                </span>
              ))}
            </div>
          )}

          <Link
            href="/promo"
            className="inline-block bg-[#C9A24D] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            {ctaLabel || "Lihat Koleksi"} →
          </Link>
        </div>

        {teaserImage && (
          <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-orange-100">
            <Image src={teaserImage} alt={campaign.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
