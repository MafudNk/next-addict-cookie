import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 shadow-md">
      <div className="text-3xl cursor-pointer">
        <div className="space-y-1">
          <Link href="/">
            <Image src="/images/logo_baru_2.jpg" width="60" height="60" alt="Logo" />
          </Link>
        </div>
      </div>
      <ul className="flex space-x-10 text-lg font-semibold text-black">
        <li><Link href="/produk" className="hover:text-gray-600">Produk</Link></li>
        <li><Link href="/order" className="hover:text-gray-600">Order</Link></li>
        <li><Link href="#" className="hover:text-gray-600">Lokasi</Link></li>
      </ul>
    </nav>
  );
}
