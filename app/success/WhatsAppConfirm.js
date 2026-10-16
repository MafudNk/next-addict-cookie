'use client';

import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/format";

// Cadangan bila tab WhatsApp otomatis tidak terbuka (popup diblokir).
export default function WhatsAppConfirm() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      setOrder(JSON.parse(sessionStorage.getItem("lastOrder")));
    } catch {}
  }, []);

  if (!order?.waUrl) return null;
  return (
    <div className="mb-6 space-y-3">
      <p className="text-sm text-gray-600">
        Order ID: <b className="text-gray-900">{order.orderCode}</b>
      </p>
      {order.total != null && (
        <p className="text-sm text-gray-600">
          Total: <b className="text-gray-900">{formatRupiah(order.total)}</b>
        </p>
      )}
      <a
        href={order.waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        Konfirmasi via WhatsApp
      </a>
    </div>
  );
}
