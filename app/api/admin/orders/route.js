import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export async function GET() {
    try {
        const client = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "Sheet1!A2:K",
        });

        const rows = res.data.values || [];
        const ordersMap = {};

        rows.forEach(row => {
            const [
                orderId, status, nama, alamat, pengiriman,
                pembayaran, item, harga, qty, total, pesan, waktu
            ] = row;

            if (!ordersMap[orderId]) {
                ordersMap[orderId] = {
                    orderId,
                    status,
                    nama,
                    alamat,
                    pengiriman,
                    pembayaran,
                    total,
                    pesan,
                    waktu,
                    items: []
                };
            }

            ordersMap[orderId].items.push({
                name: item,
                price: harga,
                qty
            });
        });

        return NextResponse.json({
            success: true,
            data: Object.values(ordersMap)
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    const { rowIndex, status } = await req.json();

    // rowIndex = baris spreadsheet (misal 5)
    // status = "paid" | "dikirim" | "done"

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Sheet1!B${rowIndex}`,
        valueInputOption: "RAW",
        requestBody: {
            values: [[status]],
        },
    });

    return NextResponse.json({ success: true });
}