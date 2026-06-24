import type { AuthUser, DonationHistoryItem, Paginated, DonorSummary } from "@/types";


const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
const TOKEN_KEY = "bwkr_token";

/* ---------- Token helpers ---------- */
export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/* ---------- Pemanggil API (otomatis sisip Bearer + lempar error Laravel) ---------- */
async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers ?? {}),
        },
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        // ambil pesan error pertama dari Laravel (message / errors.*)
        const errs = (body as { errors?: Record<string, string[]> }).errors;
        const first = errs ? Object.values(errs)[0]?.[0] : undefined;
        throw new Error((body as { message?: string }).message ?? first ?? "Terjadi kesalahan. Silakan coba lagi.");
    }
    return body as T;
}

/* ---------- Auth ---------- */
type AuthResponse = { token: string; expires_at: string; user: AuthUser };

export async function registerDonatur(payload: {
    name: string; email: string; phone: string;
    password: string; password_confirmation: string;
}): Promise<AuthUser> {
    const res = await api<AuthResponse>("/auth/donatur/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    setToken(res.token);
    return res.user;
}

export async function loginDonatur(email: string, password: string): Promise<AuthUser> {
    const res = await api<AuthResponse>("/auth/donatur/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    setToken(res.token);
    return res.user;
}

export async function getMe(): Promise<AuthUser> {
    return api<AuthUser>("/auth/me");
}

export async function logoutRequest(): Promise<void> {
    await api("/auth/logout", { method: "POST" });
}

/* ---------- Profil donatur ---------- */
export async function getProfile(): Promise<AuthUser> {
    const res = await api<{ data: AuthUser }>("/donatur/profile");
    return res.data;
}

export async function updateProfile(payload: Partial<Pick<AuthUser, "name" | "email" | "phone">>): Promise<AuthUser> {
    const res = await api<{ data: AuthUser }>("/donatur/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return res.data;
}

/* ---------- Riwayat donasi ---------- */
export async function getDonations(page = 1): Promise<Paginated<DonationHistoryItem>> {
    return api<Paginated<DonationHistoryItem>>(`/donatur/donations?page=${page}`);
}

export async function getDonation(refNo: string): Promise<DonationHistoryItem> {
    const res = await api<{ data: DonationHistoryItem }>(`/donatur/donations/${refNo}`);
    return res.data;
}

/* ---------- Ringkasan & keamanan ---------- */
export async function getSummary(): Promise<DonorSummary> {
    return api<DonorSummary>("/donatur/summary");
}

export async function changePassword(payload: {
    current_password: string;
    password: string;
    password_confirmation: string;
}): Promise<void> {
    await api("/auth/password", { method: "PUT", body: JSON.stringify(payload) });
}

/* ---------- Foto profil ---------- */
export async function uploadAvatar(file: File): Promise<AuthUser> {
    const token = getToken();
    const form = new FormData();
    form.append("avatar", file);

    const res = await fetch(`${API}/donatur/profile/avatar`, {
        method: "POST",
        headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: form, // jangan set Content-Type — biar browser isi boundary multipart
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        const errs = (body as { errors?: Record<string, string[]> }).errors;
        const first = errs ? Object.values(errs)[0]?.[0] : undefined;
        throw new Error((body as { message?: string }).message ?? first ?? "Gagal mengunggah foto.");
    }
    return (body as { data: AuthUser }).data;
}

export async function deleteAvatar(): Promise<AuthUser> {
    const res = await api<{ data: AuthUser }>("/donatur/profile/avatar", { method: "DELETE" });
    return res.data;
}