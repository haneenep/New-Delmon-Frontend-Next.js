import React from "react";

const BrandsSection = () => {
  const brands = [
    {
      name: "Brand 1",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 2",
      logo: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 3",
      logo: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 4",
      logo: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 5",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 6",
      logo: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 7",
      logo: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=200&fit=crop",
    },
    {
      name: "Brand 8",
      logo: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    },
  ];

  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {brands.map((brand, idx) => (
            <img
              key={idx}
              src={brand.logo}
              alt={brand.name}
              className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
