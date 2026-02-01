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
    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        paid: "bg-blue-100 text-blue-700",
        dikirim: "bg-purple-100 text-purple-700",
        done: "bg-green-100 text-green-700",
    };
    const [filter, setFilter] = useState("all");
    const filteredOrders =
        filter === "all"
            ? orders
            : orders.filter(o => o.status === filter);
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


    const updateStatus = async (orderId, status) => {
        await fetch("/api/admin/update-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, status }),
        });

        fetchOrders();
    };

    if (loading) return <p className="p-4 text-gray-800">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Orders</h1>

            {/* 🔹 SUMMARY BAR */}
            <div className="flex gap-4 mb-4 text-sm text-gray-800">
                <div>
                    📦 Total Order: <b>{orders.length}</b>
                </div>
                <div>
                    🕒 Pending:{" "}
                    <b>{orders.filter(o => o.status === "pending").length}</b>
                </div>
                <div>
                    💰 Paid:{" "}
                    <b>{orders.filter(o => o.status === "paid").length}</b>
                </div>
            </div>
            <div className="flex gap-2 mb-4 text-gray-800">
                {["all", "pending", "paid", "dikirim", "done"].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1 rounded border text-sm ${filter === s ? "bg-orange-500 text-white" : "bg-white"
                            }`}
                    >
                        {s.toUpperCase()}
                    </button>
                ))}
            </div>
            <table className="w-full border text-sm text-gray-800">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">OrderID</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Item</th>
                           <th className="border p-2">Total</th>
                        <th className="border p-2">Pembayaran</th>
                        <th className="border p-2">Pengiriman</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map((order) => (
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
                            <td className="border p-2"><p className="font-bold">{order.pengiriman}</p> {order.alamat}</td>
                            <td className="border p-2">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(order.orderId, e.target.value)
                                    }
                                    className={`px-2 py-1 rounded text-sm font-medium ${statusStyle[order.status]}`}
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