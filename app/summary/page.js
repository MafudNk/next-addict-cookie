'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SummaryPage() {
  const [order, setOrder] = useState([])
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [pengiriman, setPengiriman] = useState('')
  const [pembayaran, setPembayaran] = useState('')
  const [pesan, setPesan] = useState('')
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('orderData')
    if (data) {
      setOrder(JSON.parse(data))
    }
  }, [])

  const total = order.reduce((acc, item) => acc + item.price * item.qty, 0)
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const finalData = {
      order,
      nama,
      alamat,
      pengiriman,
      pembayaran,
      pesan,
      total,
    }
    console.log("FINAL DATA:", finalData);  // ✔️ Aman terbaca
    if (loading) return; // anti double click

    setLoading(true);

    try {

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      // 1️⃣ cek HTTP status DULU
      if (!res.ok) {
        throw new Error("Gagal mengirim pesanan");
      }

      // 2️⃣ baru parse response
      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!data.success) {
        throw new Error("Server gagal memproses order");
      }

      // 3️⃣ BARU cleanup & redirect
      localStorage.removeItem("orderData");

      // (opsional) WhatsApp admin di sini
      // window.open(...)
      const waText = `
📦 ORDER BARU
🆔 Order ID: ${data.orderId}

👤 Nama: ${nama}
📍 Alamat: ${alamat}
💳 Pembayaran: ${pembayaran}
🚚 Pengiriman: ${pengiriman}

🛒 Total: Rp ${total.toLocaleString()}
`;

      window.open(
        `https://wa.me/6281617997119?text=${encodeURIComponent(waText)}`,
        "_blank"
      );

      router.push("/success");
    } catch (error) {
      console.error("❌ Error saat mengirim pesanan:", error);
      alert("Gagal mengirim pesanan: " + error.message);
    } finally {
      setLoading(false);
    }
  }


  const handlePlus = (index) => {
    const newOrder = [...order]
    newOrder[index].qty += 1
    setOrder(newOrder)
    localStorage.setItem('orderData', JSON.stringify(newOrder))
  }

  const handleMinus = (index) => {
    const newOrder = [...order]
    if (newOrder[index].qty > 1) {
      newOrder[index].qty -= 1
      setOrder(newOrder)
      localStorage.setItem('orderData', JSON.stringify(newOrder))
    } else {
      // Kalau qty = 1 lalu dikurangi, hapus dari daftar
      newOrder.splice(index, 1)
      setOrder(newOrder)
      localStorage.setItem('orderData', JSON.stringify(newOrder))
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Ringkasan Pesanan</h1>

      <ul className="bg-white shadow rounded p-4 space-y-2">
        {order.map((item, index) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-1">
            <div>
              <p className='text-gray-900'>{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => handleMinus(index)}
                  className="bg-gray-200 px-2 rounded text-gray-900"
                >-</button>
                <span className='text-gray-900'>{item.qty}</span>
                <button
                  onClick={() => handlePlus(index)}
                  className="bg-gray-200 px-2 rounded text-gray-900"
                >+</button>
              </div>
            </div>
            <span className="text-sm text-gray-900">Rp {(item.price * item.qty).toLocaleString()}</span>
          </li>
        ))}



        <button
          onClick={() => router.push('/order')}
          className="flex-1 py-2 bg-gray-300 text-gray-800 rounded"
        >
          ← Tambah Pesanan
        </button>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded">
        <div>
          <label className="block text-sm font-medium text-gray-900">Nama</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Alamat</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900"> Pembayaran</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={pembayaran}
            onChange={(e) => setPembayaran(e.target.value)}
            required
          >
            <option value="">Pilih</option>
            <option value="Qris">Qris</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900"> Pengiriman</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={pengiriman}
            onChange={(e) => setPengiriman(e.target.value)}
            required
          >
            <option value="">Pilih</option>
            <option value="pickup">Ambil di tempat</option>
            <option value="gosend">GoSend</option>
            <option value="paxel">Paxel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Pesan Tambahan (opsional)</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`
    w-full py-3 rounded-lg font-semibold
    text-white transition
    ${loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"}
  `}
        >
          {loading ? "Mengirim Pesanan..." : "Pesan"}
        </button>
      </form>
    </div>
  )
}
