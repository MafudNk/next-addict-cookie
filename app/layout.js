import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { CartProvider } from "@/components/CartProvider";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const description =
  "Soft cookies handmade, hampers Ramadhan & Lebaran edisi terbatas dari Addict Bite Cookie. Pre-order dengan kuota terbatas.";

export const metadata = {
  ...(SITE_URL && { metadataBase: new URL(SITE_URL) }),
  title: {
    default: `${SITE_NAME} | Soft Cookies & Hampers Lebaran`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description,
    locale: "id_ID",
    type: "website",
    images: ["/images/nav/JN1A3942.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} antialiased bg-orange-50 text-gray-900`}>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />

          <main>{children}</main>

          <footer className="bg-amber-900 text-white py-6 mt-16">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm">
              <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
