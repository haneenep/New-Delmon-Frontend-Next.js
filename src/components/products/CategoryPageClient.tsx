"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import ProductCard, { Product } from "../common/ProductCard";
import Pagination from "../common/Pagination";
import { homeApi } from "../../service/homeApi";


interface CategoryPageClientProps {
    slug: string;
}

const CategoryPageClient = ({ slug }: CategoryPageClientProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await homeApi.getPaginatedProducts(currentPage, 12, { category: slug });
                if (res.success && res.data?.products?.data) {
                    setLastPage(res.data.products.last_page);
                    const mapped = mapProducts(res.data.products.data);
                    setProducts(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchProducts();
    }, [slug, currentPage]);

    useEffect(() => {
        const fetchGlobalNew = async () => {
            try {
                const res = await homeApi.getPaginatedProducts(1, 4, { new_product: 1 });
                if (res.success && res.data?.products?.data) {
                    setNewProducts(mapProducts(res.data.products.data));
                }
            } catch (e) { }
        };
        fetchGlobalNew();
    }, []);


    const mapProducts = (data: any[]): Product[] => {
        return data.map((item: any) => {
            let finalPrice = item.selling_price;
            let oldPrice = undefined;
            let badge = undefined;

            if (item.discount_price) {
                finalPrice = item.discount_price;
                oldPrice = item.selling_price;
                const sell = parseFloat(item.selling_price);
                const disc = parseFloat(item.discount_price);
                if (sell > 0) {
                    const percent = Math.round(((sell - disc) / sell) * 100);
                    badge = `${percent}% Off`;
                }
            }

            return {
                id: item.id,
                slug: item.product_slug,
                category: item.category?.category_name || "Uncategorized",
                title: item.product_name,
                price: `AED ${finalPrice}`, // Added space
                oldPrice: oldPrice ? `AED ${oldPrice}` : undefined,
                image: item.product_thambnail.startsWith('http') ? item.product_thambnail : `${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product_thambnail}`,
                badge: badge
            };
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Header / Breadcrumb area */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
                    {/* Back button or Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-green-700">Delmon</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/products" className="hover:text-green-700">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Header for grid */}
                        <div className="mb-6">
                            <h2 className="text-gray-500 text-sm font-normal">Showing Some Products</h2>
                        </div>

                        {loading ? (
                            <div className="h-64 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map(p => (
                                        <ProductCard key={p.id} product={p} backgroundColor="bg-gray-50" />
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={lastPage}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <div className="py-12 text-center text-gray-500">
                                No products found in this category.
                            </div>
                        )}

                        {/* New Products Section */}
                        {newProducts.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">New Products</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {newProducts.map(p => (
                                        <ProductCard key={p.id} product={p} backgroundColor="bg-gray-50" />
                                    ))}
                                </div>
                                <div className="flex justify-center mt-8">
                                    {/* Mock pagination or view all for new products if needed, utilizing standard pagination style arrows just for visual matching */}
                                    <div className="flex gap-2">
                                        <ArrowLeft className="w-6 h-6 text-green-700 cursor-pointer" />
                                        <div className="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold">1</div>
                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center">2</div>
                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center">3</div>
                                        <ArrowRight className="w-6 h-6 text-green-700 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bottom Features (extracted) - Placing it here as requested 'downside feature is created ... use in the footer above section' */}
                        {/* Actually user said "use in the footer above section" which implies globally, but also said "createa this category detailed page, that downside feature is crated in cart..." */}
                        {/* I will add it here as per the design mock which likely has it at the bottom, AND I already added it to Cart page. */}
                    </div>
                </div>
            </div>

            {/* Using the component globally? The user said "use in the footer above section". 
                If I put it here, it matches the context of "category detailed page".
                I will put it just above the footer in layout if requested, but for this page specifically, I'll let it be part of the layout if I modify layout, or include here.*/}

            {/* The request implies the feature section should be *moved* or reused. I made it reusable. */}
        </div>
    );
};

// Simple ArrowRight component for the mock pagination below new products
const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default CategoryPageClient;
