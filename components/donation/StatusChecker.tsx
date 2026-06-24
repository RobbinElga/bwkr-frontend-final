"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah, formatDate } from "@/lib/format";
import { getDonationStatus, type DonationStatus } from "@/services/donation";

const STATUS_MAP: Record<string, { label: string; icon: string; cls: string }> = {
    pending: { label: "Menunggu Verifikasi", icon: "hourglass_top", cls: "bg-secondary-fixed text-on-secondary-fixed-variant" },
    claimed: { label: "Terverifikasi & Tersalurkan", icon: "verified", cls: "bg-primary-container/20 text-primary" },
    rejected: { label: "Ditolak", icon: "cancel", cls: "bg-error-container text-on-error-container" },
};

export function StatusChecker({ initialRef }: { initialRef: string }) {
    const [ref, setRef] = useState(initialRef);
    const [data, setData] = useState<DonationStatus | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const check = useCallback(async (value: string) => {
        const v = value.trim().toUpperCase();
        if (!v) return setError("Masukkan nomor referensi.");
        setError(null);
        setData(null);
        setLoading(true);
        try {
            setData(await getDonationStatus(v));
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (initialRef) check(initialRef);
    }, [initialRef, check]);

    const meta = data ? STATUS_MAP[data.status] ?? STATUS_MAP.pending : null;

    return (
        <div className="space-y-6">
            <div className="flex gap-2 rounded-xl border border-border-subtle bg-surface-container-lowest p-2 custom-shadow">
                <input
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && check(ref)}
                    placeholder="mis. ABC12345"
                    className="flex-1 rounded-lg bg-transparent px-4 py-3 uppercase tracking-widest text-on-surface outline-none"
                />
                <button
                    onClick={() => check(ref)}
                    disabled={loading}
                    className="rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-all hover:bg-deep-forest disabled:opacity-60"
                >
                    {loading ? "..." : "Cek"}
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                    <Icon name="error" filled className="text-[18px]" /> {error}
                </div>
            )}

            {data && meta && (
                <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow">
                    <div className={`mb-6 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-label-md ${meta.cls}`}>
                        <Icon name={meta.icon} filled className="text-[18px]" /> {meta.label}
                    </div>
                    <dl className="space-y-3">
                        <Row label="Nomor Referensi" value={data.ref_no} mono />
                        <Row label="Nama Donatur" value={data.donor_name} />
                        <Row label="Nominal" value={formatRupiah(data.amount)} />
                        <Row label="Tanggal" value={formatDate(data.created_at)} />
                    </dl>
                </div>
            )}
        </div>
    );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="flex items-center justify-between border-b border-border-subtle pb-3 last:border-0 last:pb-0">
            <dt className="text-label-md text-on-surface-variant">{label}</dt>
            <dd className={`text-body-md text-on-surface ${mono ? "font-mono tracking-widest" : ""}`}>{value}</dd>
        </div>
    );
}