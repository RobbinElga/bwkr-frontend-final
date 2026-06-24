"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/stores/auth";
import { getSummary, getDonations } from "@/services/auth";
import { formatRupiah, formatDate } from "@/lib/format";
import type { DonorSummary, DonationHistoryItem } from "@/types";

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    pending: { label: "Menunggu", bg: "bg-secondary-fixed", text: "text-on-secondary-fixed-variant", icon: "schedule" },
    claimed: { label: "Terverifikasi", bg: "bg-primary-fixed", text: "text-on-primary-fixed", icon: "verified" },
    rejected: { label: "Ditolak", bg: "bg-error-container", text: "text-on-error-container", icon: "cancel" },
};

const HIDE_KEY = "bwkr_hide_total";

export default function RingkasanPage() {
    const { user } = useAuth();
    const [summary, setSummary] = useState<DonorSummary | null>(null);
    const [recent, setRecent] = useState<DonationHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Baca preferensi dari localStorage (default: tampilkan)
    const [hidden, setHidden] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem(HIDE_KEY) === "true";
    });

    function toggleHidden() {
        setHidden((v) => {
            const next = !v;
            localStorage.setItem(HIDE_KEY, String(next));
            return next;
        });
    }

    useEffect(() => {
        let mounted = true;
        Promise.all([getSummary(), getDonations(1)])
            .then(([s, d]) => {
                if (!mounted) return;
                setSummary(s);
                setRecent(d.data.slice(0, 4));
            })
            .catch((e) => mounted && setError((e as Error).message))
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    if (!user) return null;
    const firstName = user.name.split(" ")[0];

    return (
        <div className="space-y-6">
            {/* Baris atas: profil + dampak */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Kartu profil */}
                <div className="flex items-start gap-5 rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                    <Avatar name={user.name} src={user.avatar_url} size={80} />
                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-headline-md text-on-surface">{user.name}</h2>
                        <div className="mt-1 space-y-1 text-body-md text-on-surface-variant">
                            <p className="flex items-center gap-2">
                                <Icon name="mail" className="text-[16px]" />
                                <span className="truncate">{user.email}</span>
                            </p>
                            {user.phone && (
                                <p className="flex items-center gap-2">
                                    <Icon name="call" className="text-[16px]" /> {user.phone}
                                </p>
                            )}
                        </div>
                        <Link href="/akun/profil"
                            className="mt-4 inline-flex items-center gap-1 rounded-full border-2 border-primary px-5 py-1.5 text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary">
                            <Icon name="edit" className="text-[16px]" /> Edit Profil
                        </Link>
                    </div>
                </div>

                {/* Kartu dampak + tombol sembunyikan */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-label-md text-on-surface-variant">Dampak Wakaf Anda</p>
                        <button
                            onClick={toggleHidden}
                            className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-low"
                        >
                            <Icon name={hidden ? "visibility" : "visibility_off"} className="text-[16px]" />
                            {hidden ? "Tampilkan" : "Sembunyikan"}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            variant="primary"
                            icon="volunteer_activism"
                            label="Total Wakaf"
                            value={loading ? "…" : hidden ? "••••••" : formatRupiah(summary?.total_verified ?? 0)}
                        />
                        <StatCard
                            variant="secondary"
                            icon="domain"
                            label="Proyek Terbantu"
                            value={loading ? "…" : hidden ? "•••" : `${summary?.projects_supported ?? 0} Proyek`}
                        />
                    </div>
                </div>
            </div>

            {/* Wakaf terbaru */}
            <section className="overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest custom-shadow">
                <div className="flex items-center justify-between border-b border-border-subtle p-6">
                    <h3 className="text-headline-md text-on-surface">Wakaf Terbaru</h3>
                    <Link href="/akun/riwayat" className="flex items-center gap-1 text-label-md text-primary hover:underline">
                        Lihat Semua <Icon name="arrow_forward" className="text-[18px]" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Icon name="progress_activity" className="animate-spin text-2xl text-primary" />
                    </div>
                ) : error ? (
                    <div className="p-6 text-label-md text-on-error-container">{error}</div>
                ) : recent.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <Icon name="volunteer_activism" className="mb-2 text-4xl text-on-surface-variant opacity-30" />
                        <p className="text-body-md text-on-surface-variant">Belum ada wakaf. Yuk mulai berbagi kebaikan.</p>
                        <Link href="/donasi" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-label-md text-on-primary hover:bg-deep-forest">
                            Wakaf Sekarang
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-border-subtle">
                        {recent.map((d) => {
                            const s = STATUS_MAP[d.status] ?? STATUS_MAP.pending;
                            return (
                                <li key={d.ref_no} className="flex items-center gap-4 p-5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon name="volunteer_activism" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-label-md text-on-surface">
                                            {d.project?.name ?? d.program?.name ?? "Wakaf Umum"}
                                        </p>
                                        <p className="text-label-sm text-on-surface-variant">
                                            {formatDate(d.created_at)} · {d.ref_no}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-label-md font-bold text-primary">
                                            {hidden ? "••••••" : formatRupiah(d.amount)}
                                        </p>
                                        <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-label-sm ${s.bg} ${s.text}`}>
                                            <Icon name={s.icon} filled className="text-[12px]" /> {s.label}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}

function StatCard({ variant, icon, label, value }: {
    variant: "primary" | "secondary"; icon: string; label: string; value: string;
}) {
    const styles = variant === "primary"
        ? "bg-primary-container text-on-primary-container"
        : "bg-secondary-container text-on-secondary-container";
    return (
        <div className={`flex flex-col justify-between gap-6 rounded-xl p-6 ${styles}`}>
            <Icon name={icon} filled className="text-2xl" />
            <div>
                <p className="text-label-md opacity-80">{label}</p>
                <p className="text-headline-md font-bold tracking-widest">{value}</p>
            </div>
        </div>
    );
}