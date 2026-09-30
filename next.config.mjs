// Gambar hasil upload admin ada di Supabase Storage; izinkan domain project-nya.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_HOST; // mis. abcd1234.supabase.co

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
};

export default nextConfig;
