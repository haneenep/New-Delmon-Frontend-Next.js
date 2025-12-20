import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    count?: number;
}

interface CategorySidebarProps {
    title: string;
    categories: CategoryItem[];
    activeCategorySlug?: string;
    className?: string;
}

export default function CategorySidebar({
    title,
    categories,
    activeCategorySlug,
    className = "",
}: CategorySidebarProps) {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                {title}
            </h2>
            <ul className="space-y-1">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <Link
                            href={`/category/${cat.slug}`}
                            className={`flex items-center justify-between py-3 px-2 rounded-md transition-colors ${activeCategorySlug === cat.slug
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {activeCategorySlug === cat.slug && <ChevronRight className="w-4 h-4" />}
                                <span>{cat.name}</span>
                            </div>
                            {cat.count !== undefined && (
                                <span className="text-xs bg-gray-100 text-gray-500 py-1 px-2 rounded-full">
                                    {cat.count > 9 ? cat.count : `0${cat.count}`}
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
