"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { getDonations } from "@/services/auth";
import { formatRupiah, formatDate } from "@/lib/format";
import type { DonationHistoryItem, Paginated } from "@/types";

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    pending: { label: "Menunggu", bg: "bg-secondary-fixed", text: "text-on-secondary-fixed-variant", icon: "schedule" },
    claimed: { label: "Terverifikasi", bg: "bg-primary-fixed", text: "text-on-primary-fixed", icon: "verified" },
    rejected: { label: "Ditolak", bg: "bg-error-container", text: "text-on-error-container", icon: "cancel" },
};

export function RiwayatTab() {
    const [data, setData] = useState<Paginated<DonationHistoryItem> | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getDonations(page)
            .then(setData)
            .catch((e) => setError((e as Error).message))
            .finally(() => setLoading(false));
    }, [page]);

    if (loading) {
        return (
            <div className="flex min-h-[30vh] items-center justify-center">
                <Icon name="progress_activity" className="animate-spin text-3xl text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                <Icon name="error" filled /> {error}
            </div>
        );
    }

    if (!data || data.data.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border-subtle p-12 text-center">
                <Icon name="volunteer_activism" className="mb-3 text-5xl text-on-surface-variant opacity-30" />
                <p className="text-body-md text-on-surface-variant">Belum ada riwayat donasi.</p>
                <Link href="/donasi" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-label-md text-on-primary hover:bg-deep-forest">
                    Mulai Berdonasi
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-label-sm text-on-surface-variant">
                Total {data.meta.total} donasi
            </p>

            {/* List donasi */}
            <div className="space-y-3">
                {data.data.map((d) => {
                    const s = STATUS_MAP[d.status] ?? STATUS_MAP.pending;
                    return (
                        <div
                            key={d.ref_no}
                            className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface-container-lowest p-5 custom-shadow transition-all hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-label-sm ${s.bg} ${s.text}`}>
                                        <Icon name={s.icon} filled className="text-[14px]" /> {s.label}
                                    </span>
                                    <span className="text-label-sm text-on-surface-variant">{d.ref_no}</span>
                                </div>
                                <p className="text-headline-md text-primary">{formatRupiah(d.amount)}</p>
                                <p className="text-label-sm text-on-surface-variant">
                                    {d.bank_account ? `${d.bank_account.bank_name} · ` : ""}
                                    {formatDate(d.created_at)}
                                </p>
                                {d.on_behalf && (
                                    <p className="text-label-sm text-on-surface-variant">Atas nama: {d.on_behalf}</p>
                                )}
                            </div>
                            <Link
                                href={`/cek-status?ref=${d.ref_no}`}
                                className="shrink-0 flex items-center gap-1 rounded-lg border border-border-subtle px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
                            >
                                Detail <Icon name="chevron_right" />
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {data.meta.last_page > 1 && (
                <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-on-surface-variant transition-colors hover:bg-surface-container-low disabled:opacity-40"
                    >
                        <Icon name="chevron_left" />
                    </button>
                    <span className="text-label-md text-on-surface-variant">
                        {page} / {data.meta.last_page}
                    </span>
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === data.meta.last_page}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-on-surface-variant transition-colors hover:bg-surface-container-low disabled:opacity-40"
                    >
                        <Icon name="chevron_right" />
                    </button>
                </div>
            )}
        </div>
    );
}