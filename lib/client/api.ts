// lib/client/api.ts
import axios from 'axios';

export const API_BASE = process.env.BACKEND_URL || 'http://localhost:9721';

export const api = axios.create({
  baseURL: API_BASE,
});
