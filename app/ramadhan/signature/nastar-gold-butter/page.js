import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { signatures } from "../data";

export default function NastarDetail() {
  const item = signatures.find((s) => s.slug === 'nastar-gold-butter');
  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={600}
            className="rounded-2xl"
            priority
          />
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            🌙 Ramadhan Signature · Limited
          </span>

          <h1 className="text-3xl font-bold text-gray-900">
            {item.name}
          </h1>

          <p className="text-gray-700">
            {item.description}
          </p>

          <div className="bg-orange-100 rounded-2xl p-4 text-sm space-y-1">
            <p><b>Pre-Order:</b> {item.preorder}</p>
            <p><b>Kuota:</b> {item.quota} {item.weight}</p>
            <p>🚚 Ready sebelum Lebaran</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              href="/order"
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600"
            >
              Pesan Sekarang
            </Link>
            <Link
              href="/ramadhan/signature"
              className="border border-orange-300 px-6 py-3 rounded-full text-orange-600 font-medium"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}