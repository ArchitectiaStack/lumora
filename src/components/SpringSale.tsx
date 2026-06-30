import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Coupon } from "../types";
import { COUPONS } from "../data";

interface SpringSaleProps {
  onApplyCoupon: (coupon: Coupon) => void;
  onShowToast: (message: string, type: "success" | "info") => void;
  onCartClick: () => void;
}

export default function SpringSale({ onApplyCoupon, onShowToast, onCartClick }: SpringSaleProps) {
  const handleApplySpringCoupon = () => {
    const springCoupon = COUPONS.find((c) => c.code === "SPRING40");
    if (springCoupon) {
      onApplyCoupon(springCoupon);
      onShowToast("Promo code 'SPRING40' applied! Check your cart for discounts.", "success");
      // Scroll to top and open cart drawer
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        onCartClick();
      }, 500);
    }
  };

  return (
    <section id="spring-sale-section" className="px-6 py-12 md:py-16 bg-alabaster font-sans">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-charcoal/5 diffused-shadow relative">
        
        {/* LEFT BLOCK (Forest Green, 5 columns) */}
        <div className="md:col-span-5 bg-forest text-alabaster p-8 sm:p-12 flex flex-col justify-center items-start text-left relative z-10">
          <div className="flex items-center gap-2 text-dusty-rose text-[10px] tracking-[0.2em] font-semibold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Time Offer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight mb-4">
            Spring Sale <br />
            is Live!
          </h2>

          <p className="text-xs text-alabaster/80 font-light leading-relaxed mb-8 max-w-xs">
            Enjoy up to 40% off on selected items. Our finest linen shirts, premium leather bags, and handcrafted apothecary goods.
          </p>

          {/* Dusty Rose pill button */}
          <button
            onClick={handleApplySpringCoupon}
            className="group bg-dusty-rose text-forest font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full hover:bg-dusty-rose/90 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            Explore Deals
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" strokeWidth={2} />
          </button>
        </div>

        {/* INTERSECTING FLOATING CIRCLE BADGE (Blush Pink circle) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleApplySpringCoupon}
          className="absolute left-1/2 md:left-[41.6%] top-[34%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 sm:w-36 sm:h-36 bg-dusty-rose text-forest rounded-full flex flex-col justify-center items-center text-center cursor-pointer shadow-lg hover:shadow-xl transition-all border-4 border-alabaster"
        >
          <span className="text-[9px] font-bold tracking-widest uppercase text-forest/70">Up To</span>
          <span className="font-serif text-3xl sm:text-4xl font-bold leading-none my-0.5">40%</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Off</span>
        </motion.div>

        {/* RIGHT BLOCK (Lifestyle Image flat lay, 7 columns) */}
        <div className="md:col-span-7 h-[280px] sm:h-[350px] md:h-auto relative bg-charcoal/5">
          <img
            src="https://i.postimg.cc/PxGfCzVR/Take-advantage-of-Tax-Free-Weekend-Own-your-dream-jewelry-and-skip-the-sales-tax-this-weekend-o.jpg"
            alt="Spring Sale flat lay setup"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle overlay for gradient matching */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
