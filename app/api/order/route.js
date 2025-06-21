import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import credentials from "@/lib/credentials.json";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, alamat, pengiriman, pesanan } = body;

    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "SPREADSHEET_ID_KAMU";
    const waktu = new Date().toLocaleString();

    const values = pesanan.map(item => [
      nama,
      alamat,
      pengiriman,
      item.produk,
      item.jumlah,
      item.harga,
      waktu,
    ]);

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("✅ Data berhasil ditulis:", result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal kirim ke Google Sheet:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
