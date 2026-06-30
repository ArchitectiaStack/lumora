import { useState, useEffect } from "react";
import PromoAlert from "./components/PromoAlert";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import SpringSale from "./components/SpringSale";
import NewArrivals from "./components/NewArrivals";
import Footer from "./components/Footer";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import NotificationToast, { ToastMessage } from "./components/NotificationToast";
import { Product, CartItem, Coupon } from "./types";

export default function App() {
  // --- Cart State persistent in localStorage ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("lumora_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Wishlist State persistent in localStorage ---
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("lumora_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI Layout and Filter States ---
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize with LocalStorage on State Changes
  useEffect(() => {
    localStorage.setItem("lumora_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("lumora_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // --- Notification Toast Helper ---
  const handleShowToast = (message: string, type: "success" | "info" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Cart Action Handlers ---
  const handleAddToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCart((prevCart) => {
      // Check if exact same product with exact same options is already in cart
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });

    handleShowToast(`Added ${quantity}x "${product.title}" to your cart.`, "success");
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size?: string, color?: string) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (removedItem) {
        handleShowToast(`Removed "${removedItem.product.title}" from your cart.`, "info");
      }
      return prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // --- Wishlist Handler ---
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Get total cart quantities count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans">
      {/* Top copied Promo Banner */}
      <PromoAlert onShowToast={handleShowToast} />

      {/* Main sticky Navigation Bar */}
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onProductClick={setSelectedProductForDetail}
        onShowToast={handleShowToast}
      />

      {/* Hero Header Section */}
      <Hero
        onProductClick={setSelectedProductForDetail}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlist.includes("luxe-handbag")}
        onShowToast={handleShowToast}
      />

      {/* Curated Categories Mask Grids */}
      <Categories
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Interactive Spring Sale Panel */}
      <SpringSale
        onApplyCoupon={setAppliedCoupon}
        onShowToast={handleShowToast}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Product Grid and filter modules */}
      <NewArrivals
        onProductClick={setSelectedProductForDetail}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlist={wishlist}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onShowToast={handleShowToast}
      />

      {/* Beautiful Subfooter and Newsletter signup */}
      <Footer onShowToast={handleShowToast} />

      {/* Product detail overlays */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProductForDetail ? wishlist.includes(selectedProductForDetail.id) : false}
      />

      {/* Cart side-drawer sliding panels */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onShowToast={handleShowToast}
        onClearCart={handleClearCart}
      />

      {/* Slide-in Notifications Toast alerts */}
      <NotificationToast toasts={toasts} onRemove={handleRemoveToast} />
    </div>
  );
}
