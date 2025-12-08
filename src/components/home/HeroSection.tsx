"use client";

import { homeApi } from "@/src/service/homeApi";
import React, { useEffect, useState } from "react";

type Banner = {
  id: number;
  slider_title: string;
  short_title: string;
  slider_image: string;
};

const HeroSection = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const IMAGE_BASE = "https://palegoldenrod-wombat-569197.hostingersite.com/";
  useEffect(() => {
    async function getBanners() {
      try {
        const res = await homeApi.getBanners();
        console.log(res, "home apii");
        setBanners(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getBanners();
  }, []);
  if (!banners.length) {
    return (
      <section className="bg-gray-50 py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="animate-pulse h-72 bg-gray-200 rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-4 md:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            {banners.slice(0, 2).map((banner) => (
              <div
                key={banner.id}
                className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-48 md:h-[280px] flex items-center justify-between px-6 md:px-12"
              >
                <div className="z-10">
                  <p className="text-gray-700 text-sm md:text-lg font-medium mb-1 md:mb-2">
                    Offer
                  </p>
                  <h2 className="text-black text-2xl md:text-4xl font-bold">
                    {banner.slider_title || "Collection"}
                  </h2>
                </div>

                <img
                  src={`${IMAGE_BASE}${banner.slider_image}`}
                  alt="Banner"
                  className="w-40 md:w-72 h-32 md:h-48 object-contain absolute right-4 md:right-8"
                />
              </div>
            ))}
          </div>
          {banners[2] && (
            <div className="relative bg-gradient-to-br from-teal-300 to-teal-400 rounded-lg h-96 md:h-full flex items-center justify-between px-6 md:px-12 overflow-hidden">
              <div className="z-10 max-w-md">
                <p className="text-gray-800 text-base md:text-xl font-medium mb-2">
                  Special Offer
                </p>
                <h2 className="text-black text-3xl md:text-5xl font-bold mb-6">
                  {banners[2].slider_title || "Reading Day"}
                </h2>
                <button className="px-6 py-3 border-2 border-black rounded">
                  Shop Now
                </button>
              </div>

              <img
                src={`${IMAGE_BASE}${banners[2].slider_image}`}
                className="absolute right-0 bottom-0 h-full w-1/2 object-cover hidden md:block"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
