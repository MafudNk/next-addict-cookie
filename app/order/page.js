'use client';

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ALL_PRODUCTS } from '../data/products.js'



export default function OrderPage() {
    const router = useRouter()
    // Ambil data dari localStorage jika ada
    const [items, setItems] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(
            localStorage.getItem("orderData") || "[]"
        );

        const merged = ALL_PRODUCTS.map((product) => {
            const found = saved.find(
                (s) => s.id === product.id
            );

            return found
                ? { ...product, qty: found.qty }
                : { ...product, qty: 0 };
        });

        setItems(merged);
    }, []);

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

            {/* 🌙 RAMADHAN SPECIAL */}
            <div className="mb-6 bg-white rounded-xl p-4 border border-orange-200">
                <h3 className="font-bold text-lg mb-3">
                    🌙 Ramadhan Special (Limited)
                </h3>

                <div className="space-y-3 text-sm text-gray-700">
                    <p>🎁 Signature Cookies (Aneka kue kering)</p>
                    <p>🍍 Nastar Gold Butter</p>
                    <p>🍫 Luxe Chocolate Bite</p>
                </div>

                <Link
                    href="/ramadhan"
                    className="inline-block mt-3 text-orange-600 font-medium underline"
                >
                    Lihat Detail Ramadhan →
                </Link>
            </div>
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


                            {item.category === "signature" && (
                                <span className="text-xs text-red-600 font-medium">
                                    🌙 Ramadhan Special
                                </span>
                            )}
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