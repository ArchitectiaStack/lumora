import { Product, Category, Coupon } from "./types";

// Dynamic generated image paths
const HERO_MODEL_IMG = "/src/assets/images/lumora_hero_model_1782765318106.jpg";
const LUXE_HANDBAG_IMG = "/src/assets/images/lumora_luxe_handbag_1782765334648.jpg";
const SPRING_SALE_IMG = "/src/assets/images/lumora_spring_sale_1782765349465.jpg";
const BEAUTY_CATEGORY_IMG = "/src/assets/images/beauty_category_1782765861783.jpg";
const STRAW_HAT_IMG = "/src/assets/images/straw_hat_1782765876091.jpg";

export const CATEGORIES: Category[] = [
  {
    id: "women",
    name: "Women",
    itemCount: "120+ items",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "men",
    name: "Men",
    itemCount: "98+ items",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "home-living",
    name: "Home & Living",
    itemCount: "150+ items",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "beauty",
    name: "Beauty",
    itemCount: "80+ items",
    image: BEAUTY_CATEGORY_IMG
  },
  {
    id: "accessories",
    name: "Accessories",
    itemCount: "70+ items",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "luxe-handbag",
    title: "Luxe Handbag",
    price: 129.0,
    originalPrice: 185.0,
    category: "accessories",
    image: LUXE_HANDBAG_IMG,
    description: "A premium minimalist crossbody bag crafted from supple grained leather. Features a secure structured silhouette, brushed gold hardware, and an adjustable shoulder strap.",
    details: [
      "100% genuine calfskin leather",
      "Lined with soft micro-suede",
      "Interior card slot and zip pocket",
      "Adjustable shoulder strap (50cm drop)",
      "Handcrafted in small batches"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Oatmeal Beige", hex: "#EAD6D3" },
      { name: "Sage Green", hex: "#8FBC8F" },
      { name: "Noir Black", hex: "#1C1C1C" }
    ],
    rating: 4.9,
    reviewCount: 42,
    isNew: true
  },
  {
    id: "linen-shirt",
    title: "Linen Shirt",
    price: 49.0,
    originalPrice: 65.0,
    category: "women",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop",
    description: "An oversized, lightweight linen shirt perfect for warm days. Crafted from breathable, organic French flax with classic button cuffs and a relaxed collar.",
    details: [
      "100% organic French flax linen",
      "Pre-washed for extra softness",
      "Oversized, relaxed fit",
      "Mother-of-pearl buttons",
      "Breathable, moisture-wicking weave"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sage Green", hex: "#8AA090" },
      { name: "Alabaster White", hex: "#FAF9F6" }
    ],
    rating: 4.7,
    reviewCount: 118,
    isNew: true
  },
  {
    id: "minimal-sneakers",
    title: "Minimal Sneakers",
    price: 79.0,
    category: "men",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    description: "An ultra-clean low-top sneaker made from buttery-soft Nappa leather. Engineered with an ergonomic cork footbed and durable Margom vulcanized rubber soles.",
    details: [
      "Full-grain Italian Nappa leather",
      "Ergonomic natural cork footbed",
      "Margom rubber cupsole",
      "Waxed cotton laces",
      "Hand-stitched detailing in Italy"
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Chalk White", hex: "#F3F4F6" },
      { name: "Tan Suede", hex: "#D2B48C" }
    ],
    rating: 4.8,
    reviewCount: 76,
    isNew: true
  },
  {
    id: "scented-candle",
    title: "Scented Candle",
    price: 26.0,
    category: "home-living",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    description: "Hand-poured coconut wax candle with a crackling wooden wick. Releases subtle top notes of sea salt and sage, anchored by deep amber and driftwood.",
    details: [
      "100% organic coconut wax blend",
      "Natural crackling wooden wick",
      "Non-toxic, phthalate-free fragrance",
      "60-hour slow-burn time",
      "Reusable frosted glass tumbler"
    ],
    sizes: ["Standard (8oz)"],
    colors: [
      { name: "Alabaster", hex: "#FAF9F6" }
    ],
    rating: 4.6,
    reviewCount: 54,
    isNew: true
  },
  {
    id: "straw-hat",
    title: "Straw Hat",
    price: 35.0,
    category: "accessories",
    image: STRAW_HAT_IMG,
    description: "A timeless woven panama hat crafted from natural raffia straw. Trimmed with a wide grosgrain black ribbon and fitted with an internal adjustable sweatband.",
    details: [
      "100% natural braided raffia straw",
      "Black grosgrain ribbon band",
      "UPF 50+ sun protection",
      "Adjustable inner sweatband",
      "Made using sustainable trade practices"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Straw Gold", hex: "#EEDC82" }
    ],
    rating: 4.5,
    reviewCount: 29,
    isNew: true
  },
  {
    id: "gold-hoops",
    title: "Gold Hoops",
    price: 19.0,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    description: "Delicate, lightweight hoop earrings perfect for daily wear. Cast in thick 18k yellow gold vermeil over recycled sterling silver.",
    details: [
      "18k yellow gold vermeil",
      "Recycled 925 sterling silver base",
      "Hypoallergenic and nickel-free",
      "Clasp closure for high security",
      "Diameter: 25mm"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "18k Gold", hex: "#FFD700" }
    ],
    rating: 4.9,
    reviewCount: 165,
    isNew: true
  },
  // Extra products for filtering and rich browsing
  {
    id: "linen-pants",
    title: "Linen Drawstring Pants",
    price: 58.0,
    originalPrice: 78.0,
    category: "women",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=600&auto=format&fit=crop",
    description: "Relaxed high-rise pants woven from pure organic linen, featuring a wide elastic waist and flexible drawstring tie.",
    details: [
      "100% organic flax linen",
      "Breathable weave, pre-shrunk",
      "Two side pockets, one back pocket",
      "Comfortable wide elastic waistband",
      "Adjustable drawstring with brass tips"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#EAD6D3" },
      { name: "Olive Green", hex: "#556B2F" }
    ],
    rating: 4.7,
    reviewCount: 84
  },
  {
    id: "silk-slip-dress",
    title: "Silk Slip Dress",
    price: 120.0,
    category: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    description: "A gorgeous luxury cowl-neck midi slip dress crafted from fluid silk satin. Cut on the bias for an effortlessly body-skimming drape.",
    details: [
      "100% organic mulberry silk satin",
      "Elegant cowled neckline",
      "Adjustable spaghetti straps",
      "Cut on the bias for a fluid drape",
      "Dry clean recommended"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Dusty Rose", hex: "#EAD6D3" },
      { name: "Forest Green", hex: "#1B4D3E" },
      { name: "Champagne", hex: "#FAF0E6" }
    ],
    rating: 4.9,
    reviewCount: 37,
    isNew: true
  },
  {
    id: "mens-linen-trousers",
    title: "Men's Linen Trousers",
    price: 68.0,
    category: "men",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
    description: "Tailored men's linen trousers with a subtle tapered fit. Keeps you cool, crisp, and comfortable from morning till sunset.",
    details: [
      "100% fine-gauge linen",
      "Slightly tapered fit",
      "Button closure and belt loops",
      "Breathable structural weave",
      "Garment-dyed for unique character"
    ],
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Chalk", hex: "#FAF9F6" },
      { name: "Navy Blue", hex: "#1D2D44" }
    ],
    rating: 4.6,
    reviewCount: 45
  },
  {
    id: "organic-face-oil",
    title: "Botanical Face Oil",
    price: 34.0,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    description: "An antioxidant-rich, restorative face oil designed to hydrate and brighten dull skin using squalane and wild rose hip extracts.",
    details: [
      "100% organic and cold-pressed",
      "Contains pure squalane and rosehip oil",
      "Rich in vitamins A, C, and E",
      "Fast-absorbing, non-greasy luxury formula",
      "Cruelty-free, vegan, scent-free"
    ],
    sizes: ["1oz (30ml)"],
    colors: [
      { name: "Golden Glow", hex: "#DAA520" }
    ],
    rating: 4.8,
    reviewCount: 92
  }
];

export const COUPONS: Coupon[] = [
  {
    code: "SPRING40",
    discountPercent: 40,
    description: "40% off on Selected Spring Sale Items"
  },
  {
    code: "WELCOME10",
    discountPercent: 10,
    description: "10% off for Newsletter subscribers"
  }
];

export { HERO_MODEL_IMG, LUXE_HANDBAG_IMG, SPRING_SALE_IMG };
