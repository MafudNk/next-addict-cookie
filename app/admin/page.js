'use client';

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const fetchOrders = async () => {
        setLoading(true);
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data.data || []);
        setLoading(false);
    };

    useEffect(() => {
        const key = prompt("Masukkan admin key");

        if (key !== "admin123") {
            alert("Unauthorized");
            window.location.href = "/";
        } else {
            setAuthorized(true);
            fetchOrders();
        }
    }, []);

    // ⛔ jangan render apa-apa sebelum lolos auth
    if (!authorized) {
        return null;
    }


    const updateStatus = async (rowIndex, status) => {
        await fetch("/api/admin/update-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rowIndex, status }),
        });

        fetchOrders(); // refresh data
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">OrderID</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Item</th>
                        <th className="border p-2">Harga</th>
                        <th className="border p-2">Qty</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Pembayaran</th>
                        <th className="border p-2">Pengiriman</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td className="border p-2">{order.orderId}</td>
                            <td className="border p-2">{order.nama}</td>
                            <td className="border p-2">
                                <ul className="list-disc pl-4">
                                    {order.items.map((item, i) => (
                                        <li key={i}>
                                            {item.name} ({item.qty} x Rp {item.price})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="border p-2">Rp {order.total}</td>
                            <td className="border p-2">{order.pembayaran}</td>
                            <td className="border p-2">{order.pengiriman}</td>
                            <td className="border p-2">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(order.orderId, e.target.value)
                                    }
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="dikirim">Dikirim</option>
                                    <option value="done">Done</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}