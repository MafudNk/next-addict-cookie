import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import credentials from "@/config/credentials.json";

export async function POST(req) {
  try {
    const body = await req.json();
    const { order, nama, alamat, pengiriman, pesan, total } = body;

    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1eavy18b18RHH2gDECkCEC2g-TLsio2y4WmYcjLHbXRg";
    const waktu = new Date().toLocaleString();

    // order = array => Classic, OG, Biscoff, dst
    const values = order.map(item => [
      nama,
      alamat,
      pengiriman,
      item.name,
      item.price,
      item.qty,
      total,
      pesan,
      waktu
    ]);

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: values
      }
    });

    console.log("✅ Data berhasil ditulis:", result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal kirim ke Google Sheet:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
