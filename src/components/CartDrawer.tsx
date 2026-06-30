import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Tag, ShoppingBag, ArrowRight, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { CartItem, Coupon } from "../types";
import { COUPONS } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onShowToast: (message: string, type: "success" | "info") => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onShowToast,
  onClearCart,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free shipping threshold
  const freeShippingLimit = 50;
  const isFreeShipping = subtotal >= freeShippingLimit;
  const shippingCost = subtotal > 0 && !isFreeShipping ? 9.99 : 0;

  // Coupon discount amount
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = subtotal * (discountPercent / 100);

  // Total amount
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyCouponInput = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    if (!couponCode.trim()) return;

    const matchedCoupon = COUPONS.find(
      (c) => c.code.toUpperCase() === couponCode.trim().toUpperCase()
    );

    if (matchedCoupon) {
      onApplyCoupon(matchedCoupon);
      onShowToast(`Coupon code "${matchedCoupon.code}" applied successfully!`, "success");
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try 'SPRING40' or 'WELCOME10'.");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment and packaging loading
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onShowToast("Order placed successfully!", "success");
    }, 2000);
  };

  const handleResetCheckout = () => {
    setCheckoutComplete(false);
    onClearCart();
    onApplyCoupon(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backer overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-alabaster flex flex-col h-full shadow-2xl relative border-l border-charcoal/10"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-charcoal/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-forest" strokeWidth={1.5} />
                  <h2 className="text-lg font-serif font-semibold text-charcoal">
                    Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-charcoal hover:text-charcoal/60 p-1.5 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Checkout Complete Overlay Screens */}
              {checkoutComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col justify-center items-center p-8 text-center bg-alabaster"
                >
                  <div className="bg-forest/10 p-5 rounded-full mb-6">
                    <Sparkles className="w-12 h-12 text-forest" strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif text-charcoal font-medium mb-3">
                    Thank You For Your Order
                  </h3>
                  <p className="text-sm text-charcoal/70 mb-6 leading-relaxed">
                    Your order has been verified and is being prepared with care in our design atelier. A confirmation receipt has been sent to your email.
                  </p>

                  {/* Curated receipt list */}
                  <div className="w-full bg-white rounded-2xl p-5 border border-charcoal/10 shadow-sm text-left text-xs text-charcoal/70 font-light space-y-2 mb-8">
                    <div className="border-b border-charcoal/10 pb-2 mb-2 flex justify-between font-semibold font-sans text-charcoal">
                      <span>Order Summary</span>
                      <span className="text-forest">#LUM-74291</span>
                    </div>
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between font-sans">
                        <span>
                          {item.product.title} (x{item.quantity})
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    {appliedCoupon && (
                      <div className="flex justify-between text-forest font-semibold">
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{isFreeShipping ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-charcoal/10 pt-2 font-semibold text-charcoal flex justify-between text-sm">
                      <span>Total Paid</span>
                      <span className="text-forest">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetCheckout}
                    className="w-full bg-forest text-alabaster font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full hover:bg-forest/95 transition-all cursor-pointer shadow-md"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Cart List */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {/* Free shipping banner */}
                    {cartItems.length > 0 && (
                      <div className="bg-forest/5 text-forest rounded-2xl p-3.5 mb-5 flex items-center gap-3 text-xs">
                        <Sparkles className="w-4.5 h-4.5 shrink-0" strokeWidth={1.5} />
                        <div>
                          {isFreeShipping ? (
                            <span className="font-semibold">Congratulations! You've unlocked free delivery.</span>
                          ) : (
                            <span>
                              Add <strong className="font-semibold">${(freeShippingLimit - subtotal).toFixed(2)}</strong> more to get <strong>Free Shipping</strong>.
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center opacity-70">
                        <ShoppingBag className="w-12 h-12 text-charcoal/20 mb-4" strokeWidth={1} />
                        <h3 className="font-serif text-lg font-medium text-charcoal mb-1">
                          Your cart is empty
                        </h3>
                        <p className="text-xs text-charcoal/60 max-w-[200px]">
                          Fill it with lovely handcrafted items from our collection.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item, idx) => {
                          const key = `${item.product.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`;
                          return (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex gap-4 p-3 bg-white rounded-2xl border border-charcoal/5 shadow-sm hover:border-charcoal/10 transition-all"
                            >
                              {/* Product Thumbnail */}
                              <div className="w-20 h-20 bg-charcoal/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                                <img
                                  src={item.product.image}
                                  alt={item.product.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-sans font-semibold text-charcoal">
                                      {item.product.title}
                                    </h4>
                                    <button
                                      onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                                      className="text-charcoal/40 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                    </button>
                                  </div>

                                  {/* Custom Options Selected */}
                                  <div className="flex flex-wrap gap-2 text-[10px] text-charcoal/50 uppercase font-medium tracking-wider mt-1">
                                    {item.selectedColor && (
                                      <span className="bg-charcoal/5 py-0.5 px-1.5 rounded-md">
                                        Color: {item.selectedColor}
                                      </span>
                                    )}
                                    {item.selectedSize && (
                                      <span className="bg-charcoal/5 py-0.5 px-1.5 rounded-md">
                                        Size: {item.selectedSize}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex justify-between items-end mt-2">
                                  {/* Quantity adjusters */}
                                  <div className="flex items-center gap-2 border border-charcoal/10 rounded-full p-0.5 bg-alabaster">
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedSize, item.selectedColor)}
                                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-charcoal/10 transition-colors font-bold cursor-pointer text-charcoal/60"
                                    >
                                      -
                                    </button>
                                    <span className="text-xs font-semibold w-4 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-charcoal/10 transition-colors font-bold cursor-pointer text-charcoal/60"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <div className="text-sm font-semibold font-sans text-charcoal">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Summary / Coupon / Checkout Footer */}
                  {cartItems.length > 0 && (
                    <div className="px-6 py-5 border-t border-charcoal/10 bg-white/70 backdrop-blur-md">
                      {/* Interactive Coupon Code Form */}
                      <form onSubmit={handleApplyCouponInput} className="mb-4">
                        <label className="block text-[10px] tracking-wider uppercase font-semibold text-charcoal/50 mb-1.5">
                          Promo / Discount Code
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="w-4 h-4 text-charcoal/30 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="e.g. SPRING40, WELCOME10"
                              className="w-full bg-alabaster border border-charcoal/10 hover:border-charcoal/20 focus:border-forest text-xs rounded-full py-2.5 pl-9 pr-4 outline-none transition-all placeholder:text-charcoal/35 text-charcoal font-medium font-sans"
                            />
                          </div>
                          <button
                            type="submit"
                            className="bg-forest text-alabaster text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full hover:bg-forest/90 transition-all cursor-pointer shadow-sm shrink-0"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                            <AlertCircle className="w-3 h-3" />
                            {couponError}
                          </p>
                        )}
                        {appliedCoupon && (
                          <div className="flex items-center justify-between bg-forest/5 border border-forest/15 rounded-xl p-2.5 mt-2 text-[11px] text-forest font-medium">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-forest animate-pulse" />
                              <span>
                                Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                onApplyCoupon(null);
                                onShowToast("Coupon removed", "info");
                              }}
                              className="text-red-500 hover:text-red-700 transition-colors font-bold cursor-pointer text-xs uppercase"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </form>

                      {/* Recalculating Calculations Summary */}
                      <div className="space-y-2 border-b border-charcoal/5 pb-4 mb-4 text-xs text-charcoal/70 font-medium font-sans">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="text-charcoal font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-forest">
                            <span>Discount ({appliedCoupon.code} -{appliedCoupon.discountPercent}%)</span>
                            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Est. Shipping</span>
                          <span>{isFreeShipping ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm text-charcoal font-semibold pt-2 border-t border-charcoal/5">
                          <span>Grand Total</span>
                          <span className="text-lg text-forest font-bold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Trust info */}
                      <div className="flex items-center gap-1.5 text-[10px] text-charcoal/40 justify-center mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Checkout is fully encrypted and secure.</span>
                      </div>

                      {/* Checkout Submit Trigger */}
                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-forest text-alabaster font-semibold text-xs uppercase tracking-widest py-4 px-6 rounded-full hover:bg-forest/95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-forest/70 disabled:cursor-not-allowed"
                      >
                        {isCheckingOut ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing Atelier Order...
                          </div>
                        ) : (
                          <>
                            Checkout Securely
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
