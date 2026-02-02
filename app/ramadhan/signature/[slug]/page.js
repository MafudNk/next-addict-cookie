import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { signatures } from "../data";
import { signatureCollection } from "../data";


// export default function SignatureDetail({ params }) {
//   const item = signatures.find((s) => s.slug === params.slug);

//   if (!item) return notFound();

//   return (
//     <main className="bg-orange-50 px-4 md:px-20 py-12">
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

//         {/* IMAGE */}
//         <div className="bg-white rounded-3xl p-4 shadow-sm">
//           <Image
//             src={item.image}
//             alt={item.name}
//             width={600}
//             height={600}
//             className="rounded-2xl"
//             priority
//           />
//         </div>

//         {/* INFO */}
//         <div className="space-y-6">
//           <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
//             🌙 Ramadhan Signature · Limited
//           </span>

//           <h1 className="text-3xl font-bold text-gray-900">
//             {item.name}
//           </h1>

//           <p className="text-gray-700">
//             {item.description}
//           </p>

//           <div className="bg-orange-100 rounded-2xl p-4 text-sm space-y-1">
//             <p><b>Pre-Order:</b> {item.preorder}</p>
//             <p><b>Kuota:</b> {item.quota} {item.weight}</p>
//             <p>🚚 Ready sebelum Lebaran</p>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Link
//               href="/order"
//               className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600"
//             >
//               Pesan Sekarang
//             </Link>
//             <Link
//               href="/ramadhan"
//               className="border border-orange-300 px-6 py-3 rounded-full text-orange-600 font-medium"
//             >
//               Kembali
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

export default function SignatureDetailPage() {
  const { title, subtitle, note, items } = signatureCollection;

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 italic">
          {subtitle}
        </p>
      </div>

      {/* GRID PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-3xl shadow-sm p-4 text-center"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className="rounded-2xl mx-auto mb-4"
            />

            <h3 className="font-semibold text-lg text-gray-900">
              {item.name}
            </h3>

            <p className="mt-2 text-xl font-bold text-gray-800">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>

      {/* NOTE */}
      <p className="text-center text-sm text-gray-600 mt-10">
        Note: {note}
      </p>
    </main>
  );
}