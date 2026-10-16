import { getCurrentCampaign, getProducts } from "@/lib/api/products";

const fmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtDay = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtShort = new Intl.DateTimeFormat("id-ID", { day: "numeric", timeZone: "UTC" });

const humanize = (slug) => slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

// Daftar isi koleksi dibentuk dari data produk campaign (bukan diketik ulang).
// Produk sekoleksi digabung jadi satu baris: "Signature Cookies — 9 varian (kuota 50 per varian)".
function collectionLines(products) {
  const groups = new Map();
  for (const p of products) {
    const key = p.collection ?? `p:${p.id}`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  // Koleksi kecil (≤ 3 item) ditampilkan per produk; koleksi besar diringkas jadi satu baris.
  const flat = [...groups.entries()].flatMap(([key, items]) =>
    items.length <= 3 ? items.map((p) => [`p:${p.id}`, [p]]) : [[key, items]]
  );
  return flat.map(([key, items]) => {
    const quotas = [...new Set(items.map((i) => i.quota))];
    const quotaText = quotas.length === 1 && quotas[0] != null ? `kuota ${quotas[0]}${items.length > 1 ? " per varian" : ""}` : "";
    if (items.length === 1) {
      const p = items[0];
      const left = p.remaining != null && p.remaining < p.quota ? `, sisa ${p.remaining}` : "";
      return { key, name: p.name, detail: quotaText ? `${quotaText}${left}` : "" };
    }
    return { key, name: `${humanize(key)} — ${items.length} varian`, detail: quotaText };
  });
}

export default async function Notice() {
  const campaign = await getCurrentCampaign();
  if (!campaign) return null;
  const { highlights, notes } = campaign.content;
  const products = (await getProducts()).filter((p) => p.campaignId === campaign.id);
  const lines = collectionLines(products);

  return (
    <section className="px-4 md:px-20 py-10">
      <div className="max-w-5xl mx-auto bg-white border border-orange-100 rounded-3xl shadow-sm p-6 md:p-8 space-y-8">
        {highlights.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {highlights.map((text) => (
                <div key={text}>
                  <p className="text-2xl mb-2">✨</p>
                  <p className="text-sm text-gray-700">{text}</p>
                </div>
              ))}
            </div>
            <hr className="border-dashed border-orange-100" />
          </>
        )}

        {lines.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">📦 {campaign.name}</h2>
            <ul className="text-sm md:text-base text-gray-700 space-y-1 list-disc pl-5">
              {lines.map((l) => (
                <li key={l.key}>
                  {l.name} {l.detail && <span className="text-red-500">({l.detail})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-orange-50 rounded-2xl p-4 space-y-2">
          <p className="font-semibold text-orange-700 flex items-center gap-2">❗ Note & Mohon Dibaca</p>
          <ul className="text-sm md:text-base text-gray-700 space-y-1 list-disc pl-5">
            <li>
              <b>Pre-Order:</b> {fmtShort.format(new Date(campaign.preorderStart))}–{fmt.format(new Date(campaign.preorderEnd))} atau sampai kuota terpenuhi
            </li>
            {campaign.delivery.map((d) => (
              <li key={d.region}>
                <b>{d.region}:</b> {fmtDay.format(new Date(d.date))}
              </li>
            ))}
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li className="text-xs text-gray-500">*Jadwal dapat berubah sewaktu-waktu</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
