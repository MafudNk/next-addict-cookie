import Link from "next/link";
import { getCurrentCampaign } from "@/lib/api/products";

const fmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", timeZone: "UTC" });

export default async function AnnouncementBar() {
  // Layout ini dipakai semua halaman: kegagalan BE tidak boleh merusak seluruh situs.
  const campaign = await getCurrentCampaign().catch(() => null);
  if (!campaign) return null;

  const { announcementOpen, announcementClosed } = campaign.content;
  const text = campaign.isOpen
    ? announcementOpen || `${campaign.name}: Pre-Order dibuka sampai ${fmt.format(new Date(campaign.preorderEnd))} 🤍`
    : announcementClosed || `Terima kasih, ${campaign.name} sudah ditutup 🤍`;

  return (
    <div className="w-full bg-[#3A5A40] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <span className="hidden sm:inline">🌙</span>
        <p className="leading-tight">{text}</p>
        <Link href="/promo" className="ml-2 underline font-medium hover:opacity-80 whitespace-nowrap">
          Lihat →
        </Link>
      </div>
    </div>
  );
}
