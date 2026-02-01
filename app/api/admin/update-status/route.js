export async function POST(req) {
  const { orderId, status } = await req.json();

  // ambil semua OrderID
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:A",
  });

  const rows = res.data.values || [];

  const updates = rows
    .map((row, i) => (row[0] === orderId ? i + 2 : null))
    .filter(Boolean);

  for (const rowIndex of updates) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!B${rowIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[status]],
      },
    });
  }

  return NextResponse.json({ success: true });
}