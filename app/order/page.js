'use client';

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const cookies = [
    { id: 1, name: "Classic", price: 23000, img: "images/product/1.webp", qty: 0 },
    { id: 2, name: "OG with Marshmallow", price: 21500, img: "images/product/2.webp", qty: 0 },
    { id: 3, name: "Biscoff", price: 20500, img: "images/product/7.webp", qty: 0 },
    { id: 4, name: "Double Choco", price: 22500, img: "images/product/3.webp", qty: 0 },
    { id: 5, name: "Black Caramel", price: 25000, img: "images/product/4.webp", qty: 0 },
    { id: 6, name: "Matcha", price: 23500, img: "images/product/5.webp", qty: 0 },
    { id: 7, name: "Red Velvet", price: 18500, img: "images/product/6.webp", qty: 0 },
];

export default function OrderPage() {
    const router = useRouter()
    // Ambil data dari localStorage jika ada
    const [items, setItems] = useState([]);
    useEffect(() => {
        const savedOrder = localStorage.getItem('orderData')
        if (savedOrder) {

            const savedItems = JSON.parse(savedOrder)

            // Gabungkan data: isi qty dari savedItems jika ada
            const mergedItems = cookies.map(defaultItem => {
                const found = savedItems.find(s => s.id === defaultItem.id)
                return found ? { ...defaultItem, qty: found.qty } : defaultItem
            })
            setItems(mergedItems)
        } else {
            setItems(cookies.map(item => ({ ...item, qty: 0 })));
        }
    }, [])

    const handleLanjut = () => {

        const selectedItems = items.filter(item => item.qty > 0)

        if (selectedItems.length === 0) {
            alert("Pilih setidaknya satu produk sebelum lanjut.")
            return
        }

        localStorage.setItem('orderData', JSON.stringify(selectedItems))
        router.push('/summary')
    }
    const handlePlus = (index) => {
        const newItems = [...items]
        newItems[index].qty += 1
        setItems(newItems)
        console.log('Plus:', newItems)

        localStorage.setItem('orderData', JSON.stringify(newItems))
    }

    const handleMinus = (index) => {
        const newItems = [...items]
        if (newItems[index].qty > 0) {
            newItems[index].qty -= 1
            setItems(newItems)
            console.log('Minus:', newItems)

            localStorage.setItem('orderData', JSON.stringify(newItems))
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4 md:p-6 rounded-xl shadow-md bg-orange-50">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                🛒 Pesan Cookies
            </h2>

            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="
          flex flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-3
          py-3
          border-b border-orange-100
        "
                >
                    {/* KIRI: gambar + info */}
                    <div className="flex items-center gap-3">
                        <Image
                            src={`/${item.img}`}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                        />

                        <div>
                            <div className="font-semibold text-gray-900">
                                {item.name}
                            </div>
                            <div className="text-sm text-gray-700">
                                Rp {item.price.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* KANAN: kontrol */}
                    <div
                        className="
    flex
    flex-row
    md:flex-col
    items-center
    md:items-start
    gap-2
    md:gap-1">
                        {/* tombol qty */}
                        <div className="flex items-center gap-1 bg-white rounded px-1 py-1">
                            <button
                                onClick={() => handleMinus(index)}
                                className="bg-orange-500 text-white w-7 h-7 rounded"
                            >
                                –
                            </button>

                            <span className="w-6 text-center font-medium text-gray-900">
                                {item.qty}
                            </span>

                            <button
                                onClick={() => handlePlus(index)}
                                className="bg-orange-500 text-white w-7 h-7 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* total harga */}
                        <div className="text-sm font-medium text-gray-700 md:mt-1">
                            <span className="ml-2 text-gray-400">
                            Rp {(item.price * item.qty).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            <button
                className="mt-6 bg-orange-500 text-white w-full py-3 rounded-lg font-semibold"
                onClick={handleLanjut}
            >
                Lanjut
            </button>
        </div>
    );
}