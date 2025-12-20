import { createSlice } from "@reduxjs/toolkit";
import {
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
} from "./wishlistThunk";
import { Wishlist } from "@/src/types/wishlist.types";

interface WishlistState {
    wishlist: Wishlist | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null,
    message: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlistError: (state) => {
            state.error = null;
        },
        clearWishlistMessage: (state) => {
            state.message = null;
        },
        resetWishlist: (state) => {
            state.wishlist = null;
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add to Wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
                state.message = "Item added to wishlist successfully";
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Remove from Wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.message = "Item removed from wishlist";
                if (state.wishlist) {
                    const productId = action.payload;
                    state.wishlist.wishlist_items = state.wishlist.wishlist_items.filter(
                        (item) => item.product_id !== productId
                    );
                    state.wishlist.wishlist_count = state.wishlist.wishlist_items.length;
                }
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearWishlistError, clearWishlistMessage, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
