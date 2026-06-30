import { useState, MouseEvent } from "react";
import { Heart, ShoppingBag, Eye, Star, SlidersHorizontal } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface NewArrivalsProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onShowToast: (message: string, type: "success" | "info") => void;
}

export default function NewArrivals({
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  selectedCategory,
  onSelectCategory,
  onShowToast,
}: NewArrivalsProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "sale">("all");

  // Filter products by category AND visual filter tab
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Tab match
    if (activeFilter === "new") {
      return matchesCategory && product.isNew;
    }
    if (activeFilter === "sale") {
      return matchesCategory && product.originalPrice !== undefined;
    }
    return matchesCategory;
  });

  const handleQuickAdd = (e: MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || "";
    const defaultColor = product.colors?.[0]?.name || "";
    onAddToCart(product, 1, defaultSize, defaultColor);
    onShowToast(`Added "${product.title}" to cart!`, "success");
  };

  const handleWishlistToggle = (e: MouseEvent, productId: string) => {
    e.stopPropagation();
    onToggleWishlist(productId);
    const isSaved = wishlist.includes(productId);
    onShowToast(
      isSaved ? "Removed from wishlist" : "Saved product to wishlist!",
      "success"
    );
  };

  return (
    <section id="new-arrivals" className="px-6 py-12 md:py-16 bg-alabaster font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Title bar */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-charcoal/10 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              {selectedCategory === "all" ? "New Arrivals" : `${selectedCategory.replace("-", " & ")} Collection`}
            </h2>
            <p className="text-xs text-charcoal/50 tracking-wider uppercase font-medium mt-1">
              Curated items handcrafted for effortless elegance
            </p>
          </div>

          {/* Visual sub filters */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveFilter("all")}
              className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeFilter === "all" ? "bg-forest text-alabaster shadow-sm" : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("new")}
              className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeFilter === "new" ? "bg-forest text-alabaster shadow-sm" : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              New In
            </button>
            <button
              onClick={() => setActiveFilter("sale")}
              className={`py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeFilter === "sale" ? "bg-forest text-alabaster shadow-sm" : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Atelier Sale
            </button>
          </div>
        </div>

        {/* Dynamic Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-charcoal/5 diffused-shadow max-w-md mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-charcoal/20 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-medium text-charcoal mb-1">
              No matching items
            </h3>
            <p className="text-xs text-charcoal/50 leading-relaxed">
              No items fit your specific filters. Clear your category or search to see all.
            </p>
            <button
              onClick={() => {
                onSelectCategory("all");
                setActiveFilter("all");
              }}
              className="mt-5 bg-forest text-alabaster text-xs font-semibold uppercase tracking-widest py-2.5 px-5 rounded-full hover:bg-forest/90 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm hover:border-charcoal/10 hover:shadow-md transition-all duration-300 relative cursor-pointer"
                >
                  {/* Image area */}
                  <div className="relative bg-charcoal/5 aspect-square overflow-hidden flex items-center justify-center">
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, product.id)}
                      className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                        isSaved
                          ? "bg-dusty-rose text-forest scale-105"
                          : "bg-white/80 text-charcoal/60 hover:text-forest hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-forest text-forest" : ""}`} strokeWidth={1.5} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Quick Labels (New / Discount) */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                      {product.isNew && (
                        <span className="bg-forest text-white text-[9px] tracking-wider uppercase font-semibold py-0.5 px-2 rounded-md shadow-sm">
                          New
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-dusty-rose text-forest text-[9px] tracking-wider uppercase font-semibold py-0.5 px-2 rounded-md shadow-sm">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Action overlay on Hover for desktop */}
                    <div className="absolute inset-0 bg-charcoal/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="bg-forest text-alabaster text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-full hover:bg-forest/90 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Details area below */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Swatch color dots preview */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex gap-1.5 mb-2.5">
                          {product.colors.map((color) => (
                            <span
                              key={color.name}
                              className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      )}

                      <h3 className="text-xs sm:text-sm font-semibold text-charcoal group-hover:text-forest transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      
                      {/* Small category / rating */}
                      <div className="flex items-center gap-1.5 text-[10px] text-charcoal/40 uppercase tracking-widest mt-0.5 font-medium">
                        <span>{product.category.replace("-", " & ")}</span>
                        <span>•</span>
                        <div className="flex items-center text-amber-500 font-sans font-bold">
                          <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                          {product.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mt-3 pt-2.5 border-t border-charcoal/5">
                      <span className="text-sm font-semibold text-charcoal">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-charcoal/40 line-through font-light">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
