# API Contract FE ⇄ BE

Kontrak ini dikunci dari sisi FE. Backend (Next.js + Supabase, repo terpisah)
mengimplementasikannya apa adanya. Sumber kebenaran di kode FE:

- `lib/catalog.js` – bentuk `Product` & `Campaign`
- `lib/contracts.js` – validasi `CreateOrderRequest`
- `lib/api/*.js` – satu-satunya tempat FE memanggil data

Semua response JSON. Uang = **integer rupiah** (tanpa desimal). Tanggal = ISO 8601.

## 1. Katalog (publik, read-only)

### `GET /api/products?category=&collection=&orderable=`
`orderable=true` → hanya `status=available` dan `price != null`.
Response: `{ "data": Product[] }` (urut `sortOrder`).

### `GET /api/products/:slug`
Response: `{ "data": Product }` atau `404`.

### `GET /api/campaigns/:id`
Response: `{ "data": Campaign }` atau `404`.

```ts
type Product = {
  id: string;                 // uuid di DB; FE memperlakukannya string opaque
  slug: string;               // unik
  name: string;
  category: "soft" | "signature" | "hampers";
  price: number | null;       // null = belum ada harga
  thumbnail: string;          // URL (Supabase Storage)
  images: string[];
  description: string;
  ingredients: string[];
  bundle: string[];           // isi paket, khusus hampers
  status: "available" | "sold_out";
  campaignId: string | null;
  collection: string | null;  // "signature-cookies" | "premium" | null
  quota: number | null;
  sortOrder: number;
};

type Campaign = {
  id: string; name: string;
  preorderStart: string; preorderEnd: string;
  delivery: { region: string; date: string }[];
  status: "open" | "closed";
};
```

FE mengambil katalog di server component dengan
`fetch(url, { next: { tags: ["products"] } })`. Saat admin mengubah produk, BE
memanggil `POST {FE_URL}/api/revalidate` (secret header) → `revalidateTag("products")`.
Endpoint itu sudah ada di FE: `app/api/revalidate/route.js` (secret di header `x-revalidate-secret`, tag `products` / `campaigns`).

## 2. Buat order

### `POST /api/order`

```ts
type CreateOrderRequest = {
  items: { productId: string; qty: number }[];   // 1–50 item, qty integer 1–999
  customer: { name: string; phone: string; address: string };
  shipping: "pickup" | "gosend" | "paxel";
  payment: "qris" | "cash";
  note?: string;                                  // maks 500 char
};
```

Aturan yang WAJIB ditegakkan server (FE hanya membantu UX):

1. **Harga tidak pernah datang dari client.** Server menghitung dari `products`.
2. Tolak produk `sold_out`, `price = null`, atau id tidak dikenal → `400`.
3. `phone` cocok `^(\+62|62|0)8[0-9]{8,12}$` setelah spasi/`-` dibuang.
4. Cek + kurangi kuota dalam **satu transaksi** (row lock) agar tidak oversell.
5. `orderCode` format `O-YYYYMM-NNN` dari sequence DB (bukan max+1) agar tidak bentrok.
6. Simpan `name`/`price` per item sebagai snapshot di `order_items`.
7. Status awal selalu `pending`.

Sukses `201`:
```ts
type CreateOrderResponse = {
  success: true;
  orderCode: string;
  total: number;
  waUrl: string;     // link wa.me + teks konfirmasi, dibuka FE
};
```

Gagal: `{ "success": false, "message": string }` dengan `400` (validasi /
stok / kuota) atau `500`. `message` ditampilkan langsung ke pelanggan, jadi
berbahasa Indonesia dan tanpa detail internal.

CORS: BE mengizinkan origin FE untuk `POST /api/order` dan `GET` katalog.

## 3. Di luar kontrak ini (murni repo BE)

Dashboard admin, auth admin (Supabase Auth), update status order
(`pending → paid → dikirim → done | cancelled`), manajemen produk/kuota/campaign.
FE tidak memanggil satupun dari ini.

## 4. Skema Supabase yang disarankan

- `products`, `campaigns`, `product_quotas(product_id, campaign_id, quota, sold)`
- `orders(id, order_code unique, status, customer_name, phone, address, shipping, payment, note, total, created_at)`
- `order_items(order_id, product_id, name_snapshot, price_snapshot, qty)`
- RPC `create_order(payload jsonb)` menjalankan aturan 1–7 di atas dalam satu transaksi.
- RLS: `anon` hanya `SELECT` products/campaigns aktif; `orders`/`order_items` tanpa akses anon,
  semua tulis lewat service role di BE.

## 5. Status integrasi

FE sudah tersambung ke BE (`feat/connect-backend`):

- `lib/api/products.js` mengambil katalog dari BE (`NEXT_PUBLIC_API_URL`), cache 60 detik + tag.
- `lib/api/orders.js` memanggil `POST {API_URL}/api/order` langsung dari browser (CORS diatur BE lewat `FRONTEND_ORIGINS`).
- `lib/catalog.js`, `app/api/order/route.js` (Google Sheet) dan dependensi `googleapis` sudah dihapus.
- Keranjang memakai key `cart:v2` karena id produk sekarang UUID.
