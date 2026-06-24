"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/stores/auth";
import { updateProfile } from "@/services/auth";

export function ProfilTab() {
    const { user, setUser } = useAuth();

    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!name.trim()) return setError("Nama tidak boleh kosong.");
        if (!email.trim()) return setError("Email tidak boleh kosong.");

        try {
            setLoading(true);
            const updated = await updateProfile({ name, email, phone });
            setUser(updated);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg">
            <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                <h2 className="mb-6 text-headline-md text-on-surface">Informasi Akun</h2>

                {error && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
                        <Icon name="error" filled className="shrink-0 text-[18px]" /> {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-primary-fixed px-4 py-3 text-label-md text-on-primary-fixed">
                        <Icon name="check_circle" filled className="shrink-0 text-[18px]" /> Profil berhasil diperbarui.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Field label="Nama Lengkap" id="name" type="text" icon="person"
                        value={name} onChange={setName} autoComplete="name" />
                    <Field label="Email" id="email" type="email" icon="mail"
                        value={email} onChange={setEmail} autoComplete="email" />
                    <Field label="Nomor WhatsApp" id="phone" type="tel" icon="call"
                        value={phone} onChange={setPhone} autoComplete="tel" />

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-label-md text-on-primary transition-all hover:bg-deep-forest active:scale-95 disabled:opacity-60"
                        >
                            {loading
                                ? <><Icon name="progress_activity" className="animate-spin" /> Menyimpan...</>
                                : <><Icon name="save" /> Simpan Perubahan</>
                            }
                        </button>
                    </div>
                </form>
            </div>

            {/* Info keamanan */}
            <div className="mt-4 rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow">
                <h3 className="mb-4 flex items-center gap-2 text-label-md text-on-surface">
                    <Icon name="lock" className="text-primary" /> Keamanan
                </h3>
                <p className="mb-4 text-body-md text-on-surface-variant">
                    Ingin mengganti kata sandi? Gunakan fitur di bawah ini.
                </p>
                <a
                    href="/ganti-password"
                    className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
                >
                    <Icon name="key" /> Ganti Kata Sandi
                </a>
            </div>
        </div >
    );
}

function Field({ label, id, type, icon, value, onChange, autoComplete }: {
    label: string; id: string; type: string; icon: string;
    value: string; onChange: (v: string) => void; autoComplete?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-label-md text-on-surface-variant">{label}</label>
            <div className="group relative">
                <input
                    id={id} type={type} value={value} autoComplete={autoComplete}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-border-subtle bg-surface-gray px-4 py-3 pr-10 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline opacity-40 transition-all group-focus-within:text-primary group-focus-within:opacity-100">
                    {icon}
                </span>
            </div>
        </div>
    );
}