import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#3A5A40] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <span className="hidden sm:inline">🌙</span>

        <p className="leading-tight">
          <span className="font-semibold">
            Ramadhan & Lebaran Special
          </span>{" "}
          — Hampers & kue edisi terbatas · Pre-Order sekarang
        </p>
{/* “Terima kasih, Ramadhan Collection Sold Out 🤍” */}
        <Link
          href="/ramadhan"
          className="ml-2 underline font-medium hover:opacity-80 whitespace-nowrap"
        >
          Lihat →
        </Link>
      </div>
    </div>
  );
}