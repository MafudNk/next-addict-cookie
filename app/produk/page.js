
import Link from "next/link";
import Image from "next/image";
export default function ProductPage() {
    const cookies = [
        { id: 1, name: "Classic", slug: "classic", price: 23000, img: "images/product/1.webp" },
        { id: 2, name: "OG with Marshmallow", slug: "og-with-marshmallow", price: 21500, img: "images/product/2.webp" },
        { id: 3, name: "Biscoff", slug: "biscoff", price: 20500, img: "images/product/7.webp" },
        { id: 4, name: "Double Choco", slug: "double-choco", price: 22500, img: "images/product/3.webp" },
        { id: 5, name: "Black Caramel", slug: "black-caramel", price: 25000, img: "images/product/4.webp" },
        { id: 6, name: "Matcha", slug: "matcha", price: 23500, img: "images/product/5.webp" },
        { id: 7, name: "Red Velvet", slug: "red-velvet", price: 18500, img: "images/product/6.webp" },
    ];
    return (
        <section className="bg-orange-50 px-6 py-10 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cookies.map((product) => (
                    <Link key={product.id} href={`/produk/${product.slug}`}>
                        <div className="bg-orange-45 rounded-2xl shadow p-4 flex flex-col items-center">
                            <Image
                                src={`/${product.img}`}
                                alt={product.name}
                                width={180}
                                height={180}
                                className="object-cover rounded-full mx-auto"
                            />
                            <h3 className="text-lg font-semibold text-center text-gray-900">{product.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
