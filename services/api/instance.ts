import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API;

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => {
  return response;
});
