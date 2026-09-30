'use client';

import { useState } from "react";
import Image from "next/image";

const FALLBACK = "/images/placeholder.svg";

// next/image dengan fallback bila file gambar belum ada.
export default function ProductImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...props}
      src={failed || !src ? FALLBACK : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
