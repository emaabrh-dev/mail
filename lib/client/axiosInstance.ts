// lib/client/axiosInstance.ts
import axios from "axios";

// Detect baseURL dynamically in browser & fallback for server
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Example: https://mydomain.com → https://mydomain.com
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:3000";
}

const customAxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});


export function customAxios(config: any) {
  return customAxiosInstance(config);
}