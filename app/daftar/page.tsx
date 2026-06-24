import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
    title: "Daftar | BWKR",
    description: "Bergabunglah sebagai wakif dan mulai langkah kebaikan.",
};

export default function DaftarPage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-on-surface">
            {/* Blob decoratif */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
                <div className="absolute -left-[5%] -top-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-primary blur-3xl" />
                <div className="absolute -bottom-[10%] -right-[5%] h-[40%] w-[40%] animate-pulse rounded-full bg-secondary blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-grow items-center justify-center px-4 py-20 md:px-6">
                <div className="w-full max-w-lg">
                    {/* Logo */}
                    <div className="mb-8 text-center">
                        <a href="/" className="text-display-lg font-extrabold tracking-tight text-primary">BWKR</a>
                    </div>

                    {/* Card */}
                    <div className="rounded-xl border border-border-subtle bg-white/95 p-8 custom-shadow backdrop-blur-sm md:p-12">
                        <div className="mb-8 text-center">
                            <h1 className="mb-2 text-headline-lg text-primary">Mulai Langkah Kebaikan</h1>
                            <p className="text-body-md text-on-surface-variant">Bergabunglah bersama ribuan wakif lainnya untuk membangun umat.</p>
                        </div>

                        <RegisterForm />

                        <div className="mt-6 text-center">
                            <p className="text-body-md text-on-surface-variant">
                                Sudah punya akun?{" "}
                                <a href="/login" className="font-bold text-primary hover:underline">Login di sini</a>
                            </p>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-6 flex items-center justify-center gap-8 opacity-60">
                        <div className="flex items-center gap-2">
                            <Icon name="verified_user" filled className="text-primary" />
                            <span className="text-label-sm">Data Terenkripsi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="account_balance" filled className="text-primary" />
                            <span className="text-label-sm">Resmi & Terpercaya</span>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="relative z-10 border-t border-border-subtle/50 py-6 px-4">
                <div className="mx-auto flex max-w-lg flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-label-sm text-on-surface-variant">© 2025 BWKR. Amanah dalam Pengelolaan Waqf.</p>
                    <div className="flex gap-6">
                        <a href="/program" className="text-label-sm text-on-surface-variant hover:text-primary">Program</a>
                        <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary">Kebijakan Privasi</a>
                        <a href="#" className="text-label-sm text-on-surface-variant hover:text-primary">Bantuan</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}