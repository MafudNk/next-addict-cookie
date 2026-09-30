'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductGallery({ images, alt }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={img}>
          <Image src={img} alt={alt} width={600} height={600} priority={i === 0} sizes="(min-width:768px) 33vw, 100vw" className="rounded shadow-md" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
