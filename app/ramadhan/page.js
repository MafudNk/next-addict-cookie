import Link from "next/link";
import CategoryCards from "../components/CategoryCards";
import Notice from "../components/Notice";
export default function RamadhanLanding() {
  return (
    <main className="bg-[#FBF7F2] text-[#2E2E2E]">

      {/* HERO */}
      <section className="px-6 py-20 text-center">
        <p className="text-sm tracking-widest text-[#3A5A40] mb-3">
          RAMADHAN & LEBARAN SPECIAL
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Berbagi Manis di <br className="hidden md:block" />
          Bulan Penuh Makna
        </h1>
        <p className="max-w-xl mx-auto text-gray-600 mb-8">
          Hampers dan kue Lebaran edisi terbatas, dibuat dengan sepenuh hati
          untuk keluarga dan orang tersayang.
        </p>

        <Link
          href="#kategori"
          className="inline-block bg-[#C9A24D] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Lihat Koleksi
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
        <h3 className="text-2xl font-semibold mb-3">
          Pre-Order Dibuka Terbatas
        </h3>
        <p className="mb-6 text-sm opacity-90">
          Produksi dibatasi untuk menjaga kualitas. Tutup sebelum Lebaran.
        </p>
        <Link
          href="/ramadhan/hampers"
          className="inline-block bg-[#C9A24D] px-8 py-3 rounded-full font-medium hover:opacity-90"
        >
          Pesan Sekarang
        </Link>
      </section>

    </main>
  );
}