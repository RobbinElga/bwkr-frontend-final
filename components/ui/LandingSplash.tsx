"use client";

import { useEffect, useState } from "react";

const HOLD = 50;  // tampil singkat (dulu 1200) — ini yang paling pengaruh ke LCP
const FADE = 300;  // durasi fade (dulu 500)

export function LandingSplash() {
    const [done, setDone] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        // Sudah pernah tampil di sesi ini? Jangan tampilkan lagi.
        if (typeof window !== "undefined" && sessionStorage.getItem("bwkr_splash")) {
            setGone(true);
            return;
        }
        const hold = setTimeout(() => {
            setDone(true);
            sessionStorage.setItem("bwkr_splash", "1");
        }, HOLD);
        return () => clearTimeout(hold);
    }, []);

    useEffect(() => {
        if (!done) return;
        const t = setTimeout(() => setGone(true), FADE + 50);
        return () => clearTimeout(t);
    }, [done]);

    if (gone) return null;

    return (
        <div className={`fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-deep-forest transition-opacity duration-300 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(146,211,192,0.25),transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-5">
                <div className="relative flex h-24 w-24 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-primary-fixed/20 animate-[spin_18s_linear_infinite]" />
                    <span className="absolute inset-2 rounded-full border border-primary-fixed/10 animate-[spin_12s_linear_infinite_reverse]" />
                    <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: 44, fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 48" }}>
                    </span>
                </div>
                <div className="text-center">
                    <p className="text-headline-md font-bold text-white">BWKR</p>
                    <p className="mt-1 text-label-sm uppercase tracking-widest text-primary-fixed">Wakaf Digital</p>
                </div>
                <span className="mt-1 block h-1 w-32 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full w-1/3 rounded-full bg-primary-fixed animate-[bwkr-splash-bar_1.2s_ease-in-out_infinite]" />
                </span>
            </div>
        </div>
    );
}