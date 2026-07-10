export function formatRupiah(n: number): string {
    return "Rp " + new Intl.NumberFormat("id-ID").format(n ?? 0);
}

export function formatDate(iso: string | null): string {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(iso: string | null): string {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Estimasi waktu baca (menit) dari konten HTML. */
export function readingTime(html: string | null): number {
    if (!html) return 1;
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}