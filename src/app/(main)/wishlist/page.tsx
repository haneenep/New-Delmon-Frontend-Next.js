"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/common";
import Loading from "@/src/components/common/Loading";
import { Trash2, Loader2 } from "lucide-react";
import {
    fetchWishlist,
    removeFromWishlist,
} from "@/src/redux/wishlist/wishlistThunk";
import { addToCart } from "@/src/redux/cart/cartThunk";
import { clearWishlistError, clearWishlistMessage } from "@/src/redux/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";
import { RootState } from "@/src/redux/store";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

function WishlistContent() {
    const dispatch = useAppDispatch();
    const { wishlist, loading, loadingProductId, error, message } = useAppSelector((state: RootState) => state.wishlist);
    const [addingToCart, setAddingToCart] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearWishlistMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearWishlistError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleRemoveItem = async (productId: number) => {
        if (loadingProductId === productId) return;
        await dispatch(removeFromWishlist(productId));
    };

    const handleAddToCart = async (productId: number) => {
        setAddingToCart(productId);
        await dispatch(addToCart({ productId }));
        setAddingToCart(null);
    };

    const wishlistItems = wishlist || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8 text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-600">
                    <span>Delmon</span>
                    <span className="mx-2">›</span>
                    <span>Home</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-900 font-medium">Wishlist</span>
                </div>

                {/* Page Title */}
                <h1 className="text-3xl font-bold mb-8">Wishlist</h1>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {loading && !wishlist ? (
                    <Loading className="py-20" />
                ) : wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
                        <Button onClick={() => window.location.href = "/"}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Wishlist Table */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                                <div className="col-span-4">Product Name</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-center">Total</div>
                                <div className="col-span-4 text-center">Action</div>
                            </div>

                            {/* Wishlist Items */}
                            <div className="divide-y divide-gray-200">
                                {wishlistItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-12 gap-4 px-6 py-6 items-center hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Product Info */}
                                        <div className="col-span-4 flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative shrink-0">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product.product_thambnail}`}
                                                    alt={item.product.product_name}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                                                    {item.product.product_name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-2 text-center">
                                            <div className="flex items-center justify-center border border-gray-300 rounded-full overflow-hidden h-8 w-20 mx-auto">
                                                <button
                                                    className="w-8 h-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600"
                                                    disabled
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center text-sm font-medium">
                                                    1
                                                </span>
                                                <button
                                                    className="w-8 h-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600"
                                                    disabled
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="col-span-2 text-center font-semibold text-gray-900">
                                            AED {item.product.selling_price}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="col-span-4 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleRemoveItem(item.product_id)}
                                                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50 text-gray-400"
                                                aria-label="Remove item"
                                                disabled={loadingProductId === item.product_id}
                                            >
                                                {loadingProductId === item.product_id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                            <Button
                                                variant="primary"
                                                className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-700"
                                                onClick={() => handleAddToCart(item.product_id)}
                                                disabled={addingToCart === item.product_id}
                                            >
                                                {addingToCart === item.product_id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    "Add To Cart"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Update Now Button */}
                        <div className="flex justify-start">
                            <Button
                                variant="primary"
                                className="px-8 py-3 rounded-lg bg-black hover:bg-gray-800 text-white"
                                onClick={() => dispatch(fetchWishlist())}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Update Now"
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function WishlistPage() {
    return (
        <ProtectedRoute>
            <WishlistContent />
        </ProtectedRoute>
    );
}
