export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 shadow-md">
      <div className="text-3xl cursor-pointer">
        <div className="space-y-1">
          <a href="/">
            <img src="/images/logo_baru_2.jpg" width="60" height="60" alt="Logo" />
          </a>
        </div>
      </div>
      <ul className="flex space-x-10 text-lg font-semibold text-black">
        <li><a href="/produk" className="hover:text-gray-600">Produk</a></li>
        <li><a href="/order" className="hover:text-gray-600">Order</a></li>
        <li><a href="#" className="hover:text-gray-600">Lokasi</a></li>
      </ul>
    </nav>
  );
}
