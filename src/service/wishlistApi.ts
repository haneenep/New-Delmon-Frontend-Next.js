import api from "../lib/axios";
import { WishlistResponse, RemoveWishlistResponse } from "../types/wishlist.types";

export const wishlistApi = {
    async getWishlist() {
        const res = await api.get<WishlistResponse>("/wishlist");
        return res.data.data;
    },

    async addToWishlist(productId: number) {
        const res = await api.post<WishlistResponse>(
            `/wishlist/add/${productId}`
        );
        return res.data.data;
    },

    async removeFromWishlist(productId: number) {
        const res = await api.delete<RemoveWishlistResponse>(
            `/wishlist/remove/${productId}`
        );
        return res.data.data;
    },
};
