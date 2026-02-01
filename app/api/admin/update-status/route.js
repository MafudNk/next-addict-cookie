import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export async function POST(req) {
  try {
    const { rowIndex, status } = await req.json();

    const client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!B${rowIndex}`, // kolom Status
      valueInputOption: "RAW",
      requestBody: {
        values: [[status]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Update status error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}