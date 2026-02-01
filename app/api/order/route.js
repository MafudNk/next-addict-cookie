import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const yearMonth = `${year}${month}`; // contoh: 202602



export async function POST(req) {
  try {

    const existingOrders = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A2:A", // A = OrderID, skip header
    });

    const orderIds = existingOrders.data.values
      ? existingOrders.data.values.flat()
      : [];

    const thisMonthOrders = orderIds.filter(id =>
      id.startsWith(`O-${yearMonth}-`)
    );

    const lastNumber = thisMonthOrders.length
      ? Math.max(
        ...thisMonthOrders.map(id => parseInt(id.split("-")[2]))
      )
      : 0;

    const nextNumber = lastNumber + 1;

    const orderId = `O-${yearMonth}-${String(nextNumber).padStart(3, "0")}`;

    const body = await req.json();
    const { order, nama, alamat, pengiriman, pembayaran, pesan, total } = body;
    // email: credentials.client_email,
    // key: credentials.private_key,
    const client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL.replace(/\\n/g, "\n"),
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });


    // tes
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const waktu = new Date().toLocaleString();

    // order = array => Classic, OG, Biscoff, dst
    const values = order.map(item => [
      orderId,
      nama,
      alamat,
      pengiriman,
      pembayaran,
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
