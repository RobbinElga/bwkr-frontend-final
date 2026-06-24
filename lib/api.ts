import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Accept: "application/json" },
});

// Sisipkan token (kalau ada) di setiap request — dipakai mulai fase auth (F5).
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("bwkr_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});