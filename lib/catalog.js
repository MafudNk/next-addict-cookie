// Sumber data statis sementara. Bentuknya sengaja sama dengan yang nanti
// dikembalikan backend (lihat docs/api-contract.md). Halaman TIDAK boleh
// import file ini langsung, selalu lewat lib/api/*.

/**
 * @typedef {Object} Campaign
 * @property {string} id
 * @property {string} name
 * @property {string} preorderStart  ISO date
 * @property {string} preorderEnd    ISO date
 * @property {{region: string, date: string}[]} delivery
 * @property {"open"|"closed"} status
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {"soft"|"signature"|"hampers"} category
 * @property {number|null} price          rupiah, null = belum ada harga
 * @property {string} thumbnail
 * @property {string[]} images
 * @property {string} description
 * @property {string[]} ingredients
 * @property {string[]} bundle            isi paket (khusus hampers)
 * @property {"available"|"sold_out"} status
 * @property {string|null} campaignId
 * @property {string|null} collection     pengelompokan halaman Ramadhan
 * @property {number|null} quota
 * @property {number} sortOrder
 */

/** @type {Campaign[]} */
export const campaigns = [
  {
    id: "ramadhan-2026",
    name: "Ramadhan & Lebaran 2026",
    preorderStart: "2026-02-02",
    preorderEnd: "2026-02-16",
    delivery: [
      { region: "Sidoarjo & Surabaya", date: "2026-03-14" },
      { region: "Probolinggo – Leces", date: "2026-03-18" },
    ],
    status: "closed",
  },
];

const soft = (n, id, slug, name, price, thumb, images, description, ingredients) => ({
  id: `soft-${id}`,
  slug,
  name,
  category: "soft",
  price,
  thumbnail: `/images/product/${thumb}.webp`,
  images,
  description,
  ingredients,
  bundle: [],
  status: "available",
  campaignId: null,
  collection: null,
  quota: null,
  sortOrder: n,
});

const signature = (n, slug, name, price, image, description, collection = "signature-cookies", quota = 50) => ({
  id: `sig-${slug}`,
  slug,
  name,
  category: "signature",
  price,
  thumbnail: `/images/signature/${image}.webp`,
  images: [`/images/signature/${image}.webp`],
  description,
  ingredients: [],
  bundle: [],
  status: "sold_out",
  campaignId: "ramadhan-2026",
  collection,
  quota,
  sortOrder: 100 + n,
});

const hamper = (n, slug, name, image, description, bundle, quota) => ({
  id: `hmp-${slug}`,
  slug,
  name,
  category: "hampers",
  price: null,
  thumbnail: `/images/hampers/${image}.webp`,
  images: [`/images/hampers/${image}.webp`],
  description,
  ingredients: [],
  bundle,
  status: "sold_out",
  campaignId: "ramadhan-2026",
  collection: null,
  quota,
  sortOrder: 200 + n,
});

