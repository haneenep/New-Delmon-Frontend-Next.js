import { createSlice } from "@reduxjs/toolkit";
import {
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
} from "./wishlistThunk";
import { WishlistGetData } from "@/src/types/wishlist.types";

interface WishlistState {
    wishlist: WishlistGetData[] | null;
    loading: boolean;
    loadingProductId: number | null;
    error: string | null;
    message: string | null;
}

const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    loadingProductId: null,
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
            .addCase(addToWishlist.pending, (state, action) => {
                state.loadingProductId = action.meta.arg;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loadingProductId = null;
                state.wishlist = action.payload;
                state.message = "Item added to wishlist successfully";
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loadingProductId = null;
                state.error = action.payload as string;
            })

            // Remove from Wishlist
            .addCase(removeFromWishlist.pending, (state, action) => {
                state.loadingProductId = action.meta.arg;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loadingProductId = null;
                state.message = "Item removed from wishlist";
                if (state.wishlist) {
                    const productId = action.payload;
                    state.wishlist = state.wishlist.filter(
                        (item) => item.product_id !== productId
                    );
                }
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loadingProductId = null;
                state.error = action.payload as string;
            });
    },
});

export const { clearWishlistError, clearWishlistMessage, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
