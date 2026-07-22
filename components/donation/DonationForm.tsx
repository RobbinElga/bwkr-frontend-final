"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { submitDonation, type DonationResult } from "@/services/donation";
import type { BankAccount, Program, Project } from "@/types";
import { useAuth } from "@/stores/auth";


const QUICK = [50_000, 100_000, 250_000, 500_000];

export function DonationForm({
    programs,
    projects,
    banks,
    initialProgramId,
    initialProjectId,
}: {
    programs: Program[];
    projects: Project[];
    banks: BankAccount[];
    initialProgramId: number | null;
    initialProjectId: number | null;
}) {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const [programId, setProgramId] = useState<number | null>(initialProgramId ?? programs[0]?.id ?? null);
    const [projectId, setProjectId] = useState<number | null>(initialProjectId ?? null);

    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [salutation, setSalutation] = useState("");
    const [phone, setPhone] = useState("");
    const [onBehalf, setOnBehalf] = useState("");
    const [message, setMessage] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const [bankId, setBankId] = useState<number | null>(banks[0]?.id ?? null);
    const [proof, setProof] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<DonationResult | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const projectsOfProgram = projects.filter((p) => p.program_id === programId);
    const selectedProject = projects.find((p) => p.id === projectId) ?? null;
    const selectedProgram = programs.find((p) => p.id === programId) ?? null;
    const availableBanks =
        selectedProject?.bank_accounts && selectedProject.bank_accounts.length > 0
            ? selectedProject.bank_accounts
            : banks;
    const selectedBank = availableBanks.find((b) => b.id === bankId) ?? null;
    const { user, status } = useAuth();

    useEffect(() => {
        if (user) {
            setName((prev) => prev || user.name);
            setPhone((prev) => prev || (user.phone ?? ""));
        }
    }, [user]);

    useEffect(() => {
        const list = selectedProject?.bank_accounts?.length ? selectedProject.bank_accounts : banks;
        setBankId((prev) => (list.some((b) => b.id === prev) ? prev : list[0]?.id ?? null));
    }, [projectId]);


    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    }
    function copy(text: string, label: string) {
        navigator.clipboard?.writeText(text);
        showToast(`${label} tersalin`);
    }

    function changeProgram(id: number) {
        setProgramId(id);
        setProjectId(null);
    }

    function gotoStep2() {
        setError(null);
        if (amount < 1000) return setError("Nominal minimal Rp1.000.");
        if (!name.trim()) return setError("Nama wajib diisi.");
        if (phone.replace(/\D/g, "").length < 8) return setError("Nomor WhatsApp tidak valid.");
        setStep(2);
    }

    async function handleSubmit() {
        setError(null);
        if (!bankId) return setError("Pilih rekening tujuan transfer.");
        if (!proof) return setError("Unggah bukti transfer terlebih dahulu.");

        const form = new FormData();
        form.append("donor_name", name);
        if (salutation) form.append("salutation", salutation);
        form.append("donor_phone", phone);
        form.append("amount", String(amount));
        form.append("bank_account_id", String(bankId));
        if (onBehalf) form.append("on_behalf", onBehalf);
        if (anonymous) form.append("donor_alias", "Hamba Allah");
        if (programId) form.append("program_id", String(programId));
        if (projectId) form.append("project_id", String(projectId));
        if (onBehalf) form.append("on_behalf", onBehalf);
        if (message) form.append("message", message);
        form.append("donation_date", new Date().toISOString().split("T")[0]);
        form.append("proof", proof);

        try {
            setSubmitting(true);
            setResult(await submitDonation(form));
            setStep(3);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setSubmitting(false);
        }
    }

    async function downloadQris() {
        const url = selectedBank?.qris_image_url;
        if (!url) return;
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const obj = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = obj;
            a.download = `QRIS-${selectedBank?.bank_name ?? "wakaf"}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(obj);
            showToast("QRIS diunduh");
        } catch {
            window.open(url, "_blank", "noopener,noreferrer"); // fallback
        }
    }

    const targetName = selectedProject?.name ?? selectedProgram?.name ?? "Wakaf Umum BWKR";
    const targetDesc = selectedProject?.description ?? selectedProgram?.description ?? "Setiap rupiah Anda menjadi amal jariyah yang terus mengalir.";
    const targetImage = selectedProject?.image_urls?.[0] ?? null;

    return (
        <>
            {/* ============ STEP 3: SUKSES ============ */}
            {step === 3 && result && (
                <div className="mx-auto max-w-2xl rounded-xl border border-border-subtle bg-surface-container-lowest p-8 text-center custom-shadow">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                        <Icon name="check_circle" filled className="text-4xl" />
                    </div>
                    <h2 className="text-headline-lg text-primary">Jazakumullah Khairan!</h2>
                    <p className="mt-2 text-body-md text-on-surface-variant">
                        Donasi Anda telah kami terima &amp; sedang diverifikasi. Konfirmasi dikirim via WhatsApp.
                    </p>
                    <div className="mx-auto my-6 max-w-xs rounded-xl bg-surface-gray p-4">
                        <p className="text-label-sm text-on-surface-variant">Nomor Referensi</p>
                        <p className="text-headline-md tracking-widest text-primary">{result.ref_no}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href={`/cek-status?ref=${result.ref_no}`} className="flex-1 rounded-xl bg-primary py-3 text-center text-label-md text-on-primary hover:bg-deep-forest">Cek Status</Link>
                        <Link href="/" className="flex-1 rounded-xl border border-border-subtle py-3 text-center text-label-md text-on-surface-variant hover:bg-surface-container-low">Kembali ke Beranda</Link>
                    </div>
                </div>
            )}

            {/* ============ STEP 2: KONFIRMASI PEMBAYARAN ============ */}
            {step === 2 && (
                <div>
                    <div className="mb-8 flex items-center gap-3">
                        <button onClick={() => setStep(1)} className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container" aria-label="Kembali">
                            <Icon name="arrow_back" />
                        </button>
                        <h1 className="text-headline-lg text-primary">Konfirmasi Pembayaran</h1>
                    </div>

                    {error && <ErrorBox message={error} />}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* KIRI */}
                        <div className="space-y-6 lg:col-span-8">
                            {/* Ringkasan transaksi */}
                            <section className="flex flex-col gap-6 overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:flex-row md:p-8">
                                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-surface-container-high md:w-1/3">
                                    {targetImage ? (
                                        <Image src={targetImage} alt={targetName} fill className="object-cover" sizes="(max-width:768px) 100vw, 240px" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-on-surface-variant">
                                            <Icon name="volunteer_activism" filled className="text-4xl opacity-40" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col justify-center">
                                    <span className="mb-2 inline-block w-fit rounded-full bg-primary-fixed px-3 py-1 text-label-sm text-on-primary-fixed">
                                        {selectedProgram?.name ?? "Program Wakaf"}
                                    </span>
                                    <h2 className="mb-2 text-headline-md text-on-surface">{targetName}</h2>
                                    <p className="mb-4 line-clamp-2 text-body-md leading-relaxed text-on-surface-variant">{targetDesc}</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">Nominal Donasi</p>
                                            <p className="text-display-lg-mobile text-primary">{formatRupiah(amount)}</p>
                                        </div>
                                        <button onClick={() => copy(String(amount), "Nominal")} className="flex items-center gap-1 rounded-lg p-2 text-label-md text-primary hover:bg-surface-container-low">
                                            <Icon name="content_copy" /> Salin
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Pilih rekening */}
                            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                                <h3 className="mb-6 text-headline-md text-on-surface">Pilih Rekening Tujuan</h3>
                                {banks.length === 0 ? (
                                    <p className="rounded-xl border border-dashed border-border-subtle p-4 text-center text-on-surface-variant">
                                        Belum ada rekening tujuan. Hubungi admin.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {banks.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => setBankId(b.id)}
                                                className={cn(
                                                    "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                                                    bankId === b.id ? "border-2 border-primary bg-primary/5" : "border border-border-subtle hover:border-primary/50"
                                                )}
                                            >
                                                <div>
                                                    <p className="text-label-md text-on-surface">{b.bank_name}</p>
                                                    <p className="text-label-sm text-on-surface-variant">{b.type === "qris" ? "Bayar via QRIS" : `a.n. ${b.account_name}`}</p>
                                                </div>
                                                <Icon
                                                    name={bankId === b.id ? "check_circle" : "circle"}
                                                    filled={bankId === b.id}
                                                    className={bankId === b.id ? "text-primary" : "text-on-surface-variant opacity-20"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Detail rekening terpilih */}
                            {selectedBank && (
                                <section className="grid grid-cols-1 gap-6 rounded-xl border border-primary/20 bg-primary/5 p-6 custom-shadow md:grid-cols-2 md:p-8">
                                    {selectedBank.type === "qris" ? (
                                        <div className="flex flex-col items-center justify-center gap-3 text-center">
                                            <p className="text-label-sm uppercase tracking-wider text-on-surface-variant">Scan untuk Membayar</p>
                                            {selectedBank.qris_image_url ? (
                                                <>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={selectedBank.qris_image_url}
                                                        alt="QRIS"
                                                        className="h-60 w-60 rounded-xl border border-border-subtle bg-white object-contain p-2"
                                                    />
                                                    <button
                                                        onClick={downloadQris}
                                                        className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-label-md text-primary transition-colors hover:bg-primary/5"
                                                    >
                                                        <Icon name="download" /> Unduh QRIS
                                                    </button>
                                                </>
                                            ) : (
                                                <p className="text-on-surface-variant">Gambar QRIS belum tersedia.</p>
                                            )}
                                            <p className="text-label-md text-primary">{selectedBank.bank_name}</p>
                                            <p className="text-label-sm text-on-surface-variant">Scan dengan aplikasi m-banking / e-wallet apa pun yang mendukung QRIS.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-label-sm text-on-surface-variant">Metode Pembayaran</p>
                                                <p className="text-headline-md text-primary">Transfer {selectedBank.bank_name}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">Nomor Rekening</p>
                                                <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-white p-4">
                                                    <p className="text-headline-md tracking-widest text-on-surface">{selectedBank.account_number}</p>
                                                    <button onClick={() => copy(selectedBank.account_number ?? "", "Nomor rekening")} className="text-primary transition-transform hover:scale-110">
                                                        <Icon name="content_copy" />
                                                    </button>
                                                </div>
                                                <p className="mt-2 px-1 text-label-sm text-on-surface-variant">Atas Nama: <span className="font-bold">{selectedBank.account_name}</span></p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-col justify-center rounded-xl border border-dashed border-primary/30 bg-white/50 p-4">
                                        <h4 className="mb-3 flex items-center gap-2 text-label-md text-primary">
                                            <Icon name="info" filled className="text-[18px]" /> Penting
                                        </h4>
                                        <ul className="space-y-2 text-label-md text-on-surface-variant">
                                            {["Transfer tepat sesuai nominal yang tertera.", "Verifikasi manual oleh admin, mohon menunggu.", "Simpan bukti transfer Anda."].map((t) => (
                                                <li key={t} className="flex gap-2"><span className="font-bold text-primary">•</span>{t}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            )}

                            {/* Instruksi pembayaran */}
                            <section className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                                <h3 className="mb-6 text-headline-md text-on-surface">Instruksi Pembayaran</h3>
                                <ol className="space-y-6">
                                    {(selectedBank?.type === "qris"
                                        ? [
                                            ["Buka aplikasi pembayaran", "Gunakan m-banking / e-wallet yang mendukung QRIS (GoPay, OVO, Dana, dll.)."],
                                            ["Scan kode QRIS", "Scan QR pada panel di atas, lalu masukkan nominal sesuai donasi Anda."],
                                            ["Konfirmasi & simpan bukti", "Selesaikan pembayaran, simpan struk/screenshot, lalu unggah di panel kanan."],
                                        ]
                                        : [
                                            ["Buka aplikasi bank / m-banking", "Pilih menu transfer ke rekening bank tujuan."],
                                            ["Masukkan nomor rekening yayasan", selectedBank ? `Tujuan: ${selectedBank.account_number} a.n. ${selectedBank.account_name}.` : "Pilih metode pembayaran terlebih dahulu."],
                                            ["Konfirmasi & simpan bukti", "Pastikan nominal sesuai, simpan struk/screenshot, lalu unggah di panel kanan."],
                                        ]
                                    ).map(([title, desc], i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed font-bold text-primary">{i + 1}</span>
                                            <div>
                                                <h4 className="mb-1 text-label-md text-on-surface">{title}</h4>
                                                <p className="text-body-md text-on-surface-variant">{desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        </div>

                        {/* KANAN: unggah bukti (sticky) */}
                        <aside className="lg:col-span-4">
                            <section className="sticky top-28 rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow">
                                <h3 className="mb-6 text-headline-md text-on-surface">Unggah Bukti</h3>

                                <label
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) setProof(f); }}
                                    className={cn(
                                        "group mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all",
                                        dragOver ? "border-primary bg-primary/10" : "border-outline-variant hover:border-primary hover:bg-primary/5"
                                    )}
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors group-hover:bg-primary-fixed">
                                        <Icon name="cloud_upload" className="text-4xl" />
                                    </div>
                                    <div>
                                        <p className="text-label-md text-on-surface">Klik untuk unggah atau seret file</p>
                                        <p className="mt-1 text-label-sm text-on-surface-variant">JPG, PNG, atau PDF (maks 10MB)</p>
                                    </div>
                                    <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setProof(e.target.files?.[0] ?? null)} />
                                </label>

                                {proof && (
                                    <div className="mb-6 flex items-center gap-3 rounded-lg bg-surface-container p-4">
                                        <Icon name="description" className="text-primary" />
                                        <span className="flex-1 truncate text-label-md text-on-surface">{proof.name}</span>
                                        <button onClick={() => setProof(null)} className="text-error transition-transform hover:scale-110" aria-label="Hapus">
                                            <Icon name="close" />
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={!proof || submitting}
                                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-label-md text-on-primary shadow-lg transition-all hover:bg-deep-forest active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <Icon name="progress_activity" className="animate-spin" /> Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <Icon name="check_circle" filled /> Konfirmasi Pembayaran
                                        </>
                                    )}
                                </button>
                                <p className="mt-4 px-2 text-center text-label-sm text-on-surface-variant">
                                    Dengan klik tombol di atas, Anda menyatakan telah melakukan transfer sesuai nominal & berniat mewakafkannya karena Allah.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            )}

            {/* ============ STEP 1: FORM (2 KOLOM) ============ */}
            {step === 1 && (
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="rounded-xl border border-border-subtle bg-surface-container-lowest p-6 custom-shadow md:p-8">
                            <div className="mb-6">
                                <h1 className="text-headline-lg text-primary">Wakaf Tunai</h1>
                                <p className="text-body-md text-on-surface-variant">Berikan kebaikan yang berkelanjutan melalui wakaf tunai produktif.</p>
                            </div>

                            <StepBar step={step} />
                            {status === "authenticated" && user ? (
                                <div className="mb-4 flex items-center gap-2 rounded-xl bg-primary-fixed px-4 py-3 text-label-md text-on-primary-fixed">
                                    <Icon name="account_circle" filled className="text-[18px]" />
                                    Login sebagai <span className="font-bold">{user.name}</span> — biodata terisi otomatis.
                                </div>
                            ) : (
                                <div className="mb-4 flex items-start gap-2 rounded-xl border border-border-subtle bg-surface-gray px-4 py-3 text-label-md text-on-surface-variant">
                                    <Icon name="info" filled className="mt-0.5 shrink-0 text-[18px] text-primary" />
                                    <span>
                                        Dianjurkan{" "}
                                        <Link href="/login?next=/donasi" className="font-bold text-primary hover:underline">login</Link>{" "}
                                        agar donasi tercatat di akun &amp; riwayat Anda. Tetap bisa berdonasi sebagai tamu.
                                    </span>
                                </div>
                            )}
                            {error && <ErrorBox message={error} />}

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <SelectField label="Sapaan (opsional)" value={salutation} onChange={setSalutation}>
                                        <option value="">— Pilih —</option>
                                        {["Pak", "Bu", "Bang", "Kak", "Dek", "Ustadz", "Ustadzah", "Mas", "Mbak"].map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </SelectField>
                                    <Field label="Nama Lengkap" value={name} onChange={setName} placeholder="Nama sesuai KTP" />
                                    <Field label="Nomor WhatsApp" value={phone} onChange={setPhone} placeholder="0812xxxx" type="tel" />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <SelectField label="Pilih Program" value={programId ?? ""} onChange={(v) => changeProgram(Number(v))} disabled={programs.length === 0}>
                                        {programs.length === 0 ? <option value="">Belum ada program</option> : programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </SelectField>
                                    <SelectField label="Pilih Proyek" value={projectId ?? ""} onChange={(v) => setProjectId(v ? Number(v) : null)}>
                                        <option value="">Umum (program ini)</option>
                                        {projectsOfProgram.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </SelectField>
                                </div>

                                <div>
                                    <label className="mb-3 block text-label-md text-on-surface-variant">Nominal Wakaf</label>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {QUICK.map((v) => (
                                            <button key={v} onClick={() => setAmount(v)} type="button"
                                                className={cn("rounded-lg border-2 py-3 text-label-md transition-all",
                                                    amount === v ? "border-primary-container bg-primary-container text-on-primary" : "border-outline-variant text-on-surface-variant hover:border-primary-container")}>
                                                {formatRupiah(v)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-label-md text-on-surface-variant">Atau isi nominal sendiri</label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body-md text-on-surface-variant">Rp</span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={amount ? amount.toLocaleString("id-ID") : ""}
                                            onChange={(e) => {
                                                const digits = e.target.value.replace(/\D/g, ""); // angka saja
                                                setAmount(digits ? Number(digits) : 0);
                                            }}
                                            placeholder="mis. 75.000"
                                            className="w-full rounded-lg border border-outline-variant bg-surface-gray py-3 pl-11 pr-4 text-body-md text-on-surface outline-none focus:border-primary"
                                        />
                                    </div>
                                    <p className="mt-1 text-label-sm text-on-surface-variant">Minimal Rp1.000.</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-label-md text-on-surface-variant">Tampil di daftar donatur sebagai</label>
                                    <button
                                        type="button"
                                        onClick={() => setAnonymous((v) => !v)}
                                        className={cn(
                                            "inline-flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-label-md transition-colors",
                                            anonymous
                                                ? "border-primary-container bg-primary-container text-on-primary"
                                                : "border-outline-variant text-on-surface-variant hover:border-primary-container"
                                        )}
                                    >
                                        <Icon name={anonymous ? "check_circle" : "volunteer_activism"} />
                                        Berwakaf sebagai Hamba Allah (anonim)
                                    </button>
                                    {anonymous && (
                                        <p className="text-label-sm text-on-surface-variant">Nama Anda tidak ditampilkan publik; di daftar donatur akan tertulis "Hamba Allah".</p>
                                    )}
                                </div>

                                <Field label="Atas Nama (opsional)" value={onBehalf} onChange={setOnBehalf} placeholder="mis. Keluarga Fulan" />

                                <div>
                                    <label className="mb-2 block text-label-md text-on-surface-variant">Pesan / Doa Wakaf</label>
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Tuliskan doa terbaik Anda..."
                                        className="w-full resize-none rounded-lg border border-outline-variant bg-surface-gray p-4 text-body-md text-on-surface outline-none focus:border-primary" />
                                </div>


                                <div className="pt-2">
                                    <button onClick={gotoStep2} className="w-full rounded-xl bg-primary-container py-4 text-headline-md text-on-primary shadow-lg transition-all hover:bg-primary active:scale-[0.98]">
                                        Lanjutkan Pembayaran
                                    </button>
                                    <p className="mt-4 flex items-center justify-center gap-1 text-center text-label-sm text-on-surface-variant">
                                        <Icon name="verified_user" className="text-[16px]" /> Data Anda aman &amp; terenkripsi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <ImpactCard project={selectedProject} programName={selectedProgram?.name ?? null} />
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full bg-on-background px-6 py-3 text-label-md text-white shadow-2xl">
                    <Icon name="check_circle" filled className="text-primary-fixed-dim text-[18px]" /> {toast}
                </div>
            )}
        </>
    );
}

/* ---------- Sub-komponen ---------- */

function ImpactCard({ project, programName }: { project: Project | null; programName: string | null }) {
    const percent = project ? Math.min(100, Math.round(project.progress_percent)) : 0;
    return (
        <div className="relative overflow-hidden rounded-xl bg-primary text-on-primary custom-shadow">
            <div className="relative z-10 p-8">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container">
                        <Icon name="volunteer_activism" filled className="text-on-primary-container" />
                    </div>
                    <div>
                        <h3 className="text-headline-md">Dampak Wakaf Anda</h3>
                        <p className="text-label-sm opacity-80">Setiap rupiah adalah investasi akhirat</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                        <p className="mb-1 text-label-sm opacity-80">Tujuan Wakaf</p>
                        <p className="text-headline-md text-secondary-container">{project ? project.name : programName ?? "Program Umum BWKR"}</p>
                    </div>
                    {project && (
                        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                            <p className="mb-1 text-label-sm opacity-80">Status Proyek Saat Ini</p>
                            <div className="mb-2 flex items-end justify-between">
                                <span className="text-label-md">{percent}% Terkumpul</span>
                                <span className="text-label-sm">{formatRupiah(project.amount_raised)} / {formatRupiah(project.target_amount)}</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
                                <div className="h-full rounded-full bg-secondary-container" style={{ width: `${percent}%` }} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                    <blockquote className="text-body-md italic opacity-90">
                        “Apabila manusia mati, terputuslah amalnya kecuali tiga perkara: sedekah jariyah (wakaf), ilmu yang bermanfaat, atau anak saleh yang mendoakannya.”
                        <footer className="mt-2 text-label-md not-italic">— HR. Muslim</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

function StepBar({ step }: { step: number }) {
    return (
        <div className="mb-6 flex items-center gap-2">
            {[1, 2].map((s) => (
                <div key={s} className={cn("h-1.5 flex-1 rounded-full", step >= s ? "bg-primary" : "bg-surface-container-high")} />
            ))}
        </div>
    );
}

function ErrorBox({ message }: { message: string }) {
    return (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-label-md text-on-error-container">
            <Icon name="error" filled className="text-[18px]" /> {message}
        </div>
    );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-label-md text-on-surface-variant">{label}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                className="w-full rounded-lg border border-outline-variant bg-surface-gray px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary" />
        </div>
    );
}

function SelectField({ label, value, onChange, children, disabled }: {
    label: string; value: string | number; onChange: (v: string) => void; children: React.ReactNode; disabled?: boolean;
}) {
    return (
        <div>
            <label className="mb-2 block text-label-md text-on-surface-variant">{label}</label>
            <div className="relative">
                <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
                    className="w-full appearance-none truncate rounded-lg border border-outline-variant bg-surface-gray py-3 pl-4 pr-10 text-body-md text-on-surface outline-none focus:border-primary disabled:opacity-60">
                    {children}
                </select>
                <Icon name="expand_more" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            </div>
        </div>
    );
}