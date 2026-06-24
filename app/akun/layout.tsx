"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/stores/auth";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

const NAV = [
    { label: "Ringkasan", href: "/akun", icon: "dashboard" },
    { label: "Riwayat", href: "/akun/riwayat", icon: "receipt_long" },
    { label: "Profil", href: "/akun/profil", icon: "person" },
];

export default function AkunLayout({ children }: { children: React.ReactNode }) {
    const { user, status, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [showLogout, setShowLogout] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    // Guard: kalau belum login, lempar ke /login
    useEffect(() => {
        if (status === "guest") router.replace(`/login?next=${pathname}`);
    }, [status, pathname, router]);

    async function handleLogout() {
        await logout();
        router.push("/");
    }

    async function handleLogoutConfirmed() {
        setShowLogout(false);
        setLogoutLoading(true);
        try {
            await logout();
            router.push("/");
        } finally {
            setLogoutLoading(false);
        }
    }

    if (status === "loading" || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Icon name="progress_activity" className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    return (
        <>
            <Header />

            <div className="mx-auto flex max-w-7xl gap-8 px-4 pb-28 pt-28 md:px-8 md:pb-16">
                {/* Sidebar — desktop */}
                <aside className="hidden w-64 shrink-0 md:block">
                    <div className="sticky top-28 rounded-xl border border-border-subtle bg-surface-container-lowest p-4 custom-shadow">
                        <p className="mb-4 px-3 text-label-sm uppercase tracking-widest text-outline">Menu Akun</p>
                        <nav className="space-y-1">
                            {NAV.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-3 text-label-md transition-all",
                                            active
                                                ? "bg-primary font-bold text-on-primary shadow-sm"
                                                : "text-on-surface-variant hover:bg-surface-container-low"
                                        )}
                                    >
                                        <Icon name={item.icon} filled={active} className="text-[20px]" /> {item.label}
                                    </Link>
                                );
                            })}
                            <div className="my-3 h-px bg-border-subtle" />
                            <button
                                onClick={() => setShowLogout(true)}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-label-md text-error transition-colors hover:bg-error-container/40"
                            >
                                <Icon name="logout" className="text-[20px]" /> Keluar
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Konten utama */}
                <main className="min-w-0 flex-grow">{children}</main>
            </div>

            <Footer />
            {/* spacer agar footer tidak tertutup bottom bar di mobile */}
            <div className="h-16 md:hidden" />

            {/* Bottom bar — mobile */}
            <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-border-subtle bg-surface-container-lowest md:hidden">
                <div className="grid grid-cols-4">
                    {NAV.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-0.5 py-2.5 text-label-sm transition-colors",
                                    active ? "text-primary" : "text-on-surface-variant"
                                )}
                            >
                                <Icon name={item.icon} filled={active} /> {item.label}
                            </Link>
                        );
                    })}
                    <button onClick={() => setShowLogout(true)} className="flex flex-col items-center gap-0.5 py-2.5 text-label-sm text-error">
                        <Icon name="logout" /> Keluar
                    </button>
                </div>
            </nav>
            <ConfirmModal
                open={showLogout}
                onConfirm={handleLogoutConfirmed}
                onCancel={() => setShowLogout(false)}
                title="Keluar dari akun?"
                description="Sesi Anda akan diakhiri. Sampai jumpa kembali!"
                confirmLabel="Ya, Keluar"
                cancelLabel="Tetap di sini"
                variant="danger"
                loading={logoutLoading}
            />
        </>
    );
}