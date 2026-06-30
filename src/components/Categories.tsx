import { CATEGORIES } from "../data";

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export default function Categories({ onSelectCategory, selectedCategory }: CategoriesProps) {
  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const el = document.getElementById("new-arrivals");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories-section" className="px-6 py-12 md:py-16 bg-alabaster font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/5 diffused-shadow">
        
        {/* Header bar */}
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
            Shop by Category
          </h2>
          <button
            onClick={() => handleCategoryClick("all")}
            className="group text-xs font-semibold tracking-wider uppercase text-charcoal/70 hover:text-forest transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Browse all
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* 5-Column Grid with Circular Image Masks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-center">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center group text-center cursor-pointer focus:outline-none"
              >
                {/* Circular image mask */}
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-2 transition-all duration-500 scale-100 group-hover:scale-105 group-hover:shadow-md ${
                    isActive ? "border-forest ring-4 ring-forest/10" : "border-transparent"
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Information */}
                <span className="text-sm font-sans font-semibold text-charcoal group-hover:text-forest transition-colors uppercase tracking-wider">
                  {category.name}
                </span>
                <span className="text-[10px] text-charcoal/50 font-medium mt-1">
                  {category.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
