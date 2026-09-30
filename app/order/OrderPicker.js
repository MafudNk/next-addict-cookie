'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatRupiah } from "@/lib/format";

export default function OrderPicker({ products }) {
  const router = useRouter();
  const cart = useCart();
  const selectedCount = products.filter((p) => cart.qtyOf(p.id) > 0).length;

  const handleLanjut = () => {
    if (selectedCount === 0) {
      alert("Pilih setidaknya satu produk sebelum lanjut.");
      return;
    }
    router.push("/summary");
  };

  return (
    <>
      {products.map((p) => {
        const qty = cart.qtyOf(p.id);
        return (
          <div
            key={p.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3 border-b border-orange-100"
          >
            <div className="flex items-center gap-3">
              <Image src={p.thumbnail} alt={p.name} width={64} height={64} className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold text-gray-900">{p.name}</div>
                <div className="text-sm text-gray-700">{formatRupiah(p.price)}</div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-1">
              <div className="flex items-center gap-1 bg-white rounded px-1 py-1">
                <button
                  onClick={() => cart.add(p.id, -1)}
                  aria-label={`Kurangi ${p.name}`}
                  className="bg-orange-500 text-white w-7 h-7 rounded"
                >
                  –
                </button>
                <span className="w-6 text-center font-medium text-gray-900">{qty}</span>
                <button
                  onClick={() => cart.add(p.id, 1)}
                  aria-label={`Tambah ${p.name}`}
                  className="bg-orange-500 text-white w-7 h-7 rounded"
                >
                  +
                </button>
              </div>
              <div className="text-sm font-medium text-gray-400 md:mt-1 ml-2">
                {formatRupiah(p.price * qty)}
              </div>
            </div>
          </div>
        );
      })}

      <button
        className="mt-6 bg-orange-500 text-white w-full py-3 rounded-lg font-semibold"
        onClick={handleLanjut}
      >
        Lanjut
      </button>
    </>
  );
}
