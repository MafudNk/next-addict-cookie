import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Addict Bite Cookie | Soft Cookies & Hampers Lebaran",
  description:
    "Soft cookies handmade, hampers Ramadhan & Lebaran edisi terbatas dari Addict Bite Cookie. Pre-order dengan kuota terbatas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} antialiased bg-orange-50 text-gray-900`}
      >
        <AnnouncementBar />
        <Navbar />

        <main>{children}</main>

        <footer className="bg-amber-900 text-white py-6 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            <p>© 2025 Addict Bite Cookie. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}