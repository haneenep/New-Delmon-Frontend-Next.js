import api from "../lib/axios";
import { WishlistAddRemoveResponse, WishlistGetResponse } from "../types/wishlist.types";

export const wishlistApi = {
    async getWishlist() {
        const res = await api.get<WishlistGetResponse>("/wishlist");
        return res.data.data;
    },

    async addToWishlist(productId: number) {
        const res = await api.post<WishlistAddRemoveResponse>(
            `/wishlist/add/${productId}`
        );
        return res.data.data;
    },

    async removeFromWishlist(productId: number) {
        const res = await api.delete<WishlistAddRemoveResponse>(
            `/wishlist/remove/${productId}`
        );
        return res.data.data;
    },
};
