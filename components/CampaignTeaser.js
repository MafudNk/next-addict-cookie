import Link from "next/link";

export default function RamadhanTeaser() {
  return (
    <section className="px-4 md:px-20 py-12 bg-[#FBF7F2]">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">

        {/* Text */}
        <div className="flex-1">
          <p className="text-sm tracking-widest text-[#3A5A40] mb-2">
            RAMADHAN & LEBARAN SPECIAL
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Berbagi Manis di Bulan Penuh Makna
          </h2>
          <p className="text-gray-600 mb-4">
            Hampers dan kue edisi terbatas, diproduksi khusus selama Ramadhan
            dengan jumlah yang sangat terbatas.
          </p>

          <div className="flex flex-wrap gap-2 text-xs mb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
              Limited Edition
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
              Pre-Order
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
              Siap Kirim Lebaran
            </span>
          </div>

          <Link
            href="/ramadhan"
            className="inline-block bg-[#C9A24D] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Lihat Koleksi Ramadhan →
          </Link>
        </div>

        {/* Visual Placeholder */}
        <div className="w-full md:w-1/3 h-48 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-400">
          Ramadhan Visual
        </div>
      </div>
    </section>
  );
}