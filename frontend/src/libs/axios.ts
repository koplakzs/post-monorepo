import axios from "axios";
import { getAuthCookies } from "@/helpers/cookiesHelper";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthCookies();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
