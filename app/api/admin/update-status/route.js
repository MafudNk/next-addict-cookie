import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export async function POST(req) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      throw new Error("orderId or status missing");
    }

    // 🔐 Auth Google
    const client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 📥 Ambil semua OrderID
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A2:A",
    });

    const rows = res.data.values || [];

    // 🔎 Cari semua row yang OrderID-nya sama
    const targetRows = rows
      .map((row, i) => (row[0] === orderId ? i + 2 : null))
      .filter(Boolean);

    if (targetRows.length === 0) {
      throw new Error("OrderID not found in sheet");
    }

    // 🔄 Update status di semua row order tsb
    for (const rowIndex of targetRows) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!B${rowIndex}`, // kolom Status
        valueInputOption: "RAW",
        requestBody: {
          values: [[status]],
        },
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ update-status error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}