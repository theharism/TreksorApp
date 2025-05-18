import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: 'https://treksor-backend.vercel.app/api/v1/',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    console.log('Request intercepted:', config.url);
    try {
      const stored = await SecureStore.getItemAsync('auth-storage');
      console.log('SecureStore data:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Parsed auth storage:', parsed);
        const token = parsed?.state?.token;
        if (token) {
          console.log('Token found, adding to headers');
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log('No token found in auth storage');
        }
      } else {
        console.log('No auth storage found');
      }
    } catch (error) {
      console.error('Failed to load auth token:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);