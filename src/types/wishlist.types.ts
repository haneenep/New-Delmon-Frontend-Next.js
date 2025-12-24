export interface WishlistGetResponse {
  success: boolean
  message: string
  data: WishlistGetData[]
}

export interface WishlistGetData {
  id: number
  user_id: number
  product_id: number
  created_at: string
  updated_at: string
  product: WishlistProduct
}

export interface WishlistProduct {
  id: number
  brand_id: number
  brand_name: any
  main_category_id?: number
  main_category_name: any
  category_id: number
  category_name: any
  subcategory_id?: number
  subcategory_name: any
  product_name: string
  product_slug: string
  product_code: string
  product_qty: string
  product_tags: string
  product_size: string
  product_color: string
  packing?: string
  height: any
  width: any
  length: any
  weight: any
  origin?: string
  alt?: string
  selling_price: string
  contract_price: any
  discount_price?: string
  specification?: string
  short_description: string
  long_description: string
  product_thambnail: string
  vendor_id?: number
  hot_deals?: number
  featured?: number
  special_offer: any
  special_deals: any
  new_product?: number
  category_skip_0: any
  category_skip_4: any
  category_skip_7: any
  meta_title?: string
  meta_keyword?: string
  meta_description: any
  wholesale?: number
  status: number
  created_at: string
  updated_at: string
}


export interface WishlistAddRemoveResponse {
  success: boolean
  message: string
  data: any[]
}