/** @type {Product[]} */
export const products = [
  soft(1, "classic", "classic", "Classic", 23000, "1",
    ["/images/preview-product/JN1A4017.webp", "/images/preview-product/classic2.jpeg"],
    "Varian Classic adalah pilihan pecinta cookie yang mencari kelembutan dan rasa autentik dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan empuk, dengan rasa manis yang seimbang. Perpaduan tekstur dengan tambahan kacang walnut dan aroma butter yang menggoda.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Dark Chocolate", "Milk Chocolate", "Kacang Walnut"]),
  soft(2, "og-with-marshmallow", "og-with-marshmallow", "OG with Marshmallow", 21500, "2",
    ["/images/preview-product/JN1A4050.webp", "/images/preview-product/JN1A3964.webp"],
    "Varian OG with Marshmallow adalah pilihan tepat bagi kamu yang menginginkan sensasi klasik dengan sentuhan manis yang memanjakan.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Dark Chocolate", "Milk Chocolate", "Marshmallow"]),
  soft(3, "biscoff", "biscoff", "Biscoff", 20500, "7",
    ["/images/preview-product/JN1A4042.webp", "/images/preview-product/JN1A3961.webp"],
    "Varian Biscoff adalah pilihan sempurna bagi pencinta rasa manis dengan sentuhan karamel dan rempah khas. Cookies ini menghadirkan perpaduan renyah-lembut dengan rasa Biscoff yang mendominasi setiap gigitan. Aroma kayu manis yang hangat, manisnya karamel, dan tekstur lembut menciptakan pengalaman rasa yang tak terlupakan. Cocok untuk dinikmati bersama secangkir kopi atau teh.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Dark Chocolate", "Lotus Biscoff Biscuit", "Lotus Biscoff Smooth"]),
  soft(4, "double-choco", "double-choco", "Double Choco", 22500, "3",
    ["/images/preview-product/JN1A4063.webp", "/images/preview-product/JN1A4006.webp"],
    "Varian Double Choco adalah pilihan bagi pecinta cokelat yang menginginkan sensasi rasa yang kaya, tekstur unik dan kelembutan dalam setiap gigitan. Cookies ini menggabungkan adonan cokelat yang lembut dengan potongan cokelat yang melimpah dan tekstur kacang almond yang renyah menciptakan perpaduan rasa yang memanjakan lidah. Teksturnya yang chewy di bagian dalam dan sedikit garing di bagian luar membuatnya cocok dinikmati sebagai camilan santai, teman minum kopi, atau hadiah istimewa untuk orang terkasih.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Cocoa Powder", "Dark Chocolate", "Milk Chocolate", "Kacang Almond"]),
  soft(5, "black-caramel", "black-caramel", "Black Caramel", 25000, "4",
    ["/images/preview-product/JN1A4073.webp", "/images/preview-product/JN1A3976.webp"],
    "Varian Black Caramel adalah pilihan bagi pecinta kue yang menginginkan rasa cokelat pekat serta perpaduan karamel dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan moist, dengan rasa manis yang seimbang dan aroma karamel yang menggoda.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Cocoa Powder", "Dark Chocolate", "Caramel"]),
  soft(6, "matcha", "matcha", "Matcha", 23500, "5",
    ["/images/preview-product/JN1A4054.webp", "/images/preview-product/JN1A3990.webp"],
    "Varian Matcha adalah pilihan bagi pecinta teh hijau yang menginginkan perpaduan rasa manis dan pahit yang khas dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan moist, dengan rasa matcha yang autentik, aroma yang menggoda dan kejutan rasa yang tercipta dari paduan coklat putih & dry cranberry.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Matcha Powder", "White Chocolate", "Dry Cranberry"]),
  soft(7, "red-velvet", "red-velvet", "Red Velvet", 18500, "6",
    ["/images/preview-product/JN1A4066.webp", "/images/preview-product/JN1A3979.webp"],
    "Varian Red Velvet adalah pilihan bagi pecinta cookies yang menginginkan perpaduan rasa cokelat lembut dan vanilla yang khas dalam setiap gigitan. Cookies ini memiliki tekstur yang lembut dan moist, dengan warna merah yang menggoda dan aroma yang menggugah selera. Soft Cookie varian Red Velvet menawarkan pengalaman menikmati cookies dengan isian cream cheese.",
    ["Butter", "Tepung Terigu", "Gula", "Telur", "Cocoa Powder", "Ekstrak Vanila", "White Chocolate", "Cream Cheese (filling)"]),

  signature(1, "nastar-classic", "Nastar Classic", 86000, "nastar", "Nastar klasik dengan butter premium"),
  signature(2, "kastengel", "Kastengel", 126000, "kastengel", "Kue keju gurih dengan taburan keju di atasnya"),
  signature(3, "palm-sugar-cheese", "Palm Sugar Cheese", 86000, "palm-sugar", "Kue keju dengan rasa gula aren"),
  signature(4, "lidah-kucing-ori", "Lidah Kucing Ori", 82000, "lidah-ori", "Lidah kucing dengan rasa klasik"),
  signature(5, "lidah-kucing-rainbow", "Lidah Kucing Rainbow", 87000, "lidah-rainbow", "Lidah kucing dengan rasa rainbow"),
  signature(6, "honey-sereal", "Honey Sereal", 102000, "honey", "Kue dengan rasa madu dan sereal"),
  signature(7, "moca-almond", "Moca Almond", 80500, "moca", "Kue dengan rasa moka dan taburan almond"),
  signature(8, "crazy-choco", "Crazy Choco", 92000, "crazy", "Kue coklat dengan sensasi rasa yang unik"),
  signature(9, "green-tea-cookies", "Green Tea Cookies", 120500, "greentea", "Kue kering dengan rasa teh hijau yang lembut dan menenangkan."),
  signature(10, "nastar-gold-butter", "Nastar Gold Butter", 150000, "nastargold",
    "Nastar klasik dengan butter premium dan isian nanas lembut, spesial Ramadhan & Lebaran.", "premium", 10),
  signature(11, "luxe-chocolate-bite", "Luxe Chocolate Bite", 150000, "luxe",
    "Chocolate cookies premium dengan rasa coklat intens, cocok untuk suguhan Hari Raya.", "premium", 15),

  hamper(1, "hampers-gold", "Hampers Ramadhan Gold", "hampers-gold",
    "Pilihan manis untuk berbagi kebahagiaan di Hari Raya dengan kemasan elegan.",
    ["Soft Cookies Classic", "OG with Marshmallow", "Double Choco", "Luxe Chocolate Bite"], 15),
  hamper(2, "hampers-premium", "Hampers Ramadhan Premium", "hampers-premium",
    "Hampers eksklusif dengan varian premium untuk keluarga dan relasi.",
    ["Soft Cookies Classic", "OG with Marshmallow", "Double Choco", "Nastar Gold Butter", "Luxe Chocolate Bite"], 10),
];
