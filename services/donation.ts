const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface DonationResult {
    message: string;
    ref_no: string;
    status: string;
}

export async function submitDonation(form: FormData): Promise<DonationResult> {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("bwkr_token") : null;

    const res = await fetch(`${BASE}/donations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: form, // multipart (ada file bukti) — jangan set Content-Type manual
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        // ambil pesan error pertama dari Laravel kalau ada
        const firstError =
            data?.errors && typeof data.errors === "object"
                ? (Object.values(data.errors)[0] as string[])?.[0]
                : null;
        throw new Error(firstError || data?.message || "Gagal mengirim donasi.");
    }

    return data as DonationResult;
}

export interface DonationStatus {
    ref_no: string;
    donor_name: string;
    amount: number;
    status: string;
    donation_date: string | null;
    created_at: string;
}

export async function getDonationStatus(ref: string): Promise<DonationStatus> {
    const res = await fetch(`${BASE}/donations/${encodeURIComponent(ref)}/status`, {
        headers: { Accept: "application/json" },
    });
    if (res.status === 404) throw new Error("Nomor referensi tidak ditemukan.");
    if (!res.ok) throw new Error("Gagal memuat status. Coba lagi.");
    return (await res.json()) as DonationStatus;
}