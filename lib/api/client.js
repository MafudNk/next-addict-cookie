// Fetch ke backend (repo backend-next-cookie). Kontrak: docs/api-contract.md
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

/**
 * GET JSON dari BE untuk server component. Cache dibuang lewat tag
 * (POST /api/revalidate dari BE) atau otomatis tiap 60 detik.
 * Mengembalikan null bila 404.
 */
export async function apiGet(path, { tags = [], revalidate = 60 } = {}) {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL belum diatur (lihat .env.example)");
  const res = await fetch(`${API_URL}${path}`, { next: { tags, revalidate } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} gagal (${res.status})`);
  return (await res.json()).data;
}
