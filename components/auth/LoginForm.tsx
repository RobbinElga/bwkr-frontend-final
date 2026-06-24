"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { loginDonatur } from "@/services/auth";
import { useAuth } from "@/stores/auth";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { setUser } = useAuth();
    const router = useRouter();
    const params = useSearchParams();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!email.trim()) return setError("Email wajib diisi.");
        if (!password) return setError("Kata sandi wajib diisi.");

        try {
            setLoading(true);
            const user = await loginDonatur(email, password);
            setUser(user);
            // redirect ke halaman sebelumnya, atau beranda
            const next = params.get("next") ?? "/";
            router.push(next);
            router.refresh(); // paksa server component ikut update
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                    <Icon name="error" filled className="shrink-0 text-[18px]" /> {error}
                </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-label-md text-on-surface-variant" htmlFor="email">Email</label>
                <div className="group relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">mail</span>
                    <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contoh@email.com"
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-lowest py-3.5 pl-12 pr-4 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-label-md text-on-surface-variant" htmlFor="password">Kata Sandi</label>
                    <Link href="#" className="text-label-md text-primary hover:underline">Lupa Kata Sandi?</Link>
                </div>
                <div className="group relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">lock</span>
                    <input
                        id="password"
                        type={showPw ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-border-subtle bg-surface-container-lowest py-3.5 pl-12 pr-12 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                        aria-label={showPw ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    >
                        <Icon name={showPw ? "visibility_off" : "visibility"} />
                    </button>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-body-lg font-semibold text-on-primary shadow-md transition-all hover:bg-deep-forest active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <><Icon name="progress_activity" className="animate-spin" /> Memproses...</>
                ) : "Masuk Sekarang"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border-subtle" />
                <span className="mx-4 text-label-sm uppercase tracking-wider text-outline">atau</span>
                <div className="flex-grow border-t border-border-subtle" />
            </div>

        </form>
    );
}