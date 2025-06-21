
import Link from "next/link";
export default function ProductPage() {
    const cookies = [
        { id: 1, name: "Classic", price: 23000, img: "images/product/1.webp" },
        { id: 2, name: "OG with Marshmallow", price: 21500, img: "images/product/2.webp" },
        { id: 3, name: "Biscoff", price: 20500, img: "images/product/7.webp" },
        { id: 4, name: "Double Choco", price: 22500, img: "images/product/3.webp" },
        { id: 5, name: "Black Caramel", price: 25000, img: "images/product/4.webp" },
        { id: 6, name: "Matcha", price: 23500, img: "images/product/5.webp" },
        { id: 7, name: "Red Velvet", price: 18500, img: "images/product/6.webp" },
    ];
    return (
        <section className="bg-orange-50 px-6 py-10 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cookies.map((product) => (
                    <Link key={product.id} href={`/produk/${product.id}`}>
                        <div className="bg-orange-45 rounded-2xl shadow p-4 flex flex-col items-center">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-45 h-45 object-cover rounded-full mx-auto"
                            />
                            <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
