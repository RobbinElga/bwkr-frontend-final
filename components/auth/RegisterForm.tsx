"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { registerDonatur } from "@/services/auth";
import { useAuth } from "@/stores/auth";

export function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showCf, setShowCf] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { setUser } = useAuth();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!name.trim()) return setError("Nama lengkap wajib diisi.");
        if (!email.trim()) return setError("Email wajib diisi.");
        if (phone.replace(/\D/g, "").length < 8) return setError("Nomor WhatsApp tidak valid.");
        if (password.length < 8) return setError("Kata sandi minimal 8 karakter.");
        if (password !== confirm) return setError("Konfirmasi kata sandi tidak cocok.");
        if (!agreed) return setError("Centang persetujuan Syarat & Ketentuan terlebih dahulu.");

        try {
            setLoading(true);
            const user = await registerDonatur({
                name,
                email,
                phone,
                password,
                password_confirmation: confirm,
            });
            setUser(user);
            router.push("/");
            router.refresh();
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="flex items-start gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                    <Icon name="error" filled className="mt-0.5 shrink-0 text-[18px]" /> {error}
                </div>
            )}

            {/* Nama */}
            <Field label="Nama Lengkap" id="name" type="text" icon="person"
                value={name} onChange={setName} placeholder="Masukkan nama lengkap Anda" autoComplete="name" />

            {/* Email */}
            <Field label="Email" id="email" type="email" icon="mail"
                value={email} onChange={setEmail} placeholder="contoh@email.com" autoComplete="email" />

            {/* WhatsApp */}
            <Field label="Nomor WhatsApp" id="phone" type="tel" icon="call"
                value={phone} onChange={setPhone} placeholder="08xxxxxxxxxx" autoComplete="tel" />

            {/* Password 2 kolom */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PasswordField label="Kata Sandi" id="pw" value={password} onChange={setPassword}
                    show={showPw} onToggle={() => setShowPw((v) => !v)} autoComplete="new-password" />
                <PasswordField label="Konfirmasi Kata Sandi" id="cf" value={confirm} onChange={setConfirm}
                    show={showCf} onToggle={() => setShowCf((v) => !v)} autoComplete="new-password" />
            </div>

            {/* TOS */}
            <div className="flex items-start gap-3 py-1">
                <input
                    id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-border-subtle accent-primary"
                />
                <label htmlFor="terms" className="cursor-pointer text-label-sm text-on-surface-variant">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a>{" "}
                    serta{" "}
                    <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a>.
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary-container text-label-md text-on-primary custom-shadow transition-all duration-300 hover:bg-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <><Icon name="progress_activity" className="animate-spin" /> Memproses...</>
                ) : (
                    <><span>Daftar Sekarang</span><Icon name="arrow_forward" /></>
                )}
            </button>
        </form>
    );
}

/* ---------- Sub-komponen kecil ---------- */

function Field({ label, id, type, icon, value, onChange, placeholder, autoComplete }: {
    label: string; id: string; type: string; icon: string;
    value: string; onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-label-md text-on-surface-variant">{label}</label>
            <div className="group relative">
                <input
                    id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete}
                    className="w-full h-12 rounded-lg border border-border-subtle bg-surface px-4 pr-10 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline opacity-50 transition-all group-focus-within:text-primary group-focus-within:opacity-100">
                    {icon}
                </span>
            </div>
        </div>
    );
}

function PasswordField({ label, id, value, onChange, show, onToggle, autoComplete }: {
    label: string; id: string; value: string; onChange: (v: string) => void;
    show: boolean; onToggle: () => void; autoComplete?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-label-md text-on-surface-variant">{label}</label>
            <div className="relative">
                <input
                    id={id} type={show ? "text" : "password"} value={value}
                    onChange={(e) => onChange(e.target.value)} placeholder="••••••••"
                    autoComplete={autoComplete}
                    className="w-full h-12 rounded-lg border border-border-subtle bg-surface px-4 pr-10 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={onToggle}
                    className="absolute right-3 top-3 text-outline opacity-50 hover:text-primary hover:opacity-100"
                    aria-label={show ? "Sembunyikan" : "Tampilkan"}>
                    <Icon name={show ? "visibility_off" : "visibility"} />
                </button>
            </div>
        </div>
    );
}