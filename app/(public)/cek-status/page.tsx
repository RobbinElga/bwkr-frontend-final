import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { StatusChecker } from "@/components/donation/StatusChecker";

export const metadata: Metadata = {
    title: "Cek Status Wakaf | BWKR",
    description: "Lacak status verifikasi donasi wakaf Anda dengan nomor referensi.",
};

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function CekStatusPage({ searchParams }: Props) {
    const { ref } = await searchParams;

    return (
        <main className="pb-20 pt-28">
            <Container className="max-w-xl">
                <header className="mb-8 text-center">
                    <h1 className="text-display-lg-mobile text-primary">Cek Status Wakaf</h1>
                    <p className="mt-2 text-body-md text-on-surface-variant">
                        Masukkan nomor referensi untuk melihat status donasi Anda.
                    </p>
                </header>
                <StatusChecker initialRef={ref ?? ""} />
            </Container>
        </main>
    );
}