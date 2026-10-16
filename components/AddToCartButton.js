'use client';

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { availability } from "@/lib/availability";

export default function AddToCartButton({ product }) {
  const router = useRouter();
  const cart = useCart();
  const { orderable, label } = availability(product);

  if (!orderable) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-600 px-6 py-3 rounded-full font-semibold cursor-not-allowed"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        // tidak melebihi sisa kuota; server tetap memvalidasi saat order
        if (product.remaining == null || cart.qtyOf(product.id) < product.remaining) cart.add(product.id);
        router.push("/order");
      }}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold"
    >
      Pesan Sekarang
    </button>
  );
}
