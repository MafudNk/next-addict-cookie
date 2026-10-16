// Gambar hasil upload admin ada di Supabase Storage; next/image menolak (400) host yang tidak terdaftar.
// Host project Supabase tidak rahasia (muncul di setiap URL gambar). Env bisa menimpanya bila project berganti;
// default dipasang agar produksi tidak bergantung pada env yang mudah terlewat di Vercel.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_HOST || "mzordvrgxgdqexkbauff.supabase.co";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }],
  },
  // URL lama /ramadhan/* (tertulis tetap untuk satu campaign) → route netral. Urutan: spesifik dulu.
  async redirects() {
    return [
      { source: "/ramadhan", destination: "/promo", permanent: true },
      { source: "/ramadhan/hampers", destination: "/promo/hampers", permanent: true },
      { source: "/ramadhan/hampers/:slug", destination: "/produk/:slug", permanent: true },
      { source: "/ramadhan/signature", destination: "/promo/signature", permanent: true },
      { source: "/ramadhan/signature/signature-cookies", destination: "/promo/signature", permanent: true },
      { source: "/ramadhan/signature/signature-cookies/:slug", destination: "/produk/:slug", permanent: true },
      { source: "/ramadhan/signature/:slug", destination: "/produk/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
