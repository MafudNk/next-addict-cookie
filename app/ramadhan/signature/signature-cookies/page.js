import Image from "next/image";
import Link from "next/link";
import { signatureCookies } from "./data";

export default function SignatureCookiesPage() {
  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        {signatureCookies.title}
      </h1>

      <p className="text-center text-gray-600 mb-10">
        {signatureCookies.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {signatureCookies.items.map((item) => (
          <Link
            key={item.slug}
            href={`/ramadhan/signature/signature-cookies/${item.slug}`}
          >
            <div className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-md transition">
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-2xl mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg text-center">
                {item.name}
              </h3>
              <p className="text-center font-bold mt-2">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-10">
        Note: {signatureCookies.note}
      </p>
    </main>
  );
}