import React from "react";
import { Heart, Scale, Eye } from "lucide-react";

export const products = [
  {
    id: 1,
    category: "Laminators",
    title: "Lorem Ipsum History Dolor Immet Kun Book Seven",
    price: "AED544.00",
    oldPrice: "AED800.00",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    badge: "28% Off",
  },
  {
    id: 2,
    category: "Laminators",
    title: "Dolor Immet Kun Book Seven Kun Book Lorem",
    price: "AED544.00",
    oldPrice: "AED800.00",
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=400",
    badge: "28% Off",
  },
  {
    id: 3,
    category: "Laminators",
    title: "Immet Kun Book Seven Kun Book Lorem Ipsum",
    price: "AED544.00",
    oldPrice: "AED800.00",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400",
    badge: "28% Off",
  },
  {
    id: 4,
    category: "Laminators",
    title: "Kun Book Seven Kun Book Lorem Ipsum History",
    price: "AED544.00",
    oldPrice: "AED800.00",
    image: "https://images.unsplash.com/photo-1513705153412-e7e8faa06a78?w=400",
    badge: "28% Off",
  },
];
const ProductsGrid = () => {
  return (
    <section className="py-6 md:py-12 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden group"
            >
              <div className="relative bg-gray-100 h-48 md:h-64 flex items-center justify-center p-4 md:p-6">
                {product.badge && (
                  <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-green-700 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-green-700 hover:text-white z-10">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 md:p-4">
                <p className="text-gray-500 text-xs font-medium mb-1 md:mb-2">
                  {product.category}
                </p>
                <h3 className="text-gray-900 text-sm font-normal mb-2 md:mb-3 line-clamp-2 min-h-[36px] md:min-h-[40px]">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <p className="text-gray-900 text-base md:text-lg font-semibold">
                    {product.price}
                  </p>
                  {product.oldPrice && (
                    <p className="text-gray-400 text-xs md:text-sm line-through">
                      {product.oldPrice}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-[#0d6838] text-white text-xs md:text-sm font-medium py-2 md:py-2.5 rounded hover:bg-green-800">
                    Add To Cart
                  </button>
                  <button className="w-9 h-9 md:w-10 md:h-10 bg-white border border-gray-300 rounded flex items-center justify-center hover:border-green-700 hover:text-green-700">
                    <Scale className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <button className="w-9 h-9 md:w-10 md:h-10 bg-white border border-gray-300 rounded flex items-center justify-center hover:border-green-700 hover:text-green-700">
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
