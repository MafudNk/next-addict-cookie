import Link from "next/link";
import WhatsAppConfirm from "./WhatsAppConfirm";

export const metadata = { title: "Pesanan Diterima" };

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 shadow-lg rounded-xl text-center max-w-md w-full border">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">🎉 Terima Kasih!</h1>
        <p className="text-gray-700 mb-6">
          Pesanan kamu sudah diterima. Tim kami akan segera menghubungi kamu untuk konfirmasi selanjutnya.
        </p>

        <WhatsAppConfirm />

        <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
