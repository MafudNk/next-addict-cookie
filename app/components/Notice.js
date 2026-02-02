export default function Notice() {
  return (
    <section className="px-4 md:px-20 py-10">
      <div className="max-w-5xl mx-auto bg-white border border-orange-100 rounded-3xl shadow-sm p-6 md:p-8 space-y-8">

        {/* VALUE PROPOSITION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl mb-2">🎁</p>
            <h3 className="font-semibold mb-1 text-gray-900">
              Edisi Terbatas
            </h3>
            <p className="text-sm text-gray-600">
              Khusus Ramadhan & Lebaran 2026
            </p>
          </div>

          <div>
            <p className="text-2xl mb-2">🍪</p>
            <h3 className="font-semibold mb-1 text-gray-900">
              Fresh & Handmade
            </h3>
            <p className="text-sm text-gray-600">
              Diproduksi bertahap, bukan stok lama
            </p>
          </div>

          <div>
            <p className="text-2xl mb-2">🚚</p>
            <h3 className="font-semibold mb-1 text-gray-900">
              Siap Kirim Lebaran
            </h3>
            <p className="text-sm text-gray-600">
              Jadwal aman sebelum Hari Raya
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-dashed border-orange-100" />

        {/* COLLECTION INFO */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            📦 Addict Bite Cookie Collection
          </h2>

          <ul className="text-sm md:text-base text-gray-700 space-y-1 list-disc pl-5">
            <li>
              Aneka Kue Kering{" "}
              <span className="text-red-500">(50 toples – semua varian)</span>
            </li>
            <li>
              Luxe Chocolate Bite{" "}
              <span className="text-red-500">(15 box)</span>
            </li>
            <li>
              Nastar Gold Butter{" "}
              <span className="text-red-500">(10 box)</span>
            </li>
            <li>Soft Cookie Reguler 70gr / pcs</li>
            <li>
              Soft Cookies Hampers 50gr / box isi 8{" "}
              <span className="text-red-500">(15 box)</span>
            </li>
          </ul>
        </div>

        {/* NOTE */}
        <div className="bg-orange-50 rounded-2xl p-4 space-y-2">
          <p className="font-semibold text-orange-700 flex items-center gap-2">
            ❗ Note & Mohon Dibaca
          </p>

          <ul className="text-sm md:text-base text-gray-700 space-y-1 list-disc pl-5">
            <li>
              <b>Pre-Order:</b> 2–16 Februari 2026 atau sampai kuota terpenuhi
            </li>
            <li>
              <b>Sidoarjo & Surabaya:</b> Sabtu, 14 Maret 2026
            </li>
            <li>
              <b>Probolinggo – Leces:</b> Rabu, 18 Maret 2026
            </li>
            <li className="text-xs text-gray-500">
              *Jadwal dapat berubah sewaktu-waktu
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}