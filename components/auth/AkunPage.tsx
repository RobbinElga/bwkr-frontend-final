"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/stores/auth";
import { Icon } from "@/components/ui/Icon";
import { ProfilTab } from "@/components/auth/ProfilTab";
import { RiwayatTab } from "@/components/auth/RiwayatTab";

type Tab = "profil" | "riwayat";

export function AkunPage() {
    const { user, status } = useAuth();
    const router = useRouter();
    const params = useSearchParams();
    const [tab, setTab] = useState<Tab>(
        params.get("tab") === "riwayat" ? "riwayat" : "profil"
    );

    // Redirect ke login kalau belum login
    useEffect(() => {
        if (status === "guest") {
            router.replace("/login?next=/akun");
        }
    }, [status, router]);

    if (status === "loading" || !user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Icon name="progress_activity" className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    const initial = user.name.charAt(0).toUpperCase();

    return (
        <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 md:px-8">
            {/* Header akun */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-container text-display-lg-mobile text-on-primary">
                    {initial}
                </div>
                <div>
                    <h1 className="text-headline-lg text-on-surface">{user.name}</h1>
                    <p className="text-body-md text-on-surface-variant">{user.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-primary-fixed px-3 py-0.5 text-label-sm text-on-primary-fixed capitalize">
                        {user.role}
                    </span>
                </div>
            </div>

            {/* Tab bar */}
            <div className="mb-8 flex gap-1 rounded-xl border border-border-subtle bg-surface-container-lowest p-1 custom-shadow w-fit">
                {(["profil", "riwayat"] as Tab[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-label-md transition-all ${tab === t
                            ? "bg-primary text-on-primary shadow"
                            : "text-on-surface-variant hover:bg-surface-container-low"
                            }`}
                    >
                        <Icon name={t === "profil" ? "person" : "receipt_long"} />
                        {t === "profil" ? "Profil Saya" : "Riwayat Donasi"}
                    </button>
                ))}
            </div>

            {/* Konten tab */}
            {tab === "profil" ? <ProfilTab /> : <RiwayatTab />}
        </div>
    );
}