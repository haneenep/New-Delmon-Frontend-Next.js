import axios from "axios";
import { getAuthToken } from "../utils/authCookies";
import { getGuestId } from "../utils/guestId";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      // User is authenticated, add Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // User is not authenticated, add guest ID
      const guestId = getGuestId();
      config.headers["X-Guest-ID"] = guestId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
