'use client';

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductCarousel({ products }) {
  return (
    <Swiper
      className="bg-orange-50 pb-10"
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      loop
      centeredSlides
      autoplay={{ delay: 3000 }}
      spaceBetween={30}
      slidesPerView={1.6}
      breakpoints={{ 640: { slidesPerView: 2.5 }, 1024: { slidesPerView: 4 } }}
      style={{ paddingBottom: "40px" }}
    >
      {products.map((p) => (
        <SwiperSlide key={p.id} className="flex flex-col items-center">
          <Link href={`/produk/${p.slug}`}>
            <Image src={p.thumbnail} alt={p.name} width={300} height={300} sizes="(min-width:1024px) 25vw, 60vw" className="max-w-full h-auto" />
            <p className="text-center mt-2 text-gray-900">{p.name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
