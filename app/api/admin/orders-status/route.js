import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

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