'use client';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { signatureCookies } from "../data";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function SignatureCookieDetail({ params }) {

  const router = useRouter();
  const { slug } = use(params); // ✅ UNWRAP PROMISE

  const item = signatureCookies.items.find(
    (c) => c.slug === slug
  );

  if (!item) return null;

  const handleOrder = (product) => {
    const saved = JSON.parse(
      localStorage.getItem("orderData") || "[]"
    );

    const exist = saved.find(
      (i) => i.id === item.id
    );

    const updated = exist
      ? saved.map((i) =>
        i.id === 'sig-' + item.id
          ? { ...i, qty: i.qty + 1 }
          : i
      )
      : [...saved, { ...item, qty: 1 }];

    localStorage.setItem(
      "orderData",
      JSON.stringify(updated)
    );
  };

  if (!item) return notFound();

  return (
    <main className="bg-orange-50 px-4 md:px-20 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={500}
          className="rounded-3xl"
        />

        <div className="space-y-6">
          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            🌙 Ramadhan Signature
          </span>

          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-gray-700">{item.description}</p>

          <p className="text-2xl font-bold">
            Rp {item.price.toLocaleString("id-ID")}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                handleOrder(item);
                router.push("/order");
              }}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Pesan Sekarang
            </button>

            <Link
              href="/ramadhan/signature/signature-cookies"
              className="border px-6 py-3 rounded-full"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}