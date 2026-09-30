import Link from "next/link";
import ProductImage from "@/components/ProductImage";

export const metadata = { title: "Ramadhan Signature" };

const CARDS = [
  {
    href: "/ramadhan/signature/signature-cookies",
    image: "/images/signature_cookie.webp",
    title: "Signature Cookies",
    desc: "Aneka kue kering khas Lebaran",
  },
  {
    href: "/ramadhan/signature/nastar-gold-butter",
    image: "/images/signature/nastargold.webp",
    title: "Nastar Gold Butter",
    desc: "Butter premium, isian nanas lembut",
  },
  {
    href: "/ramadhan/signature/luxe-chocolate-bite",
    image: "/images/signature/luxe.webp",
    title: "Luxe Chocolate Bite",
    desc: "Chocolate cookies premium",
  },
];

export default function SignatureIndex() {
  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">🌙 Ramadhan Signature</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href}>
            <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
              <ProductImage
                src={c.image}
                alt={c.title}
                width={500}
                height={500}
                className="w-full h-56 md:h-64 object-cover"
              />
              <div className="bg-white p-4 text-center">
                <h3 className="font-semibold text-lg mb-1 text-gray-900">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
