import { create } from "zustand";
import type { AuthUser } from "@/types";
import { getMe, getToken, clearToken, logoutRequest } from "@/services/auth";

type AuthState = {
    user: AuthUser | null;
    status: "loading" | "authenticated" | "guest";
    setUser: (u: AuthUser) => void;
    hydrate: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    status: "loading",

    // dipanggil setelah login/daftar berhasil
    setUser: (user) => set({ user, status: "authenticated" }),

    // dipanggil sekali saat app dibuka: cek token -> ambil data user
    hydrate: async () => {
        if (!getToken()) {
            set({ user: null, status: "guest" });
            return;
        }
        try {
            set({ user: await getMe(), status: "authenticated" });
        } catch {
            clearToken(); // token kadaluarsa / tidak valid
            set({ user: null, status: "guest" });
        }
    },

    logout: async () => {
        try { await logoutRequest(); } catch { /* abaikan; tetap bersihkan lokal */ }
        clearToken();
        set({ user: null, status: "guest" });
    },
}));