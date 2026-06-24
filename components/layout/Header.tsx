"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAuth } from "@/stores/auth";
import { ConfirmModal } from "../ui/ConfirmModal";

const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/program" },
    { label: "Dampak", href: "/#dampak" },
    { label: "Berita", href: "/berita" },
    { label: "Laporan", href: "/laporan" },
    { label: "Tentang", href: "/tentang" },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // anchor, jangan ditandai aktif
    return pathname === href || pathname.startsWith(href + "/");
}

export function Header({ settings = {} }: { settings?: Record<string, string | null> }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { user, status, logout } = useAuth();
    const [showLogout, setShowLogout] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    async function handleLogout() {
        setShowLogout(false);
        setLogoutLoading(true);
        try {
            await logout();
            router.push("/");
        } finally {
            setLogoutLoading(false);
        }
    }

    return (
        <header
            className={cn(
                "fixed left-0 top-0 z-50 w-full backdrop-blur-md transition-all",
                scrolled ? "bg-surface/95 shadow-lg" : "bg-surface/90 shadow-md"
            )}
        >
            {/* Mobile: flex (logo kiri, hamburger kanan) | Desktop: grid 3 kolom (nav center) */}
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8">
                {/* Kiri: logo */}
                <Link href="/" className="justify-self-start">
                    {settings.site_logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.site_logo} alt={settings.site_name ?? "BWKR"} className="h-9 w-auto" />
                    ) : (
                        <span className="text-headline-lg font-bold text-primary">{settings.site_name ?? "BWKR"}</span>
                    )}
                </Link>

                {/* Tengah: nav + indikator aktif (pill meluncur) — desktop only */}
                <nav className="hidden items-center gap-1 md:flex md:justify-self-center">
                    {navLinks.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={cn(
                                    "relative rounded-full px-4 py-2 text-label-md transition-colors",
                                    active ? "text-on-primary" : "text-on-surface-variant hover:text-primary"
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="navPill"
                                        className="absolute inset-0 rounded-full bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{l.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Kanan: akun + hamburger */}
                <div className="flex items-center gap-3 md:justify-self-end">
                    {/* Desktop: menu akun */}
                    <div className="hidden md:block">
                        <UserMenu />
                    </div>

                    {/* Mobile: hamburger */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="rounded-full p-2 text-primary md:hidden"
                        aria-label="Buka menu"
                    >
                        <Icon name={open ? "close" : "menu"} />
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-border-subtle bg-surface px-4 py-4 md:hidden">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((l) => {
                            const active = isActive(pathname, l.href);
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "rounded-lg px-3 py-3 text-label-md transition-colors",
                                        active
                                            ? "bg-primary text-on-primary"
                                            : "text-on-surface-variant hover:bg-surface-container-low"
                                    )}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}

                        {/* Area akun (mobile) */}
                        {status === "authenticated" && user ? (
                            <div className="mt-2 border-t border-border-subtle pt-3">
                                <div className="px-3 pb-2">
                                    <p className="truncate text-label-md text-on-surface">{user.name}</p>
                                    <p className="truncate text-label-sm text-on-surface-variant">{user.email}</p>
                                </div>
                                <Link href="/akun" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-label-md text-on-surface hover:bg-surface-container-low">
                                    <Icon name="person" className="text-on-surface-variant" /> Akun Saya
                                </Link>
                                <Link href="/akun/riwayat" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-label-md text-on-surface hover:bg-surface-container-low">
                                    <Icon name="receipt_long" className="text-on-surface-variant" /> Riwayat Donasi
                                </Link>
                                <button onClick={() => { setOpen(false); setShowLogout(true); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-label-md text-error hover:bg-error-container/40">
                                    <Icon name="logout" /> Keluar
                                </button>
                            </div>
                        ) : status === "guest" ? (
                            <div className="mt-2 flex gap-3 border-t border-border-subtle pt-3">
                                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-primary px-6 py-2 text-center text-label-md text-primary">
                                    Login
                                </Link>
                                <Link href="/daftar" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-primary px-6 py-2 text-center text-label-md text-on-primary">
                                    Daftar
                                </Link>
                            </div>
                        ) : null}
                    </nav>
                    <ConfirmModal
                        open={showLogout}
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogout(false)}
                        title="Keluar dari akun?"
                        description="Anda akan keluar dari sesi ini."
                        confirmLabel="Ya, Keluar"
                        cancelLabel="Batal"
                        variant="danger"
                        loading={logoutLoading}
                    />
                </div>
            )}
        </header>
    );
}