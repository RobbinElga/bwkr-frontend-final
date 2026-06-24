"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useAuth } from "@/stores/auth";

export function UserMenu() {
    const { user, status, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handle(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    // Tutup dropdown dulu, baru buka modal di tick berikutnya
    const openLogoutModal = useCallback(() => {
        setOpen(false);
        setTimeout(() => setShowLogout(true), 0);
    }, []);

    if (status === "loading") {
        return (
            <div className="flex items-center gap-2">
                <div className="h-9 w-9 animate-pulse rounded-full bg-surface-container-high" />
                <div className="hidden h-4 w-20 animate-pulse rounded bg-surface-container-high sm:block" />
            </div>
        );
    }

    if (status !== "authenticated" || !user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/login"
                    className="rounded-full px-5 py-2 text-label-md text-primary transition-colors hover:bg-surface-container-low"
                >
                    Login
                </Link>
                <Link
                    href="/daftar"
                    className="rounded-full bg-primary px-5 py-2 text-label-md text-on-primary transition-all hover:bg-deep-forest active:scale-95"
                >
                    Daftar
                </Link>
            </div>
        );
    }

    async function handleLogout() {
        setShowLogout(false);
        setLogoutLoading(true);
        try {
            await logout();
            router.push("/");
            router.refresh();
        } finally {
            setLogoutLoading(false);
        }
    }

    const menuItems = [
        { href: "/akun", icon: "dashboard", label: "Ringkasan", desc: "Lihat dampak wakaf Anda" },
        { href: "/akun/riwayat", icon: "receipt_long", label: "Riwayat Donasi", desc: "Histori transaksi wakaf" },
        { href: "/akun/profil", icon: "manage_accounts", label: "Pengaturan Profil", desc: "Kelola info & keamanan" },
    ];

    return (
        <>
            {/* Dropdown wrapper */}
            <div className="relative" ref={ref}>
                {/* Trigger */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="group flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface-container-lowest py-1.5 pl-1.5 pr-3 transition-all hover:border-primary/30 hover:bg-surface-container-low hover:shadow-sm"
                >
                    <Avatar name={user.name} src={user.avatar_url} size={32} />
                    <span className="hidden max-w-[7rem] truncate text-label-md text-on-surface sm:block">
                        {user.name.split(" ")[0]}
                    </span>
                    <Icon
                        name="expand_more"
                        className={`text-on-surface-variant transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                </button>

                {/* Dropdown panel — hanya render kalau open DAN modal tidak tampil */}
                {open && !showLogout && (
                    <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-border-subtle bg-surface-container-lowest shadow-2xl">
                        {/* Header profil */}
                        <div className="flex items-center gap-3 border-b border-border-subtle bg-gradient-to-r from-primary/5 to-primary/10 p-4">
                            <Avatar name={user.name} src={user.avatar_url} size={44} />
                            <div className="min-w-0">
                                <p className="truncate text-label-md font-bold text-on-surface">{user.name}</p>
                                <p className="truncate text-label-sm text-on-surface-variant">{user.email}</p>
                                <span className="mt-1 inline-block rounded-full bg-primary-fixed px-2 py-0.5 text-label-sm text-on-primary-fixed capitalize">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-primary/5"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors group-hover:bg-primary group-hover:text-on-primary">
                                        <Icon name={item.icon} className="text-[18px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-label-md text-on-surface">{item.label}</p>
                                        <p className="text-label-sm text-on-surface-variant">{item.desc}</p>
                                    </div>
                                    <Icon
                                        name="chevron_right"
                                        className="ml-auto text-outline opacity-0 transition-opacity group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Keluar */}
                        <div className="border-t border-border-subtle p-2">
                            <button
                                onClick={openLogoutModal}
                                className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-error-container/40"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors group-hover:bg-error-container group-hover:text-error">
                                    <Icon name="logout" className="text-[18px]" />
                                </div>
                                <div>
                                    <p className="text-label-md text-error">Keluar</p>
                                    <p className="text-label-sm text-on-surface-variant">Akhiri sesi ini</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal konfirmasi logout — di luar div dropdown agar z-index bebas */}
            <ConfirmModal
                open={showLogout}
                onConfirm={handleLogout}
                onCancel={() => setShowLogout(false)}
                title="Keluar dari akun?"
                description="Anda akan keluar dari sesi ini. Token login akan dihapus."
                confirmLabel="Ya, Keluar"
                cancelLabel="Batal"
                variant="danger"
                loading={logoutLoading}
            />
        </>
    );
}