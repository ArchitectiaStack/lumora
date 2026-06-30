import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, ChevronRight, Heart, ShoppingBag, Shield, RotateCcw } from "lucide-react";
import { Product } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "shipping">("details");

  const colorHex = product.colors?.find((c) => c.name === selectedColor)?.hex || "";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-alabaster w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl diffused-shadow flex flex-col md:flex-row z-10 font-sans"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 bg-alabaster/80 backdrop-blur-md p-2 rounded-full hover:bg-alabaster transition-all cursor-pointer text-charcoal shadow-sm"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Left Side: Product Image & Backdrop Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-charcoal/5 relative">
            {/* Elegant Background Decoration */}
            <div className="absolute top-6 left-6 text-[10px] font-sans tracking-widest text-charcoal/40 uppercase">
              LUMORA CURATED / {product.category}
            </div>

            <div className="w-full h-[320px] md:h-[450px] relative rounded-2xl overflow-hidden shadow-sm flex items-center justify-center bg-white">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-forest text-alabaster text-[10px] tracking-widest font-sans font-semibold uppercase py-1 px-3 rounded-full">
                  New In
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Product Customization & Checkout */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Categories / Meta */}
              <div className="flex items-center gap-1.5 text-xs tracking-widest text-charcoal/60 uppercase font-medium mb-2">
                <span>{product.category.replace("-", " & ")}</span>
                <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                <span className="text-forest">Detail</span>
              </div>

              {/* Title & Price */}
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-tight mb-2">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xl font-sans font-semibold text-charcoal">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-sans text-charcoal/40 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-charcoal/10">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.floor(product.rating) ? "text-amber-500" : "text-charcoal/15"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans text-charcoal/70 font-semibold">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-charcoal/40 font-medium">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-charcoal/80 leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Colors Swatches Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-sans font-semibold tracking-wider text-charcoal uppercase">
                      Color: <span className="font-normal text-charcoal/70">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative group cursor-pointer ${
                          selectedColor === color.name ? "border-forest scale-110" : "border-transparent hover:border-charcoal/30"
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full block shadow-inner border border-black/5"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-sans font-semibold tracking-wider text-charcoal uppercase">
                      Size: <span className="font-normal text-charcoal/70">{selectedSize}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 rounded-full border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-charcoal text-alabaster border-charcoal scale-105"
                            : "bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs for detailed description / shipping */}
              <div className="mb-6">
                <div className="flex border-b border-charcoal/10 gap-6 text-xs font-semibold uppercase tracking-wider mb-3">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === "details" ? "border-forest text-forest" : "border-transparent text-charcoal/40 hover:text-charcoal"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === "shipping" ? "border-forest text-forest" : "border-transparent text-charcoal/40 hover:text-charcoal"
                    }`}
                  >
                    Care & Shipping
                  </button>
                </div>
                {activeTab === "details" ? (
                  <ul className="space-y-1.5 text-xs text-charcoal/80 font-light leading-relaxed list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="marker:text-forest">
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-charcoal/80 font-light space-y-2.5 leading-relaxed">
                    <div className="flex items-center gap-2 text-forest font-semibold">
                      <Shield className="w-4 h-4" strokeWidth={1.5} />
                      <span>Complimentary Shipping</span>
                    </div>
                    <p>Free standard delivery on orders above $50. Arrives beautifully gift-wrapped in reusable dust bags within 3-5 business days.</p>
                    <div className="flex items-center gap-2 text-forest font-semibold">
                      <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                      <span>Hassle-free Returns</span>
                    </div>
                    <p>Enjoy returns or exchanges within 30 days of receiving your item. Simply print the prepaid label included.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity and Add to Cart */}
            <div className="mt-4 pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-charcoal/25 rounded-full p-1 max-w-[120px] w-full bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer font-semibold"
                >
                  -
                </button>
                <span className="text-sm font-semibold font-sans w-6 text-center text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors cursor-pointer font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity, selectedSize, selectedColor);
                  onClose();
                }}
                className="flex-1 bg-forest text-alabaster font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full hover:bg-forest/95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-forest/10"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  isWishlisted
                    ? "bg-dusty-rose border-dusty-rose text-forest scale-105"
                    : "bg-transparent border-charcoal/20 text-charcoal hover:border-charcoal hover:scale-105"
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-forest" : ""}`} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
