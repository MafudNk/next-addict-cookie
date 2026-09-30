export const formatRupiah = (n) =>
  n == null ? "Harga menyusul" : `Rp ${Number(n).toLocaleString("id-ID")}`;
