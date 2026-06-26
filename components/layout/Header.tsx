"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAuth } from "@/stores/auth";
import { ConfirmModal } from "../ui/ConfirmModal";
import type { SiteSettings } from "@/services/public";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/program" },
    { label: "Dampak", href: "/dampak" },
    { label: "Berita", href: "/berita" },
    { label: "Laporan", href: "/laporan" },
    { label: "Tentang", href: "/tentang" },
];

export function Header({ settings = {} }: { settings?: SiteSettings }) {
    const logo = settings.site_logo ?? null;
    const siteName = settings.site_name || "BWKR";
    const pathname = usePathname();
    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { user, status, logout } = useAuth();
    const [showLogout, setShowLogout] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
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
            <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2 text-headline-lg font-bold text-primary">
                    {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt={siteName} className="h-16 w-auto object-contain md:h-20" />
                    ) : (
                        siteName
                    )}
                </Link>

                {/* Navigasi tengah + active */}
                <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navLinks.map((l) => {
                        const active = isActive(l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={cn(
                                    "relative py-1 text-label-md transition-colors",
                                    active ? "font-semibold text-primary" : "text-on-surface-variant hover:text-primary"
                                )}
                            >
                                {l.label}
                                {active && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Aksi kanan */}
                <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden md:block">
                        <UserMenu />
                    </div>
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
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-3 text-label-md text-on-surface-variant hover:bg-surface-container-low"
                            >
                                {l.label}
                            </Link>
                        ))}

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