import { motion } from "motion/react";
import { ArrowRight, Star, Heart, Plus, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface HeroProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onShowToast: (message: string, type: "success" | "info") => void;
}

export default function Hero({
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onShowToast,
}: HeroProps) {
  // Retrieve the Luxe Handbag from our data
  const luxeHandbag = PRODUCTS.find((p) => p.id === "luxe-handbag") || PRODUCTS[0];

  const handleHeroCTA = () => {
    const el = document.getElementById("new-arrivals");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-6 py-12 md:py-16 overflow-hidden bg-alabaster font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
        
        {/* LEFT 40%: TEXT CONTENT */}
        <div className="md:col-span-5 flex flex-col justify-center text-left z-10">
          {/* Subtle leaves drawing placeholder / brand subtitle */}
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/50 mb-4 inline-block">
            New Season Collection
          </span>

          {/* H1 Main Heading: High Contrast Elegant Serif */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-charcoal leading-[1.1] mb-6 tracking-tight">
            Live Beautifully. <br />
            <span className="italic font-normal text-forest">Shop Effortlessly.</span>
          </h1>

          <p className="text-sm text-charcoal/70 leading-relaxed font-light mb-8 max-w-sm">
            Curated styles, premium organic quality you love, and tailored materials delivered directly to your door.
          </p>

          {/* Shop Now Button */}
          <div className="mb-12">
            <button
              onClick={handleHeroCTA}
              className="group bg-forest hover:bg-forest/95 hover:scale-105 text-alabaster font-semibold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-lg shadow-forest/15"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" strokeWidth={2} />
            </button>
          </div>

          {/* Trust / Core Features Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-charcoal/10">
            {/* Free Shipping */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-dusty-rose/40 flex items-center justify-center text-forest mb-2.5 shadow-sm">
                <Truck className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>
              <h4 className="text-[11px] font-bold text-charcoal tracking-wide uppercase">
                Free Shipping
              </h4>
              <p className="text-[9px] text-charcoal/55 font-light leading-tight mt-0.5">
                On orders over $50
              </p>
            </div>

            {/* Secure Payment */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-dusty-rose/40 flex items-center justify-center text-forest mb-2.5 shadow-sm">
                <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>
              <h4 className="text-[11px] font-bold text-charcoal tracking-wide uppercase">
                Secure Payment
              </h4>
              <p className="text-[9px] text-charcoal/55 font-light leading-tight mt-0.5">
                100% protected
              </p>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-dusty-rose/40 flex items-center justify-center text-forest mb-2.5 shadow-sm">
                <RefreshCw className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>
              <h4 className="text-[11px] font-bold text-charcoal tracking-wide uppercase">
                Easy Returns
              </h4>
              <p className="text-[9px] text-charcoal/55 font-light leading-tight mt-0.5">
                30-day return
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT 60%: LIFESTYLE IMAGE & PORTRAIT OVERLAY */}
        <div className="md:col-span-7 relative flex justify-center md:justify-end items-center py-6 sm:py-10">
          
          {/* Circular pinkish background exactly like the picture */}
          <div className="absolute top-1/2 left-1/2 md:left-[55%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[360px] sm:w-[420px] sm:h-[520px] rounded-t-[180px] bg-dusty-rose/40 z-0" />

          {/* Model Main Photo */}
          <div className="relative z-10 w-[260px] h-[340px] sm:w-[380px] sm:h-[480px] rounded-t-[160px] overflow-hidden shadow-md border-4 border-alabaster">
            <img
              src="https://i.postimg.cc/521wCLT4/download-(6).jpg"
              alt="Lumora Spring Sage Dress Model"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-102 hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>

          {/* FLOATING "LUXE HANDBAG" CARD: Creating beautiful Z-index depth */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-4 right-0 sm:right-6 md:-left-12 lg:left-0 xl:left-8 z-25 bg-white rounded-3xl p-4 sm:p-5 w-[200px] sm:w-[240px] diffused-shadow border border-charcoal/5 flex flex-col gap-3 font-sans"
          >
            {/* Wishlist Icon */}
            <button
              onClick={() => {
                onToggleWishlist(luxeHandbag.id);
                onShowToast(
                  isWishlisted ? "Removed bag from wishlist" : "Saved Luxe Handbag to wishlist!",
                  "success"
                );
              }}
              className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-full bg-white/95 text-charcoal hover:text-forest transition-colors shadow-sm cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-forest text-forest" : ""}`} strokeWidth={1.5} />
            </button>

            {/* Product Thumbnail inside floating card */}
            <div
              className="bg-alabaster rounded-2xl overflow-hidden h-32 sm:h-36 flex items-center justify-center cursor-pointer"
              onClick={() => onProductClick(luxeHandbag)}
            >
              <img
                src= "https://i.postimg.cc/SxyMsqYX/download-(7).jpg"
                alt="Floating Luxe Handbag"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating content */}
            <div className="text-left">
              <h4
                className="text-xs sm:text-sm font-semibold text-charcoal hover:text-forest transition-colors cursor-pointer"
                onClick={() => onProductClick(luxeHandbag)}
              >
                Luxe Handbag
              </h4>
              <p className="text-xs font-semibold text-forest mt-0.5">
                ${luxeHandbag.price.toFixed(2)}
              </p>
            </div>

            {/* Dot Carousels Simulation */}
            <div className="flex gap-1 justify-center py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-forest" />
              <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
            </div>

            {/* Checkout & Quick Add */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onAddToCart(luxeHandbag, 1, "One Size", "Oatmeal Beige");
                  onShowToast("Luxe Handbag added to your shopping cart!", "success");
                }}
                className="flex-1 bg-forest text-alabaster text-[10px] font-bold uppercase tracking-wider py-2 px-3 rounded-full hover:bg-forest/90 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onProductClick(luxeHandbag)}
                className="bg-alabaster hover:bg-charcoal/5 p-2 rounded-full transition-all text-charcoal border border-charcoal/10 cursor-pointer"
                title="Quick View details"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
