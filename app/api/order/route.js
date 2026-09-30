import { google } from "googleapis";
import { NextResponse } from "next/server";
import { validateCreateOrder } from "@/lib/contracts";
import { getProductsByIds } from "@/lib/api/products";
import { whatsappLink } from "@/lib/site";
import { formatRupiah } from "@/lib/format";

// Implementasi sementara (Google Sheet). Akan digantikan backend Supabase
// dengan kontrak request/response yang sama (docs/api-contract.md).
export async function POST(req) {
  try {
    const parsed = validateCreateOrder(await req.json().catch(() => null));
    if (!parsed.ok) {
      return NextResponse.json({ success: false, message: parsed.error }, { status: 400 });
    }
    const { items, customer, shipping, payment, note } = parsed.value;

    // Harga selalu dari katalog server, bukan dari client.
    const catalog = await getProductsByIds(items.map((i) => i.productId));
    const lines = [];
    for (const { productId, qty } of items) {
      const product = catalog.find((p) => p.id === productId);
      if (!product || product.status !== "available" || product.price == null) {
        return NextResponse.json(
          { success: false, message: "Ada produk yang tidak tersedia" },
          { status: 400 }
        );
      }
      lines.push({ name: product.name, price: product.price, qty });
    }
    const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const yearMonth = `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Sheet1!A2:A" });
    const numbers = (existing.data.values?.flat() ?? [])
      .filter((id) => id.startsWith(`O-${yearMonth}-`))
      .map((id) => Number(id.split("-")[2]));
    const orderCode = `O-${yearMonth}-${String(Math.max(0, ...numbers) + 1).padStart(3, "0")}`;

    const waktu = new Date().toLocaleString("id-ID");
    // Kolom A-L sama seperti sebelumnya; nomor WhatsApp ditambahkan di kolom M.
    const values = lines.map((l) => [
      orderCode, "pending", customer.name, customer.address, shipping, payment,
      l.name, l.price, l.qty, total, note || "-", waktu, customer.phone,
    ]);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    const waUrl = whatsappLink(
      [
        "📦 ORDER BARU",
        `🆔 Order ID: ${orderCode}`,
        "",
        `👤 Nama: ${customer.name}`,
        `📱 WhatsApp: ${customer.phone}`,
        `📍 Alamat: ${customer.address}`,
        `💳 Pembayaran: ${payment}`,
        `🚚 Pengiriman: ${shipping}`,
        "",
        ...lines.map((l) => `• ${l.name} x${l.qty}`),
        `🛒 Total: ${formatRupiah(total)}`,
      ].join("\n")
    );

    return NextResponse.json({ success: true, orderCode, total, waUrl });
  } catch (error) {
    console.error("❌ Gagal menyimpan order:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan, coba lagi." },
      { status: 500 }
    );
  }
}
