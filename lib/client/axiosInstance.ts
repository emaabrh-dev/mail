// lib/axiosInstance.ts
import axios from 'axios';

const customAxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:9721',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function customAxios(config: any) {
  return customAxiosInstance(config);
}