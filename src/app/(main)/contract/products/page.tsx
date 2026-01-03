"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { contractApi } from "@/src/service/contractApi";
import { homeApi } from "@/src/service/homeApi";
import { useAppSelector } from "@/src/hooks/useRedux";
import { RootState } from "@/src/redux/store";
import ProductCard, { Product } from "@/src/components/common/ProductCard";
import Loading from "@/src/components/common/Loading";

interface Brand {
    id: number;
    brand_name: string;
    brand_slug: string;
    brand_image?: string;
}

export default function ContractProductsPage() {
    const router = useRouter();
    const { token } = useAppSelector((state: RootState) => state.auth);

    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch contract products
                const contractRes = await contractApi.getContractProducts();

                if (contractRes.status && contractRes.data && contractRes.data.products.data) {
                    const contractItems = contractRes.data.products.data;

                    // Fetch full product details for each contract product
                    const productPromises = contractItems.map(async (item: any) => {
                        try {
                            // Assume the API returns the product relation
                            if (item.product) {
                                const product = item.product;
                                const finalPrice = item.price || product.discount_price || product.selling_price;
                                const oldPrice = product.discount_price ? product.selling_price : undefined;

                                let badge = undefined;
                                if (product.discount_price) {
                                    const sell = parseFloat(product.selling_price);
                                    const disc = parseFloat(product.discount_price);
                                    if (sell > 0) {
                                        const percent = Math.round(((sell - disc) / sell) * 100);
                                        badge = `${percent}% Off`;
                                    }
                                }

                                const colors = product.product_color ? product.product_color.split(',').map((c: string) => c.trim()) : undefined;
                                const sizes = product.product_size ? product.product_size.split(',').map((s: string) => s.trim()) : undefined;

                                return {
                                    id: product.id,
                                    slug: product.product_slug,
                                    category: product.category?.category_name || "Technology",
                                    title: product.product_name,
                                    price: `AED ${finalPrice}`,
                                    oldPrice: oldPrice ? `AED ${oldPrice}` : undefined,
                                    image: `https://palegoldenrod-wombat-569197.hostingersite.com/${product.product_thambnail}`,
                                    badge,
                                    colors,
                                    sizes
                                } as Product;
                            }

                            return null;
                        } catch (err) {
                            console.error(`Failed to fetch product ${item.product_id}`, err);
                            return null;
                        }
                    });

                    const fetchedProducts = await Promise.all(productPromises);
                    const validProducts = fetchedProducts.filter((p): p is Product => p !== null);
                    setProducts(validProducts);
                } else {
                    setError("No contract products found");
                }

                // Fetch brands
                const brandsRes = await homeApi.getBrands();
                if (brandsRes.success && brandsRes.data && brandsRes.data.brands) {
                    // Get first 12 brands
                    setBrands(brandsRes.data.brands.slice(0, 12));
                }

            } catch (err: any) {
                console.error(err);
                setError("Failed to load contract products");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Link href="/" className="text-green-700 underline">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Banner Section */}
            <div className="bg-[#E8F3ED] py-12 md:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Left Content */}
                        <div className="max-w-xl">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#114f30] mb-4">
                                Contract Products
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base">
                                Browse our exclusive contract products for corporate and bulk purchase
                            </p>
                        </div>

                        {/* Right Illustration */}
                        <div className="shrink-0">
                            <Image
                                src="/auth/contract-banner.jpg"
                                alt="Contract Banner"
                                width={400}
                                height={250}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 text-xs text-gray-500">
                Delmon &gt; Contract &gt; Contract Product
            </div>

            {/* Products Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16">
                {products.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No products found in your contract.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Why Choose DALMON Section */}
            <div className="bg-[#FDFBF7] py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#114f30] text-center mb-12">
                        Why choose DALMON for your contract needs
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Best Prices */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Best Prices</h3>
                        </div>

                        {/* Fast Bulk Delivery */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Fast Bulk<br />Delivery</h3>
                        </div>

                        {/* Bulk Discounts */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Bulk<br />Discounts</h3>
                        </div>

                        {/* Dedicated Support */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">Dedicated<br />Support</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Brands Section */}
            <div className="bg-white py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#114f30] text-center mb-12">
                        Top Brands For Contract Purchase
                    </h2>

                    {brands.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {brands.map((brand) => (
                                <Link
                                    key={brand.id}
                                    href={`/brand/${brand.brand_slug}`}
                                    className="border border-gray-200 rounded-xl p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow bg-white group"
                                >
                                    <Image
                                        src={`https://palegoldenrod-wombat-569197.hostingersite.com/${brand.brand_image}`}
                                        alt={brand.brand_name}
                                        width={120}
                                        height={60}
                                        className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                <div key={i} className="border border-gray-100 rounded-xl p-6 flex items-center justify-center h-24">
                                    <div className="text-gray-300 font-bold text-sm">BRAND</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
