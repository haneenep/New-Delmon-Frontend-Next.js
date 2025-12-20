"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { homeApi } from "@/src/service/homeApi";
import { AllCategoriesResponse, MainCategory } from "@/src/types/category.types";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { CategoryCard } from "@/src/components/common";

export default function AllCategoriesPage() {
    const [categoriesData, setCategoriesData] = useState<AllCategoriesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
    const perPage = 10;

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const fetchCategories = async (page: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await homeApi.getAllCategories(perPage, page);
            setCategoriesData(response);

            // Set first main category as selected by default
            if (response.data.length > 0 && !selectedMainCategory) {
                setSelectedMainCategory(response.data[0].main_category_slug);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const getSelectedMainCategoryData = (): MainCategory | null => {
        if (!categoriesData || !selectedMainCategory) return null;
        return categoriesData.data.find(
            (cat) => cat.main_category_slug === selectedMainCategory
        ) || null;
    };

    const selectedCategoryData = getSelectedMainCategoryData();
    console.log("categoriesss:", selectedCategoryData);

    if (loading && !categoriesData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => fetchCategories(currentPage)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-600">
                    <span>Delmon</span>
                    <span className="mx-2">›</span>
                    <span>Home</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900 font-medium">All Categories</span>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">All Categories</h1>
                    <p className="text-gray-600">
                        Office supplies for work, school and business
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - Main Categories */}
                    <aside className="lg:col-span-3">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-8">
                            <div className="divide-y divide-gray-200">
                                {categoriesData?.data.map((mainCategory) => (
                                    <button
                                        key={mainCategory.id}
                                        onClick={() => setSelectedMainCategory(mainCategory.main_category_slug)}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${selectedMainCategory === mainCategory.main_category_slug
                                            ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                                            : "text-gray-700"
                                            }`}
                                    >
                                        {mainCategory.main_category_name}
                                    </button>
                                ))}
                            </div>

                            {/* More link */}
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    More
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Categories and Products */}
                    <main className="lg:col-span-9">
                        {selectedCategoryData ? (
                            <div className="space-y-12">
                                {selectedCategoryData.categories.map((category) => (
                                    <div key={category.id}>
                                        {/* Category Header */}
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {category.category_name}
                                            </h2>
                                        </div>

                                        {/* Subcategories Grid */}
                                        {category.sub_categories && category.sub_categories.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                {category.sub_categories.slice(0, 4).map((subCategory) => (
                                                    <CategoryCard
                                                        key={subCategory.id}
                                                        name={subCategory.subcategory_name}
                                                        slug={subCategory.subcategory_slug}
                                                        type="subcategory"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            // Show category card when no subcategories
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                <CategoryCard
                                                    name={category.category_name}
                                                    slug={category.category_slug}
                                                    image={category.category_image}
                                                    type="category"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Single Category Items (like Fire Proof Bag, Tissue Roll, etc.) */}
                                <div className="space-y-4">
                                    {["Fire Proof Bag", "Tissue Roll", "Dettol Hand Wash", "Fairy Liquid", "Ball Pen", "ID Carde Holder"].map((item, index) => (
                                        <Link
                                            key={index}
                                            href="#"
                                            className="block bg-white rounded-lg border border-gray-200 px-6 py-4 hover:shadow-md hover:border-blue-300 transition-all duration-300"
                                        >
                                            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                                {item}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-600">No categories available</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {categoriesData && categoriesData.meta.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: categoriesData.meta.last_page }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            disabled={loading}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === page
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === categoriesData.meta.last_page || loading}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
