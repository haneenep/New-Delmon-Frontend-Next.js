export interface AllCategoriesResponse {
  success: boolean
  message: string
  data: MainCategory[]
  meta: Meta
}

export interface MainCategory {
  id: number
  main_category_name: string
  main_category_slug: string
  main_category_image: string
  created_at: string
  updated_at?: string
  main_category_title: string
  main_category_desc: string
  categories: Category[]
}

export interface Category {
  id: number
  main_category_id: number
  category_name: string
  category_slug: string
  category_image?: string
  created_at: string
  updated_at?: string
  meta_title: string
  meta_description: string
  meta_keywords?: string
  sub_categories: SubCategory[]
}

export interface SubCategory {
  id: number
  main_category_id: number
  category_id: number
  subcategory_name: string
  subcategory_slug: string
  created_at: string
  updated_at?: string
  meta_title: string
  meta_description: string
  meta_keywords: string
}

export interface Meta {
  total: number
  current_loaded: number
  loaded: number
  prev_page: any
  next_page: number
  current_page: number
  last_page: number
}
