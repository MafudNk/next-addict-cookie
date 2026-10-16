// Aturan tampilan ketersediaan (docs/frontend-guideline.md §5). Penentu "boleh dipesan"
// adalah product.orderable dari BE; fungsi ini hanya memilih label alasannya.
const LOW_STOCK = 5;

/** @param {import("./api/products").Product} p */
export function availability(p) {
  if (p.orderable) {
    const low = p.remaining != null && p.remaining <= LOW_STOCK;
    return { orderable: true, label: null, badge: low ? `Sisa ${p.remaining}` : null, tone: low ? "warn" : null };
  }
  if (p.status === "sold_out" || p.remaining === 0) return { orderable: false, label: "Habis", badge: "Habis", tone: "muted" };
  if (p.price == null) return { orderable: false, label: "Segera hadir", badge: "Segera hadir", tone: "info" };
  return { orderable: false, label: "Pre-order ditutup", badge: "Pre-order ditutup", tone: "muted" };
}
