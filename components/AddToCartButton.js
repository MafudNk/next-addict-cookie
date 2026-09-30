'use client';

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ product }) {
  const router = useRouter();
  const cart = useCart();

  if (product.status !== "available" || product.price == null) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-600 px-6 py-3 rounded-full font-semibold cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        cart.add(product.id);
        router.push("/order");
      }}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold"
    >
      Pesan Sekarang
    </button>
  );
}
