import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getReports } from "@/services/public";
import { ReportsBrowser } from "@/components/reports/ReportsBrowser";


export const metadata: Metadata = {
    title: "Laporan & Transparansi | BWKR",
    description: "Laporan tahunan, keuangan, dan program — wujud transparansi pengelolaan wakaf BWKR.",
};

export default async function LaporanPage() {
    const reports = await getReports();

    return (
        <main className="pt-28">
            {/* Hero */}
            <Container>
                <div className="grid items-center gap-8 py-8 md:grid-cols-2">
                    <div>
                        <h1 className="text-display-lg-mobile text-primary md:text-display-lg">Transparansi &amp; Laporan</h1>
                        <p className="mt-4 max-w-xl text-body-lg text-on-surface-variant">
                            Dedikasi kami untuk akuntabilitas. Lihat bagaimana setiap kontribusi Anda dikelola secara amanah melalui laporan berkala kami.
                        </p>
                    </div>
                    <div className="hidden justify-end md:flex">
                        <div className="w-64 rotate-3 rounded-xl border border-border-subtle bg-surface-container p-4 custom-shadow transition-transform duration-500 hover:rotate-0">
                            <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-primary">
                                <Icon name="analytics" filled className="text-6xl text-on-primary" />
                            </div>
                            <div className="mb-2 h-3 w-3/4 rounded bg-outline-variant/40" />
                            <div className="h-3 w-1/2 rounded bg-outline-variant/40" />
                        </div>
                    </div>
                </div>
            </Container>

            {/* Trust bar */}
            <div className="my-8 border-y border-border-subtle bg-surface-container-low">
                <Container>
                    <div className="grid grid-cols-2 gap-6 py-6 md:grid-cols-3">
                        {[
                            { icon: "verified", label: "Audit", value: "Transparan" },
                            { icon: "mosque", label: "Kepatuhan", value: "Sesuai Syariah" },
                            { icon: "handshake", label: "Prinsip", value: "Amanah & Berkelanjutan" },
                        ].map((s) => (
                            <div key={s.label} className="flex flex-col">
                                <span className="text-label-sm uppercase tracking-widest text-secondary">{s.label}</span>
                                <span className="flex items-center gap-2 text-headline-md text-primary">
                                    <Icon name={s.icon} className="text-secondary" /> {s.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Daftar laporan */}
            <ReportsBrowser reports={reports} />

            {/* CTA */}
            <Container>
                <div className="relative my-12 overflow-hidden rounded-3xl bg-primary p-8 md:p-12">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
                    <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="text-center md:text-left">
                            <h2 className="mb-2 text-headline-lg text-on-primary">Ada Pertanyaan Mengenai Laporan?</h2>
                            <p className="text-body-md text-on-primary/80">Tim kami siap membantu menjelaskan detail transparansi pengelolaan wakaf.</p>
                        </div>
                        <Link href="/tentang" className="shrink-0 rounded-full bg-secondary-container px-8 py-3 text-label-md text-on-secondary-container transition-all hover:brightness-110">
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}