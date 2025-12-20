import api from "../lib/axios";

export const homeApi = {
  async getBanners() {
    const res = await api.get(`/get-banners`);
    return res.data;
  },

  async getProducts() {
    const res = await api.get(`/products?simple=true`);
    return res.data;
  },

  async getPaginatedProducts(page: number = 1, limit: number = 12, params: any = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: limit.toString(),
      ...params
    });
    const res = await api.get(`/products?${queryParams.toString()}`);
    return res.data;
  },

  async getProductBySlug(slug: string) {
    const res = await api.get(`/product/${slug}`);
    return res.data;
  },

  async getCategories(type: string = 'category', limit: number = 8) {
    const res = await api.get(`/categories?type=${type}&limit=${limit}`);
    return res.data;
  },
  async getProductsByCategory(
    categoryType: "main-category" | "category" | "sub-category",
    id: number,
    params?: {
      per_page?: number;
      simple?: boolean;
    }
  ) {
    const res = await api.get(`/${categoryType}/${id}/products`, {
      params,
    });
    return res.data;
  },

  async getAllCategories(perPage: number = 10, page: number = 1) {
    const res = await api.get(`/all-categories?per_page=${perPage}&page=${page}`);
    return res.data;
  }
};
