'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cart:v1";
const CartContext = createContext(null);

// Cart hanya menyimpan { productId, qty }. Nama & harga selalu dari katalog.
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((i) => i?.productId && i.qty > 0));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  // n bisa negatif; qty <= 0 menghapus item. Pakai updater agar klik cepat tidak hilang.
  const add = useCallback((productId, n = 1) => {
    setItems((prev) => {
      const cur = prev.find((i) => i.productId === productId)?.qty ?? 0;
      const rest = prev.filter((i) => i.productId !== productId);
      const qty = Math.min(999, Math.max(0, cur + n));
      return qty > 0 ? [...rest, { productId, qty }] : rest;
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const qtyOf = (id) => items.find((i) => i.productId === id)?.qty ?? 0;
    return { items, ready, qtyOf, add, clear };
  }, [items, ready, add, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
