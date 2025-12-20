import React from "react";

const FEATURES = [
    {
        title: "Best prices",
        description: "Orders AED50 or more",
        bgColor: "bg-lime-200",
    },
    {
        title: "Free delivery",
        description: "24/7 amazing services",
        bgColor: "bg-blue-200",
    },
    {
        title: "Great daily deal",
        description: "When you sign up",
        bgColor: "bg-green-200",
    },
    {
        title: "Wide assortment",
        description: "Mega discounts",
        bgColor: "bg-pink-200",
    },
    {
        title: "Easy returns",
        description: "Within 7 days",
        bgColor: "bg-gray-200",
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.bgColor} rounded-lg p-6 text-center relative group hover:shadow-md transition-shadow`}
                        >
                            {/* Circle Icon Placeholder */}
                            <div className="w-12 h-12 bg-white rounded-full mx-auto -mt-10 mb-4 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                {/* You can add icons here later based on the title */}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
