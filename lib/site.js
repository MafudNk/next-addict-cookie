export const SITE_NAME = "Addict Bite Cookie";
export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "6281617997119";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || null;

export const whatsappLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
