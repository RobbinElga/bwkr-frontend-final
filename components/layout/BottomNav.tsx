"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const items = [
    { label: "Beranda", href: "/", icon: "home" },
    { label: "Program", href: "/program", icon: "grid_view" },
    { label: "Donasi", href: "/donasi", icon: "volunteer_activism" },
    { label: "Berita", href: "/berita", icon: "newspaper" },
    { label: "Akun", href: "/akun", icon: "person" },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            aria-label="Navigasi utama"
        >
            <ul className="grid grid-cols-5">
                {items.map((it) => {
                    const active = isActive(pathname, it.href);
                    const center = it.href === "/donasi";
                    return (
                        <li key={it.href} className="flex">
                            <Link href={it.href} className="group flex flex-1 flex-col items-center justify-center gap-0.5 py-2">
                                <motion.span
                                    whileTap={{ scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                    className={cn(
                                        "relative flex items-center justify-center rounded-full transition-colors",
                                        center
                                            ? "-mt-6 h-12 w-12 bg-primary text-on-primary shadow-lg ring-4 ring-surface"
                                            : cn("h-9 w-9", active ? "text-primary" : "text-on-surface-variant")
                                    )}
                                >
                                    {active && !center && (
                                        <motion.span
                                            layoutId="bnPill"
                                            className="absolute inset-0 rounded-full bg-primary/10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <Icon name={it.icon} filled={active || center} className={cn("relative z-10", center ? "text-[24px]" : "text-[22px]")} />
                                </motion.span>
                                <span className={cn("text-[11px] leading-none transition-colors", active ? "font-semibold text-primary" : "text-on-surface-variant")}>
                                    {it.label}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}