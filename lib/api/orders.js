import { API_URL } from "./client";

/**
 * Dipanggil dari browser. Kontrak: docs/api-contract.md §2.
 * @param {{items:{productId:string,qty:number}[], customer:{name:string,phone:string,address:string}, shipping:"pickup"|"gosend"|"paxel", payment:"qris"|"cash", note?:string}} payload
 * @returns {Promise<{orderCode:string,total:number,waUrl:string}>}
 */
export async function createOrder(payload) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Tidak bisa terhubung ke server. Periksa koneksi lalu coba lagi.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) throw new Error(data?.message || "Gagal mengirim pesanan");
  return data;
}
