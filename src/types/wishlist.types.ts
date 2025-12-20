export interface WishlistResponse {
    success: boolean;
    message: string;
    data: Wishlist;
}

export interface WishlistItemResponse {
    success: boolean;
    message: string;
    data: WishlistItem;
}

export interface RemoveWishlistResponse {
    success: boolean;
    message: string;
    data: any[];
}

export interface Wishlist {
    wishlist_items: WishlistItem[];
    wishlist_count: number;
}

export interface WishlistItem {
    id: number;
    product_id: number;
    user_id: number | null;
    session_id: string;
    name: string;
    size?: string;
    color?: string;
    price: number;
    stock_status: string;
    img: string;
    slug: string;
    created_at: string;
    updated_at: string;
}
