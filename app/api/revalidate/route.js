import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

const TAGS = ["products", "campaigns"];

// Dipanggil backend setelah admin mengubah produk/campaign atau kuota berubah.
export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") || "";
  const ok =
    secret && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return NextResponse.json({ success: false }, { status: 401 });

  const { tag } = await req.json().catch(() => ({}));
  const tags = TAGS.includes(tag) ? [tag] : TAGS;
  tags.forEach((t) => revalidateTag(t));
  return NextResponse.json({ success: true, revalidated: tags });
}
