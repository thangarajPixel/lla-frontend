import axios from "axios";

const baseConfiguration = {
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 3000,
};

// Client-side Axios instance
export const clientAxios = axios.create(baseConfiguration);

clientAxios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Server-side Axios instance
export const serverAxios = axios.create(baseConfiguration);

serverAxios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

serverAxios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error.message),
);
