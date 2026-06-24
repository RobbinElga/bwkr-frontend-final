import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getPrograms } from "@/services/public";
import { ProgramCard } from "@/components/program/ProgramCard";

export const metadata: Metadata = {
    title: "Program Wakaf | BWKR",
    description:
        "Pilih program wakaf produktif: pendidikan, air bersih, Al-Qur'an, dan pemberdayaan umat.",
};

export default async function ProgramListPage() {
    const programs = await getPrograms();

    return (
        <main className="pb-20 pt-28">
            <Container>
                <header className="mb-12 max-w-2xl">
                    <h1 className="text-display-lg-mobile text-primary">Program Wakaf</h1>
                    <p className="mt-4 text-body-md text-on-surface-variant">
                        Pilih berbagai program kebaikan berkelanjutan untuk meraih keberkahan jariyah.
                    </p>
                </header>

                {programs.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                        Belum ada program.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {programs.map((p) => (
                            <ProgramCard key={p.id} program={p} />
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}