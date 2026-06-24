const BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Ambil data dari backend di sisi server (untuk SEO).
 * Aman: kalau backend mati/error, kembalikan fallback agar halaman tetap render.
 */
export async function safeFetch<T>(path: string, fallback: T, revalidate = 300): Promise<T> {
    try {
        const res = await fetch(`${BASE}${path}`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
        });
        if (!res.ok) return fallback;
        const json = await res.json();
        return (json?.data ?? json) as T;
    } catch {
        return fallback;
    }
}