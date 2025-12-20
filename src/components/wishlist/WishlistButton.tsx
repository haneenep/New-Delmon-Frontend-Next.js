"use client";

import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";
import { RootState } from "@/src/redux/store";
import { addToWishlist, removeFromWishlist } from "@/src/redux/wishlist/wishlistThunk";
import { useState, useEffect } from "react";

interface WishlistButtonProps {
    productId: number;
    className?: string;
    showText?: boolean;
}

export default function WishlistButton({ productId, className = "", showText = false }: WishlistButtonProps) {
    const dispatch = useAppDispatch();
    const { wishlist, loading } = useAppSelector((state: RootState) => state.wishlist);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        if (wishlist?.wishlist_items) {
            const inWishlist = wishlist.wishlist_items.some(
                (item) => item.product_id === productId
            );
            setIsInWishlist(inWishlist);
        }
    }, [wishlist, productId]);

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInWishlist) {
            await dispatch(removeFromWishlist(productId));
        } else {
            await dispatch(addToWishlist(productId));
        }
    };

    return (
        <button
            onClick={handleToggleWishlist}
            disabled={loading}
            className={`flex items-center gap-2 transition-all ${className}`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={`w-5 h-5 transition-all ${isInWishlist
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
            />
            {showText && (
                <span className="text-sm">
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                </span>
            )}
        </button>
    );
}
