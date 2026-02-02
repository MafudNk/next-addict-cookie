import Link from "next/link";
import Image from "next/image";

export default function SignatureIndex() {
  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">
        🌙 Ramadhan Signature
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Signature Cookies */}
        <Link href="/ramadhan/signature/signature-cookies">
          <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
            <Image
              src="/images/signature_cookie.webp"
              alt="Signature Cookies Ramadhan"
              width={500}
              height={500}
              className="w-full h-56 md:h-64 object-cover"
            />
            <div className="bg-white p-4 text-center">
              <h3 className="font-semibold text-lg mb-1">Signature Cookies</h3>
              <p className="text-sm text-gray-600">Aneka kue kering khas Lebaran</p>
            </div>
          </div>
        </Link>
        <Link href="/ramadhan/signature/nastar-gold-butter">
          <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
            <Image
              src="/images/signature/nastar-cover.webp"
              alt="Nastar Gold Butter"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="bg-white p-4 text-center">
              <h3 className="font-semibold text-lg mb-1">Nastar Gold Butter</h3>
              <p className="text-sm text-gray-600">Butter premium, isian nanas lembut</p>
            </div>
          </div>
        </Link>

        {/* Luxe Chocolate Bite */}
        <Link href="/ramadhan/signature/luxe-chocolate-bite">
          <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
            <Image
              src="/images/signature/luxe-cover.webp"
              alt="Luxe Chocolate Bite"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="bg-white p-4 text-center">
              <h3 className="font-semibold text-lg mb-1">Luxe Chocolate Bite</h3>
              <p className="text-sm text-gray-600">Chocolate cookies premium</p>
            </div>
          </div>
        </Link>

      </div>
    </main>
  );
}