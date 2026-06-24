"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useAuth } from "@/stores/auth";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { updateProfile, changePassword, uploadAvatar, deleteAvatar } from "@/services/auth";

export default function ProfilPage() {
    const { user, setUser } = useAuth();

    /* ---- profil ---- */
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [profilLoading, setProfilLoading] = useState(false);
    const [profilError, setProfilError] = useState<string | null>(null);
    const [profilSuccess, setProfilSuccess] = useState(false);

    /* ---- avatar ---- */
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [avatarError, setAvatarError] = useState<string | null>(null);

    /* ---- password ---- */
    const [curPw, setCurPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [cfPw, setCfPw] = useState("");
    const [showCur, setShowCur] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showCf, setShowCf] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);
    const [pwError, setPwError] = useState<string | null>(null);
    const [pwSuccess, setPwSuccess] = useState(false);
    const [showDeleteAvatar, setShowDeleteAvatar] = useState(false);

    if (!user) return null;

    async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        e.target.value = ""; // reset agar file sama bisa dipilih ulang
        if (!file || !user) return;

        setAvatarError(null);
        if (!file.type.startsWith("image/")) return setAvatarError("File harus berupa gambar.");
        if (file.size > 5 * 1024 * 1024) return setAvatarError("Ukuran maksimal 5MB.");

        try {
            setAvatarUploading(true);
            const updated = await uploadAvatar(file);
            setUser({ ...user, ...updated });
        } catch (err) {
            setAvatarError((err as Error).message);
        } finally {
            setAvatarUploading(false);
        }
    }

    async function handleAvatarDelete() {
        if (!user) return;
        setAvatarError(null);
        try {
            setAvatarUploading(true);
            const updated = await deleteAvatar();
            setUser({ ...user, ...updated });
        } catch (err) {
            setAvatarError((err as Error).message);
        } finally {
            setAvatarUploading(false);
        }
    }

    async function handleProfil(e: React.FormEvent) {
        e.preventDefault();
        if (!user) return;
        setProfilError(null);
        setProfilSuccess(false);
        if (!name.trim()) return setProfilError("Nama tidak boleh kosong.");
        if (!email.trim()) return setProfilError("Email tidak boleh kosong.");
        try {
            setProfilLoading(true);
            const updated = await updateProfile({ name, email, phone });
            setUser({ ...user, ...updated });
            setProfilSuccess(true);
            setTimeout(() => setProfilSuccess(false), 3000);
        } catch (e) {
            setProfilError((e as Error).message);
        } finally {
            setProfilLoading(false);
        }
    }

    async function handlePassword(e: React.FormEvent) {
        e.preventDefault();
        setPwError(null);
        setPwSuccess(false);
        if (!curPw) return setPwError("Kata sandi saat ini wajib diisi.");
        if (newPw.length < 8) return setPwError("Kata sandi baru minimal 8 karakter.");
        if (newPw !== cfPw) return setPwError("Konfirmasi kata sandi tidak cocok.");
        try {
            setPwLoading(true);
            await changePassword({ current_password: curPw, password: newPw, password_confirmation: cfPw });
            setPwSuccess(true);
            setCurPw(""); setNewPw(""); setCfPw("");
            setTimeout(() => setPwSuccess(false), 3000);
        } catch (e) {
            setPwError((e as Error).message);
        } finally {
            setPwLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-headline-lg text-primary">Pengaturan Profil</h1>
                <p className="text-body-md text-on-surface-variant">Kelola informasi pribadi dan keamanan akun Anda.</p>
            </div>

            {/* ===== INFORMASI PRIBADI ===== */}
            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <Icon name="badge" filled className="text-3xl text-primary" />
                    <h2 className="text-headline-md text-on-surface">Informasi Pribadi</h2>
                </div>

                {/* Foto profil */}
                <div className="mb-6 flex flex-col items-center gap-5 border-b border-border-subtle pb-6 sm:flex-row">
                    <div className="relative">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-surface-container-high bg-primary-container">
                            {user.avatar_url ? (
                                <Image src={user.avatar_url} alt={user.name} fill className="object-cover" sizes="96px" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-display-lg-mobile text-on-primary">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            {avatarUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <Icon name="progress_activity" className="animate-spin text-on-primary" />
                                </div>
                            )}
                        </div>
                        <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-transform active:scale-90">
                            <Icon name="photo_camera" className="text-[18px]" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={avatarUploading} />
                        </label>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="text-label-md text-on-surface">Foto Profil</h4>
                        <p className="mb-1 text-body-md text-on-surface-variant">JPG, PNG, atau WebP. Maksimal 5MB.</p>
                        {avatarError && <p className="mb-1 text-label-sm text-error">{avatarError}</p>}
                        {user.avatar_url && (
                            <button
                                onClick={() => setShowDeleteAvatar(true)}
                                disabled={avatarUploading}
                                className="text-label-md text-error hover:underline disabled:opacity-50"
                            >
                                Hapus Foto
                            </button>
                        )}
                    </div>
                </div>

                {profilError && <Alert type="error" message={profilError} />}
                {profilSuccess && <Alert type="success" message="Profil berhasil diperbarui." />}

                <form onSubmit={handleProfil} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Nama Lengkap" id="name" type="text" icon="person" value={name} onChange={setName} autoComplete="name" />
                        <Field label="Alamat Email" id="email" type="email" icon="mail" value={email} onChange={setEmail} autoComplete="email" />
                        <Field label="Nomor WhatsApp" id="phone" type="tel" icon="call" value={phone} onChange={setPhone} autoComplete="tel" />
                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-on-surface-variant">Bergabung Sejak</label>
                            <div className="flex h-12 items-center gap-2 rounded-lg border border-border-subtle bg-surface-container-low px-4 text-body-md text-on-surface-variant">
                                <Icon name="calendar_today" className="text-[16px] opacity-50" />
                                {user.created_at
                                    ? new Date(user.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                                    : "—"}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={profilLoading}
                            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-label-md text-on-primary transition-all hover:bg-deep-forest active:scale-95 disabled:opacity-60">
                            {profilLoading
                                ? <><Icon name="progress_activity" className="animate-spin" /> Menyimpan...</>
                                : <><Icon name="save" /> Simpan Perubahan</>}
                        </button>
                    </div>
                </form>
            </section>

            {/* ===== KEAMANAN ===== */}
            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <Icon name="lock" filled className="text-3xl text-primary" />
                    <h2 className="text-headline-md text-on-surface">Keamanan Akun</h2>
                </div>

                {pwError && <Alert type="error" message={pwError} />}
                {pwSuccess && <Alert type="success" message="Kata sandi berhasil diperbarui." />}

                <form onSubmit={handlePassword} className="max-w-2xl space-y-5">
                    <PwField label="Kata Sandi Saat Ini" id="cur" value={curPw} onChange={setCurPw} show={showCur} onToggle={() => setShowCur(v => !v)} autoComplete="current-password" />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <PwField label="Kata Sandi Baru" id="new" value={newPw} onChange={setNewPw} show={showNew} onToggle={() => setShowNew(v => !v)} placeholder="Minimal 8 karakter" autoComplete="new-password" />
                        <PwField label="Konfirmasi Kata Sandi Baru" id="cf" value={cfPw} onChange={setCfPw} show={showCf} onToggle={() => setShowCf(v => !v)} placeholder="Ulangi kata sandi baru" autoComplete="new-password" />
                    </div>
                    <p className="flex items-center gap-2 text-label-sm text-outline">
                        <Icon name="info" className="text-[16px]" />
                        Gunakan kombinasi huruf besar, kecil, angka, dan simbol agar lebih aman.
                    </p>
                    <div className="flex justify-end">
                        <button type="submit" disabled={pwLoading}
                            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-label-md text-on-primary transition-all hover:bg-deep-forest active:scale-95 disabled:opacity-60">
                            {pwLoading
                                ? <><Icon name="progress_activity" className="animate-spin" /> Menyimpan...</>
                                : <><Icon name="key" /> Perbarui Kata Sandi</>}
                        </button>
                    </div>
                </form>
            </section>
            <ConfirmModal
                open={showDeleteAvatar}
                onConfirm={async () => {
                    setShowDeleteAvatar(false);
                    await handleAvatarDelete();
                }}
                onCancel={() => setShowDeleteAvatar(false)}
                title="Hapus foto profil?"
                description="Foto profil Anda akan dihapus dan diganti dengan inisial nama."
                confirmLabel="Ya, Hapus"
                cancelLabel="Batal"
                variant="warning"
            />
        </div>
    );
}

/* ===== Sub-komponen ===== */

function Alert({ type, message }: { type: "error" | "success"; message: string }) {
    const styles = type === "error" ? "bg-error-container text-on-error-container" : "bg-primary-fixed text-on-primary-fixed";
    const icon = type === "error" ? "error" : "check_circle";
    return (
        <div className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-label-md ${styles}`}>
            <Icon name={icon} filled className="shrink-0 text-[18px]" /> {message}
        </div>
    );
}

function Field({ label, id, type, icon, value, onChange, autoComplete }: {
    label: string; id: string; type: string; icon: string; value: string; onChange: (v: string) => void; autoComplete?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-label-md text-on-surface-variant">{label}</label>
            <div className="group relative">
                <input id={id} type={type} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-full rounded-lg border border-border-subtle bg-surface-gray px-4 pr-10 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <span className="material-symbols-outlined absolute right-3 top-3 text-outline opacity-40 transition-all group-focus-within:text-primary group-focus-within:opacity-100">{icon}</span>
            </div>
        </div>
    );
}

function PwField({ label, id, value, onChange, show, onToggle, placeholder, autoComplete }: {
    label: string; id: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; placeholder?: string; autoComplete?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-label-md text-on-surface-variant">{label}</label>
            <div className="relative">
                <input id={id} type={show ? "text" : "password"} value={value} placeholder={placeholder ?? "••••••••"} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-full rounded-lg border border-border-subtle bg-surface-gray px-4 pr-10 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <button type="button" onClick={onToggle} className="absolute right-3 top-3 text-outline opacity-50 hover:text-primary hover:opacity-100" aria-label={show ? "Sembunyikan" : "Tampilkan"}>
                    <Icon name={show ? "visibility_off" : "visibility"} />
                </button>
            </div>
        </div>
    );
}