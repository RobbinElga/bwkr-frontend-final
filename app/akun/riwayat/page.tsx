"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { getDonations, getSummary } from "@/services/auth";
import { formatRupiah, formatDate, formatDateTime } from "@/lib/format";
import type { DonationHistoryItem, Paginated, DonorSummary } from "@/types";

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    pending: { label: "Menunggu Verifikasi", bg: "bg-secondary-fixed", text: "text-on-secondary-fixed-variant", icon: "schedule" },
    claimed: { label: "Terverifikasi", bg: "bg-primary-fixed", text: "text-on-primary-fixed", icon: "check_circle" },
    rejected: { label: "Ditolak", bg: "bg-error-container", text: "text-on-error-container", icon: "cancel" },
};

export default function RiwayatPage() {
    const [data, setData] = useState<Paginated<DonationHistoryItem> | null>(null);
    const [summary, setSummary] = useState<DonorSummary | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ringkasan (sekali)
    useEffect(() => {
        getSummary().then(setSummary).catch(() => { });
    }, []);

    // daftar donasi (ikut halaman)
    useEffect(() => {
        setLoading(true);
        setError(null);
        getDonations(page)
            .then(setData)
            .catch((e) => setError((e as Error).message))
            .finally(() => setLoading(false));
    }, [page]);

    return (
        <div className="space-y-6">
            {/* Header + total kontribusi */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:col-span-2 md:p-8">
                    <h1 className="mb-2 text-headline-lg text-primary">Riwayat Wakaf</h1>
                    <p className="text-body-md text-on-surface-variant">Pantau seluruh kontribusi wakaf Anda beserta statusnya.</p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-primary/5 p-6 custom-shadow">
                    <div>
                        <p className="mb-1 text-label-sm uppercase tracking-wide text-primary">Total Kontribusi</p>
                        <p className="text-headline-md font-bold text-primary">
                            {summary ? formatRupiah(summary.total_verified) : "…"}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-primary">
                        <Icon name="verified" filled className="text-[18px]" />
                        <span className="text-label-sm">{summary?.projects_supported ?? 0} proyek terbantu</span>
                    </div>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex min-h-[30vh] items-center justify-center">
                    <Icon name="progress_activity" className="animate-spin text-3xl text-primary" />
                </div>
            ) : error ? (
                <div className="flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                    <Icon name="error" filled /> {error}
                </div>
            ) : !data || data.data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border-subtle p-12 text-center">
                    <Icon name="volunteer_activism" className="mb-3 text-5xl text-on-surface-variant opacity-30" />
                    <p className="text-body-md text-on-surface-variant">Belum ada riwayat wakaf.</p>
                    <Link href="/donasi" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-label-md text-on-primary hover:bg-deep-forest">
                        Mulai Berwakaf
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {data.data.map((d) => {
                            const s = STATUS_MAP[d.status] ?? STATUS_MAP.pending;
                            return (
                                <div
                                    key={d.ref_no}
                                    className="rounded-2xl border border-border-subtle bg-surface-container-lowest p-5 custom-shadow transition-all hover:border-primary/30 md:p-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon name="volunteer_activism" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-headline-md leading-tight text-primary">
                                                    {d.project?.name ?? d.program?.name ?? "Wakaf Umum"}
                                                </h3>
                                                <p className="text-label-sm text-outline">ID: {d.ref_no}</p>
                                                {d.on_behalf && <p className="text-label-sm text-on-surface-variant">a.n. {d.on_behalf}</p>}
                                            </div>
                                        </div>
                                        <span className={cn("inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1 text-label-sm", s.bg, s.text)}>
                                            <Icon name={s.icon} filled className="text-[14px]" /> {s.label}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-border-subtle pt-4">
                                        <div>
                                            <p className="text-label-sm uppercase text-outline">Tanggal</p>
                                            <p className="text-body-md font-bold text-on-surface">{d.donation_date ? formatDate(d.donation_date) : formatDateTime(d.created_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-label-sm uppercase text-outline">Jumlah Wakaf</p>
                                            <p className="text-body-md font-bold text-primary">{formatRupiah(d.amount)}</p>
                                        </div>
                                        <Link
                                            href={`/cek-status?ref=${d.ref_no}`}
                                            className="ml-auto flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary transition-colors hover:bg-deep-forest"
                                        >
                                            Lihat Detail <Icon name="chevron_right" className="text-[18px]" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {data.meta.last_page > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                            <button
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40"
                            >
                                <Icon name="chevron_left" />
                            </button>
                            {Array.from({ length: data.meta.last_page }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={cn(
                                        "h-10 w-10 rounded-lg text-label-md transition-colors",
                                        p === page
                                            ? "bg-primary font-bold text-on-primary"
                                            : "border border-border-subtle text-on-surface-variant hover:bg-surface-container-low"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page === data.meta.last_page}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40"
                            >
                                <Icon name="chevron_right" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}