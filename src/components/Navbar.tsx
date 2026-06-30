import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  wishlistCount: number;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  onProductClick: (product: Product) => void;
  onShowToast: (message: string, type: "success" | "info") => void;
}

export default function Navbar({
  onCartClick,
  cartCount,
  wishlistCount,
  onSelectCategory,
  selectedCategory,
  onProductClick,
  onShowToast,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter products based on search
  const filteredSuggestions = searchQuery.trim()
    ? PRODUCTS.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (product: Product) => {
    onProductClick(product);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { name: "Shop", categoryId: "all" },
    { name: "Collections", categoryId: "women" },
    { name: "New Arrivals", categoryId: "new-arrivals" },
    { name: "Deals", categoryId: "deals" },
    { name: "About", categoryId: "about" },
  ];

  const handleNavClick = (categoryId: string) => {
    if (categoryId === "new-arrivals") {
      onSelectCategory("all");
      const el = document.getElementById("new-arrivals");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (categoryId === "deals") {
      onSelectCategory("all");
      const el = document.getElementById("spring-sale-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (categoryId === "about") {
      const el = document.getElementById("footer-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      onSelectCategory(categoryId);
      const el = document.getElementById("categories-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-alabaster/95 backdrop-blur-md border-b border-charcoal/5 px-6 py-4 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-charcoal p-1.5 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Elegant Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            {/* Minimalist modern brand flower logo */}
            <div className="text-forest transition-transform group-hover:rotate-45 duration-700">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12,2A3,3 0 0,0 9,5A3,3 0 0,0 9.18,6.13C8.42,5.74 7.42,5.74 6.66,6.13A3,3 0 0,0 5,9A3,3 0 0,0 6.13,11.18C5.74,11.94 5.74,12.94 6.13,13.7C5.35,14.46 5.35,15.71 6.13,16.47A3,3 0 0,0 9,19A3,3 0 0,0 11.18,17.87C11.94,18.26 12.94,18.26 13.7,17.87A3,3 0 0,0 15,21A3,3 0 0,0 17.87,19.18C18.26,18.42 18.26,17.42 17.87,16.66A3,3 0 0,0 19,15A3,3 0 0,0 17.87,12.82C18.26,12.06 18.26,11.06 17.87,10.3C18.65,9.54 18.65,8.29 17.87,7.53A3,3 0 0,0 15,5A3,3 0 0,0 12.82,6.13C12.06,5.74 11.06,5.74 10.3,6.13A3,3 0 0,0 12,2Z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-semibold tracking-[0.15em] text-charcoal transition-colors hover:text-forest">
              LUMORA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.categoryId)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all py-1.5 relative cursor-pointer hover:text-forest ${
                  selectedCategory === link.categoryId
                    ? "text-forest font-semibold border-b border-forest"
                    : "text-charcoal/70"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-charcoal">
            {/* Search Toggle Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer hover:text-forest"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Profile Dropdown / Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer hover:text-forest"
                title="Your Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-alabaster rounded-2xl border border-charcoal/10 diffused-shadow p-4 z-20 font-sans text-xs flex flex-col gap-3">
                    <div className="border-b border-charcoal/5 pb-2">
                      <p className="font-semibold text-charcoal">Atelier Club Member</p>
                      <p className="text-[10px] text-charcoal/40 mt-0.5">twinstwins350@gmail.com</p>
                    </div>
                    <div className="space-y-1 text-charcoal/70">
                      <p className="p-1.5 hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer font-medium">Your Profile</p>
                      <p className="p-1.5 hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer font-medium">Atelier Orders</p>
                      <p className="p-1.5 hover:bg-charcoal/5 rounded-lg transition-colors cursor-pointer font-medium" onClick={() => {
                        onShowToast("You are logged in to the Lumora Atelier Club.", "info");
                        setIsProfileOpen(false);
                      }}>Account Settings</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Wishlist Counter */}
            <button
              onClick={() => {
                const el = document.getElementById("new-arrivals");
                el?.scrollIntoView({ behavior: "smooth" });
                onShowToast(`Filter shows your ${wishlistCount} saved items.`, "info");
              }}
              className="p-2 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer hover:text-forest relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-dusty-rose text-forest border border-forest/10 text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Counter */}
            <button
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer hover:text-forest relative"
              title="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-forest text-alabaster text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden font-sans">
          <div
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="fixed top-20 left-4 right-4 bg-alabaster rounded-3xl p-6 border border-charcoal/10 diffused-shadow flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.categoryId)}
                className="text-left py-2 px-3 hover:bg-charcoal/5 rounded-xl font-medium tracking-wide text-sm text-charcoal/80 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-charcoal/40" />
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 font-sans">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="relative bg-alabaster w-full max-w-2xl rounded-3xl diffused-shadow border border-charcoal/10 overflow-hidden mt-12 sm:mt-16 z-10 flex flex-col max-h-[70vh]">
            {/* Input Bar */}
            <div className="p-5 border-b border-charcoal/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, or categories..."
                className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/30 outline-none font-medium text-sm border-none focus:ring-0 p-0"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-charcoal/60 hover:text-charcoal bg-charcoal/5 p-1.5 rounded-full transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search suggestions & results list */}
            <div className="flex-1 overflow-y-auto p-5">
              {searchQuery.trim() === "" ? (
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/40 mb-3">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Luxe Handbag", "Linen", "Scented Candle", "Gold Hoops", "Sneakers"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="bg-charcoal/5 hover:bg-forest hover:text-alabaster transition-all rounded-full py-2 px-4 text-xs font-medium cursor-pointer text-charcoal/80"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredSuggestions.length === 0 ? (
                <div className="py-12 text-center text-charcoal/60">
                  <X className="w-8 h-8 text-charcoal/20 mx-auto mb-2" />
                  <p className="font-serif text-base font-medium">No matches found</p>
                  <p className="text-xs text-charcoal/40 mt-1">
                    Try searching for "handbag", "linen", or "gold".
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/40">
                    Search Results ({filteredSuggestions.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredSuggestions.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchItemClick(product)}
                        className="flex items-center gap-3 p-2 bg-white hover:bg-forest/5 rounded-2xl border border-charcoal/5 cursor-pointer transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs font-semibold text-charcoal">{product.title}</p>
                          <p className="text-[10px] text-charcoal/40 uppercase tracking-widest mt-0.5">
                            {product.category.replace("-", " & ")}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-forest">${product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
