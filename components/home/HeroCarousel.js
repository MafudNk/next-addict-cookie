'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroCarousel({ images }) {
  return (
    <div className="w-full h-[50vh] md:h-[80vh] relative overflow-hidden bg-[#fff8ee]">
      <Swiper className="w-full h-full" modules={[Autoplay]} autoplay={{ delay: 3000 }} slidesPerView={1}>
        {images.map((img, i) => (
          <SwiperSlide key={img} className="w-full h-full relative">
            <Image
              src={img}
              alt="Addict Bite Cookie"
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-contain md:object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
