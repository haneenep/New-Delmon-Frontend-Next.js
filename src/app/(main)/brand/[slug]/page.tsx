import BrandPageClient from "@/src/components/brand/BrandPageClient";
import { homeApi } from "@/src/service/homeApi";
import { BrandProductsResponse } from "@/src/types/brand.types";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const res: BrandProductsResponse = await homeApi.getBrandProducts(slug, { per_page: 1 });
        if (res.success && res.data.brand) {
            const brand = res.data.brand;
            return {
                title: brand.meta_title || `${brand.brand_name} Products | Delmon`,
                description: brand.meta_description || `Shop the latest ${brand.brand_name} products at Delmon.`,
                keywords: brand.meta_keywords,
            };
        }
    } catch (error) {
        console.error("Metadata fetch error:", error);
    }
    return {
        title: "Brand Products | Delmon",
    };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <BrandPageClient slug={slug} />;
}
