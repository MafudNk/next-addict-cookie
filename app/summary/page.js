'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SummaryPage() {
  const [order, setOrder] = useState([])
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [pengiriman, setPengiriman] = useState('')
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
      });

      const data = await res.json();
      localStorage.removeItem('orderData')
      console.log("RESPONSE:", data);
      if (data.success) {
        router.push("/success");
      }

      if (!res.ok) {
        throw new Error("Gagal mengirim pesanan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
    // e.preventDefault()
    // Sementara: tampilkan di console
    // console.log('Data dikirim:', finalData)

    // Simulasi kirim atau navigasi selesai
    // alert('Pesanan berhasil dikirim!')

    // // Bersihkan localStorage kalau perlu
    // localStorage.removeItem('orderData')
  }
  const handleSendToWhatsApp = () => {
    const phoneNumber = '6281234567890' // Ganti dengan nomor admin kamu (pakai kode negara)

    const orderText = order
      .filter(item => item.qty > 0)
      .map(item => `- ${item.name} x${item.qty} = Rp ${(item.price * item.qty).toLocaleString()}`)
      .join('\n')

    const total = order.reduce((acc, item) => acc + item.price * item.qty, 0)

    const message = `
📦 Pesanan Baru:
${orderText}

Total: Rp ${total.toLocaleString()}

Nama: ${form.nama}
Alamat: ${form.alamat}
Pesan: ${form.pesan}
  `.trim()

    const encoded = encodeURIComponent(message)
    window.location.href = `https://wa.me/${phoneNumber}?text=${encoded}`
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
          ← Modifikasi Pesanan
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
          <label className="block text-sm font-medium text-gray-900">Metode Pengiriman</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={pengiriman}
            onChange={(e) => setPengiriman(e.target.value)}
            required
          >
            <option value="">Pilih metode</option>
            <option value="pickup">Ambil di tempat</option>
            <option value="gosend">GoSend</option>
            <option value="kurir">Kurir toko</option>
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
          onClick={handleSubmit}
          disabled={loading}
          className={`
    w-full py-3 rounded-lg font-semibold
    text-white
    transition
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
