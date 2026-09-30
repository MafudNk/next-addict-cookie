'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { createOrder } from "@/lib/api/orders";
import { formatRupiah } from "@/lib/format";

const input = "w-full border rounded px-3 py-2 text-gray-900";
const label = "block text-sm font-medium text-gray-900";

export default function SummaryForm({ products }) {
  const router = useRouter();
  const cart = useCart();
  const [loading, setLoading] = useState(false);

  const lines = cart.items
    .map((i) => ({ product: products.find((p) => p.id === i.productId), qty: i.qty }))
    .filter((l) => l.product);
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || lines.length === 0) return;
    const form = new FormData(e.currentTarget);

    // Buka tab WhatsApp SEKARANG (masih di dalam klik user) supaya tidak
    // diblokir popup blocker; URL-nya diisi setelah order berhasil.
    const waWindow = window.open("", "_blank");

    setLoading(true);
    try {
      const result = await createOrder({
        items: lines.map((l) => ({ productId: l.product.id, qty: l.qty })),
        customer: {
          name: form.get("nama"),
          phone: form.get("phone"),
          address: form.get("alamat"),
        },
        shipping: form.get("pengiriman"),
        payment: form.get("pembayaran"),
        note: form.get("pesan"),
      });

      try {
        sessionStorage.setItem(
          "lastOrder",
          JSON.stringify({ orderCode: result.orderCode, waUrl: result.waUrl })
        );
      } catch {}
      if (waWindow) waWindow.location.href = result.waUrl;
      cart.clear();
      router.push("/success");
    } catch (error) {
      waWindow?.close();
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Ringkasan Pesanan</h1>

      <ul className="bg-white shadow rounded p-4 space-y-2">
        {cart.ready && lines.length === 0 && (
          <li className="text-gray-700">Keranjang masih kosong.</li>
        )}
        {lines.map(({ product, qty }) => (
          <li key={product.id} className="flex justify-between items-center border-b pb-1">
            <div>
              <p className="text-gray-900">{product.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => cart.add(product.id, -1)}
                  aria-label={`Kurangi ${product.name}`}
                  className="bg-gray-200 px-2 rounded text-gray-900"
                >
                  -
                </button>
                <span className="text-gray-900">{qty}</span>
                <button
                  type="button"
                  onClick={() => cart.add(product.id, 1)}
                  aria-label={`Tambah ${product.name}`}
                  className="bg-gray-200 px-2 rounded text-gray-900"
                >
                  +
                </button>
              </div>
            </div>
            <span className="text-sm text-gray-900">{formatRupiah(product.price * qty)}</span>
          </li>
        ))}
        <li className="flex justify-between font-semibold text-gray-900 pt-2">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </li>
        <button
          type="button"
          onClick={() => router.push("/order")}
          className="w-full py-2 bg-gray-300 text-gray-800 rounded"
        >
          ← Tambah Pesanan
        </button>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded">
        <div>
          <label htmlFor="nama" className={label}>Nama</label>
          <input id="nama" name="nama" type="text" autoComplete="name" className={input} required maxLength={100} />
        </div>

        <div>
          <label htmlFor="phone" className={label}>Nomor WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08xxxxxxxxxx"
            pattern="(\+62|62|0)8[0-9\s\-]{8,16}"
            title="Contoh: 081234567890"
            className={input}
            required
          />
        </div>

        <div>
          <label htmlFor="alamat" className={label}>Alamat</label>
          <textarea id="alamat" name="alamat" autoComplete="street-address" className={input} required maxLength={500} />
        </div>

        <div>
          <label htmlFor="pembayaran" className={label}>Pembayaran</label>
          <select id="pembayaran" name="pembayaran" className={input} defaultValue="" required>
            <option value="" disabled>Pilih</option>
            <option value="qris">Qris</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div>
          <label htmlFor="pengiriman" className={label}>Pengiriman</label>
          <select id="pengiriman" name="pengiriman" className={input} defaultValue="" required>
            <option value="" disabled>Pilih</option>
            <option value="pickup">Ambil di tempat</option>
            <option value="gosend">GoSend</option>
            <option value="paxel">Paxel</option>
          </select>
        </div>

        <div>
          <label htmlFor="pesan" className={label}>Pesan Tambahan (opsional)</label>
          <textarea id="pesan" name="pesan" className={input} maxLength={500} />
        </div>

        <button
          type="submit"
          disabled={loading || lines.length === 0}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading || lines.length === 0 ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Mengirim Pesanan..." : "Pesan"}
        </button>
      </form>
    </div>
  );
}
