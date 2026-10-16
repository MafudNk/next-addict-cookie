# API Contract FE ⇄ BE

> **Sumber kebenaran: repo BE** (`backend-next-cookie/docs/api-contract.md`). Repo FE menyimpan salinannya;
> ubah di BE lalu salin ke FE.

Kontrak antara FE (`next-cookie`) dan backend (Next.js + Supabase). Implementasinya:

- BE: `lib/mappers.js` (bentuk `Product`/`Campaign`), `lib/contracts.js` (validasi order),
  `supabase/migrations/` (aturan bisnis di `create_order`)
- FE: `lib/api/*.js` – satu-satunya tempat FE memanggil data

Semua response JSON. Uang = **integer rupiah** (tanpa desimal). Tanggal = ISO 8601.

## 1. Katalog (publik, read-only)

### `GET /api/products?category=&collection=&orderable=`
`orderable=true` → hanya produk dengan `orderable: true` (lihat definisi di bawah).
Response: `{ "data": Product[] }` (urut `sortOrder`).

### `GET /api/products/:slug`
Response: `{ "data": Product }` atau `404`.

### `GET /api/campaigns/:id`
Response: `{ "data": Campaign }` atau `404`.

### `GET /api/campaigns/current`
Campaign yang sedang tampil di situs, supaya FE tidak menulis id campaign di kode.
Prioritas: campaign yang `isOpen` (bila lebih dari satu, PO mulai paling baru); bila tidak ada,
campaign yang PO-nya paling baru berakhir. `404` bila belum ada campaign sama sekali.
Untuk campaign milik sebuah produk, tetap pakai `GET /api/campaigns/:id` dengan `Product.campaignId`.

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
  quota: number | null;       // total kuota; null = tanpa batas
  remaining: number | null;   // sisa kuota (quota − terjual, min 0); null = tanpa batas
  orderable: boolean;         // lihat di bawah
  sortOrder: number;
};

type Campaign = {
  id: string; name: string;
  preorderStart: string; preorderEnd: string;
  delivery: { region: string; date: string }[];
  status: "open" | "closed";
  isOpen: boolean;   // status "open" DAN hari ini (WIB) dalam preorderStart–preorderEnd
  content: {         // teks/gambar editable dari admin; "" / [] = FE pakai teks default
    headline: string;            // judul besar teaser
    summary: string;             // deskripsi singkat
    ctaLabel: string;            // label tombol, mis. "Lihat Koleksi Spesial"
    chips: string[];             // maks 6
    teaserImage: string | null;  // URL gambar (Supabase Storage)
    announcementOpen: string;    // pengumuman saat PO buka
    announcementClosed: string;  // pengumuman saat PO tutup
    highlights: string[];        // poin keunggulan di Notice
    notes: string[];             // catatan "Mohon Dibaca"
  };
};
```

**`Product.orderable`** dihitung server dan adalah satu-satunya yang perlu dicek FE untuk
menampilkan tombol pesan. Nilainya `true` bila **semua** benar: `status = "available"`,
`price != null`, `remaining !== 0`, dan (tanpa campaign **atau** `campaign.isOpen`).
Penentu akhir tetap `POST /api/order`; `orderable` dapat basi sampai cache FE disegarkan.

Untuk memilih label tombol saat `orderable = false`:
`status = "sold_out"` atau `remaining = 0` → "Habis"; `price = null` → "Segera hadir";
selain itu (campaign ditutup) → "Pre-order ditutup".

FE mengambil katalog di server component dengan
`fetch(url, { next: { tags: ["products"] } })`. Saat admin mengubah produk, BE
memanggil `POST {FE_URL}/api/revalidate` (secret header) → `revalidateTag("products")`.
Endpoint itu sudah ada di FE (`app/api/revalidate/route.js`).

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
8. Tolak produk yang `campaignId`-nya ditutup (`isOpen = false`) → `400` "Pre-order untuk … sudah ditutup".
9. **Rate limit:** maks 3 pesanan `pending` per nomor HP dalam 1 jam (9 digit terakhir dibandingkan,
   jadi `0812…` dan `+62812…` dianggap sama) → `400`. Pesanan yang dibatalkan tidak dihitung.

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

## 4. Skema Supabase

Diimplementasikan di `supabase/migrations/`. Penyederhanaan dari rancangan awal:
`quota` dan `sold` disimpan langsung di `products` (bukan tabel `product_quotas`),
karena satu produk hanya ada di satu campaign. `Product.id` adalah UUID.

Kolom `products` yang bisa dibaca anon dibatasi lewat `GRANT SELECT` per kolom
(migrasi `20261016000001`); `select *` oleh anon ditolak. Kolom baru yang memang publik
harus ditambahkan ke GRANT itu **dan** ke `PUBLIC_PRODUCT_COLUMNS` di `lib/mappers.js`.

Rancangan awal (untuk referensi):

- `products`, `campaigns`
- `orders(id, order_code unique, status, customer_name, phone, address, shipping, payment, note, total, created_at)`
- `order_items(order_id, product_id, name_snapshot, price_snapshot, qty)`
- RPC `create_order(payload jsonb)` menjalankan aturan 1–7 di atas dalam satu transaksi.
- RLS: `anon` hanya `SELECT` products/campaigns aktif; `orders`/`order_items` tanpa akses anon,
  semua tulis lewat service role di BE.

## 5. Status integrasi

FE sudah tersambung ke BE. Lihat [frontend-guideline.md](frontend-guideline.md) untuk aturan tampilan.
