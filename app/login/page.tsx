import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | BWKR",
  description: "Masuk ke akun wakaf Anda.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      {/* KIRI — panel visual (hidden mobile) */}
      <section className="relative hidden w-1/2 overflow-hidden md:flex lg:w-3/5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 to-deep-forest/60" />
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16 text-on-primary">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed shadow-lg">
              <span className="material-symbols-outlined text-3xl font-bold text-primary">account_balance_wallet</span>
            </div>
            <span className="text-headline-lg font-extrabold tracking-tight">BWKR</span>
          </div>
          <div className="max-w-md">
            <h1 className="mb-6 text-display-lg leading-tight">Membangun Keberlanjutan Melalui Waqf.</h1>
            <p className="text-body-lg leading-relaxed text-primary-fixed opacity-90">
              Bergabunglah dalam ekosistem filantropi modern yang transparan dan berdampak nyata bagi umat. Setiap kontribusi Anda adalah investasi akhirat yang terjaga.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-headline-md font-bold">12rb+</p>
              <p className="text-label-sm uppercase tracking-widest opacity-70">Wakif Aktif</p>
            </div>
            <div className="h-10 w-px bg-on-primary/20" />
            <div>
              <p className="text-headline-md font-bold">Rp 4.2M</p>
              <p className="text-label-sm uppercase tracking-widest opacity-70">Dana Tersalurkan</p>
            </div>
          </div>
        </div>
      </section>

      {/* KANAN — form */}
      <section className="flex w-full flex-col items-center justify-center bg-surface px-6 py-12 md:w-1/2 md:px-10 lg:w-2/5">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Logo mobile */}
          <div className="text-center md:hidden">
            <span className="text-headline-lg font-extrabold text-primary">BWKR</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-headline-lg text-on-surface">Selamat Datang Kembali</h2>
            <p className="text-body-md text-on-surface-variant">Masuk untuk mengelola amanah dan melihat dampak wakaf Anda.</p>
          </div>

          <LoginForm />

          <p className="text-center text-body-md text-on-surface-variant">
            Belum punya akun?{" "}
            <a href="/daftar" className="font-bold text-primary hover:underline">Daftar di sini</a>
          </p>
        </div>

        <footer className="mt-auto pt-16 text-center">
          <p className="text-label-sm text-outline">© 2025 BWKR. Amanah dalam Pengelolaan Waqf.</p>
        </footer>
      </section>
    </main>
  );
}