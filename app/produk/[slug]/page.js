'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PRODUCTS = [
  {
    slug: "og-with-marshmallow",
    name: "OG with Marshmallow",
    images: [
      "/images/preview-product/JN1A4050.JPG",
      "/images/preview-product/JN1A3964.webp",
    ],
    description:
      "Varian OG with Marshmallow adalah pilihan tepat bagi kamu yang menginginkan sensasi klasik dengan sentuhan manis yang memanjakan.",
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Dark Chocolate",
      "Milk Chocolate",
      "Marshmallow",
    ],
  },
  {
    slug: "classic",
    name: "Classic",
    images: [
      "/images/preview-product/JN1A4017.JPG",
      "/images/preview-product/classic2.jpeg",
    ],
    description:
      "Varian Classic adalah pilihan pecinta cookie yang mencari kelembutan dan rasa autentik dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan empuk, dengan rasa manis yang seimbang.Perpaduan tekstur dengan tambahan kacang walnut dan aroma butter yang menggoda.",
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Dark Chocolate",
      "Milk Chocolate",
      "Kacang Walnut",
    ],
  },
  {
    slug: "biscoff",
    name: "Biscoff",
    images: [
      "/images/preview-product/JN1A4042.JPG",
      "/images/preview-product/JN1A3961.webp",
    ],
    description:
      "Varian Biscoff adalah pilihan sempurna bagi pencinta rasa manis dengan sentuhan karamel dan rempah khas. Cookies ini menghadirkan perpaduan renyah-lembut dengan rasa Biscoff yang mendominasi setiap gigitan. Aroma kayu manis yang hangat, manisnya karamel, dan tekstur lembut menciptakan pengalaman rasa yang tak terlupakan. Cocok untuk dinikmati bersama secangkir kopi atau teh.",
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Dark Chocolate",
      "Lotus Biscoff Biscuit",
      "Lotus Biscoff Smooth",
    ],
  },
  {
    slug: "black-caramel",
    name: "Black Caramel Cookies",
    images: [
      "/images/preview-product/JN1A4050.JPG",
      "/images/preview-product/JN1A3964.webp",
    ],
    description:
      "Varian Black Caramel adalah pilihan bagi pecinta kue yang menginginkan rasa cokelat pekat serta  perpaduan karamel dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan moist, dengan rasa manis yang seimbang dan aroma karamel yang menggoda.",
    ingredients: [
      'Butter',
      'Tepung Terigu',
      'Gula',
      'Telur',
      'Cocoa Powder',
      'Dark Chocolate',
      'Caramel',
    ],
  },
  {
    slug: "double-choco",
    name: "Double Choco",
    images: [
      "/images/preview-product/JN1A4063.JPG",
      "/images/preview-product/JN1A4006.webp",
    ],
    description:
      "Varian Double Choco adalah pilihan bagi pecinta cokelat yang menginginkan sensasi rasa yang kaya, tekstur unik dan kelembutan dalam setiap gigitan. Cookies ini menggabungkan adonan cokelat yang lembut dengan potongan cokelat yang melimpah dan tekstur kacang almond yang renyah menciptakan perpaduan rasa yang memanjakan lidah. Teksturnya yang chewy di bagian dalam dan sedikit garing di bagian luar membuatnya cocok dinikmati sebagai camilan santai, teman minum kopi, atau hadiah istimewa untuk orang terkasih.",
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Cocoa Powder",
      "Dark Chocolate",
      "Milk Chocolate",
      "Kacang Almond",
    ],
  },
  {
    slug: "matcha",
    name: "Matcha",
    images: [
      "/images/preview-product/JN1A4054.JPG",
      "/images/preview-product/JN1A3990.webp",
    ],
    description: `Varian Matcha adalah pilihan bagi pecinta teh hijau yang menginginkan perpaduan rasa manis dan pahit
                    yang khas dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan moist, dengan rasa
                    matcha yang autentik, aroma yang menggoda dan kejutan rasa yang tercipta dari paduan coklat putih &
                    dry cranberry.`,
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Matcha Powder",
      "White Chocolate",
      "Dry Cranberry",
    ],
  },
  {
    slug: "red-velvet",
    name: "Red Velvet",
    images: [
      "/images/preview-product/JN1A4066.JPG",
      "/images/preview-product/JN1A3979.webp",
    ],
    description: `Varian Red Velvet adalah pilihan bagi pecinta cookies yang menginginkan perpaduan rasa cokelat
                    lembut dan vanilla yang khas dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan
                    moist, dengan warna merah yang menggoda dan aroma yang menggugah selera. Soft Cookie varian Red
                    Velvet menawarkan pengalaman menikmati cookies dengan isian cream cheese.`,
    ingredients: [
      "Butter",
      "Tepung Terigu",
      "Gula",
      "Telur",
      "Cocoa Powder",
      "Ekstrak Vanila",
      "White Chocolate",
      "Cream Cheese (filling)",
    ],
  },
];

export default function ProductDetailPage() {
  const { slug } = useParams();

  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return <p className="p-10">Produk tidak ditemukan</p>;
  }

  return (
    <section className="bg-orange-50 py-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Swiper */}
        <div className="w-full md:w-1/3">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={img}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="rounded shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Detail */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Bahan
          </h2>

          <ul className="list-disc pl-5 text-gray-700">
            {product.ingredients.map((bahan, i) => (
              <li key={i}>{bahan}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}