import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export interface Product {
    id: number;
    slug: string;
    category: string;
    title: string;
    price: string;
    oldPrice?: string;
    image: string;
    discount?: string;
    badge?: string;
}

interface ProductCardProps {
    product: Product;
    showBadge?: boolean;
    backgroundColor?: string;
}

export default function ProductCard({
    product,
    showBadge = true,
    backgroundColor = "bg-white"
}: ProductCardProps) {
    const discountBadge = product.discount || product.badge;

    return (
        <div className={`${backgroundColor} rounded-lg overflow-hidden w-full max-w-xs mx-auto`}>
            {/* Image Section */}
            <div className="relative bg-gray-100 aspect-square flex items-center justify-center p-8">
                <Link href={`/product/${encodeURIComponent(product.slug)}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                    />
                </Link>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Category */}
                <p className="text-gray-500 text-xs mb-1">
                    {product.category}
                </p>

                {/* Title */}
                <Link href={`/product/${encodeURIComponent(product.slug)}`}>
                    <h3 className="text-gray-900 text-base font-semibold mb-3 hover:text-green-700 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-900 text-lg font-bold">
                        {product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="text-gray-400 text-sm line-through">
                            {product.oldPrice}
                        </span>
                    )}
                    {showBadge && discountBadge && (
                        <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-0.5 rounded-full">
                            {discountBadge}
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    <Link href={`/product/${encodeURIComponent(product.slug)}`} className="flex-1">
                        <button className="w-full bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2">
                            Add to Cart
                            <span className="text-lg">+</span>
                        </button>
                    </Link>
                    <button className="w-11 h-11 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 rounded-full flex items-center justify-center transition-colors">
                        <Heart className="w-5 h-5" fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
}