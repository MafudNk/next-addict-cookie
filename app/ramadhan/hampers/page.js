import Link from "next/link";
import Image from "next/image";
import { hampers } from "./data";

export default function HampersPage() {
  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        🎁 Hampers Ramadhan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {hampers.map((h) => (
          <Link key={h.slug} href={`/ramadhan/hampers/${h.slug}`}>
            <div className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-md transition">
              <Image
                src={h.image}
                alt={h.name}
                width={500}
                height={500}
                className="rounded-2xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {h.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {h.description}
              </p>
              <p className="text-xs text-red-500 mt-3">
                Kuota terbatas ({h.quota} box)
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}