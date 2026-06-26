import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DampakSection } from "@/components/sections/landing/DampakSection";
import { getImpactVideos, getAchievements } from "@/services/public";

export const metadata: Metadata = {
    title: "Dampak | BWKR",
    description: "Lihat dampak nyata dari wakaf yang telah disalurkan kepada santri dan umat.",
};

export default async function DampakPage() {
    const [videos, achievements] = await Promise.all([getImpactVideos(), getAchievements()]);

    return (
        <main className="pb-20 pt-32">
            <Container>
                <header className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary-fixed px-4 py-1 text-label-sm text-on-primary-fixed">
                        Dampak Nyata
                    </span>
                    <h1 className="text-display-lg-mobile text-primary md:text-display-lg">Dampak Wakaf Anda</h1>
                    <p className="mt-4 text-body-md leading-relaxed text-on-surface-variant">
                        Setiap wakaf yang Anda tunaikan menghadirkan manfaat nyata. Berikut rekam jejak & dokumentasinya.
                    </p>
                </header>

                {achievements.length > 0 && (
                    <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        {achievements.map((a) => (
                            <div key={a.id} className="rounded-2xl border border-border-subtle bg-surface-container-lowest p-6 text-center custom-shadow">
                                <p className="text-headline-lg font-bold text-primary">{a.count.toLocaleString("id-ID")}+</p>
                                <p className="mt-1 text-label-md text-on-surface-variant">{a.label}</p>
                                {a.period && <p className="text-label-sm text-outline">{a.period}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </Container>

            {videos.length > 0 ? (
                <DampakSection videos={videos} />
            ) : (
                <Container>
                    <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                        Belum ada dokumentasi dampak.
                    </p>
                </Container>
            )}
        </main>
    );
}