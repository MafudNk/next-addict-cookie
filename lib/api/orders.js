// Dipanggil dari browser. NEXT_PUBLIC_API_URL kosong = route handler lokal
// (/api/order); nanti isi dengan URL repo backend.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/** @param {import("../contracts").CreateOrderRequest} payload
 *  @returns {Promise<import("../contracts").CreateOrderResponse>} */
export async function createOrder(payload) {
  const res = await fetch(`${API_URL}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Gagal mengirim pesanan");
  }
  return data;
}
