'use client'; // Wajib! Karena Swiper butuh DOM (client-side)

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import style Swiper
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RamadhanTeaser from './components/RamadhanTeaser';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
export default function HomePage() {
  return (
    <>
      <div className="w-full h-[50vh] md:h-[80vh] relative overflow-hidden bg-[#fff8ee]">
        <Swiper
          className="w-full h-full"
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
        >
          {[
            "JN1A3942.webp",
            "JN1A3943.webp",
            "JN1A3935_new.webp",
            "JN1A3958.webp",
          ].map((img, i) => (
            <SwiperSlide key={i} className="w-full h-full relative">
              <Image
                src={`/images/nav/${img}`}
                alt=""
                fill
                priority={i === 0}
                className="
            object-contain
            md:object-cover
            transition-all duration-500
          "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="relative overflow-hidden bg-orange-50 py-20">
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] -z-10 animate-blob mix-blend-multiply opacity-50 blur-sm">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#F59E0B"
              d="M41.6,-65.5C53.9,-56.1,63.7,-44.1,66.9,-30.9C70.2,-17.7,66.9,-3.4,63.5,11.8C60.1,27.1,56.5,43.2,46.4,53.3C36.2,63.4,19.6,67.5,2.9,64.1C-13.8,60.7,-27.5,49.8,-36.2,38C-44.8,26.2,-48.3,13.6,-52.6,-1.1C-56.9,-15.8,-62,-31.6,-56.6,-43.6C-51.1,-55.5,-35.1,-63.6,-19.1,-69C-3,-74.5,13.1,-77.2,27.1,-72.5C41.2,-67.8,54.4,-55,41.6,-65.5Z"
              transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">

          <Image src="/images/logo_baru_2-removebg-preview.png" alt="" width={400} height={200} className="max-w-full h-auto" />


          <div className="text-gray-600 font-inter text-lg leading-relaxed">
            <div>
              Bukan sekadar camilan— <br />

              ini adalah pengalaman rasa yang bikin nagih dari gigitan pertama. <br /><br />



              Dibuat dengan bahan premium dan dipanggang dengan cinta, setiap
              cookie punya tekstur soft & chewy yang meleleh di mulut, dengan
              rasa manis pas yang bikin kamu pengen lagi dan lagi.
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-5 items-center">

          <div className="text-gray-600 font-source text-2xl leading-relaxed text-center mt-8">
            <strong>-Where Every Bite Becomes an Addiction-</strong>
          </div>
        </div>
      </section>
      <RamadhanTeaser />
      <Swiper className="bg-orange-50 swiper mySwiper pb-10"
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true, }}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={4}
        style={{ paddingBottom: '40px' }} >
        <div className="swiper-wrapper">
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/classic.html"><Image src="/images/product/1.webp" alt="Classic" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">Classic</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/original.html"><Image src="/images/product/2.webp" alt="Classic" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">OG with Marshmallow</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/original.html"><Image src="/images/product/7.webp" alt="Classic" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">Biscoff</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/double-choco.html"><Image src="/images/product/3.webp" width={300} height={300}
              className=" transform [rotate:45deg]" alt="Double Choco" />
              <p className="text-center mt-2 text-gray-900">Double Choco</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/black-caramel.html"><Image src="/images/product/4.webp" alt="Black Caramel" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">Black Caramel</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/matcha.html"><Image src="/images/product/5.webp" alt="Matcha" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">Matcha</p>
            </a>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide flex flex-col items-center">
            <a href="product-detail/red-velvet.html"><Image src="/images/product/6.webp" alt="Red Velvet" width={300} height={300} className="max-w-full h-auto" />
              <p className="text-center mt-2 text-gray-900">Red Velvet</p>
            </a>
          </SwiperSlide>
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  )
}
