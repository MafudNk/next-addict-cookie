// Kontrak order antara FE dan BE. Dokumentasi lengkap: docs/api-contract.md

export const SHIPPING = ["pickup", "gosend", "paxel"];
export const PAYMENT = ["qris", "cash"];
export const PHONE_PATTERN = /^(\+62|62|0)8[0-9]{8,12}$/;

/**
 * @typedef {Object} CreateOrderRequest
 * @property {{productId: string, qty: number}[]} items
 * @property {{name: string, phone: string, address: string}} customer
 * @property {"pickup"|"gosend"|"paxel"} shipping
 * @property {"qris"|"cash"} payment
 * @property {string} [note]
 *
 * @typedef {Object} CreateOrderResponse
 * @property {string} orderCode
 * @property {number} total
 * @property {string} waUrl
 */

/** @returns {{ok: true, value: CreateOrderRequest} | {ok: false, error: string}} */
export function validateCreateOrder(body) {
  if (!body || typeof body !== "object") return { ok: false, error: "Body tidak valid" };
  const { items, customer, shipping, payment, note } = body;

  if (!Array.isArray(items) || items.length === 0 || items.length > 50)
    return { ok: false, error: "Keranjang kosong" };
  for (const it of items) {
    if (typeof it?.productId !== "string" || !Number.isInteger(it.qty) || it.qty < 1 || it.qty > 999)
      return { ok: false, error: "Item pesanan tidak valid" };
  }
  const name = customer?.name?.trim();
  const phone = customer?.phone?.replace(/[\s-]/g, "");
  const address = customer?.address?.trim();
  if (!name || name.length > 100) return { ok: false, error: "Nama wajib diisi" };
  if (!phone || !PHONE_PATTERN.test(phone)) return { ok: false, error: "Nomor WhatsApp tidak valid" };
  if (!address || address.length > 500) return { ok: false, error: "Alamat wajib diisi" };
  if (!SHIPPING.includes(shipping)) return { ok: false, error: "Pengiriman tidak valid" };
  if (!PAYMENT.includes(payment)) return { ok: false, error: "Pembayaran tidak valid" };

  return {
    ok: true,
    value: {
      items,
      customer: { name, phone, address },
      shipping,
      payment,
      note: typeof note === "string" ? note.trim().slice(0, 500) : "",
    },
  };
}
