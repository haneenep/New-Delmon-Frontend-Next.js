import api from "../lib/axios";

export const homeApi = {
  async getBanners() {
    const res = await api.get(`/get-banners`);
    return res.data;
  },
};
