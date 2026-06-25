import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getProjectBySlug } from "@/services/public";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectTabs } from "@/components/project/ProjectTabs";
import { formatRupiah } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const p = await getProjectBySlug(slug);
    if (!p) return { title: "Project tidak ditemukan | BWKR" };

    return {
        title: `${p.name} | BWKR`,
        description: p.description ?? undefined,
        openGraph: {
            title: p.name,
            description: p.description ?? undefined,
            images: p.image_urls?.[0] ? [p.image_urls[0]] : undefined,
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const p = await getProjectBySlug(slug);
    if (!p) notFound();

    const percent = Math.min(100, Math.round(p.progress_percent));
    const daysLeft = p.end_date
        ? Math.max(0, Math.ceil((new Date(p.end_date).getTime() - Date.now()) / 86_400_000))
        : null;

    return (
        <main className="pb-20 pt-28">
            <Container>
                <Link
                    href={p.program ? `/program/${p.program.slug}` : "/program"}
                    className="mb-6 inline-flex items-center gap-1 text-label-md text-primary hover:underline"
                >
                    <Icon name="arrow_back" /> Kembali
                </Link>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Kiri */}
                    <div className="space-y-8 lg:col-span-2">
                        <ProjectGallery images={p.image_urls ?? []} alt={p.name} />
                        <div>
                            {p.program?.name && (
                                <span className="text-label-sm uppercase tracking-wider text-secondary">
                                    {p.program.name}
                                </span>
                            )}
                            <h1 className="mt-1 text-display-lg-mobile text-primary">{p.name}</h1>
                        </div>
                        <ProjectTabs
                            description={p.description}
                            updates={p.updates ?? []}
                            projectSlug={p.slug}
                        />
                    </div>

                    {/* Kanan: kartu donasi sticky */}
                    <aside className="lg:col-span-1">
                        <div className="space-y-6 rounded-3xl border border-border-subtle bg-surface-container-lowest p-6 shadow-glow lg:sticky lg:top-28">
                            <div>
                                <p className="text-label-sm text-on-surface-variant">Terkumpul</p>
                                <p className="text-headline-lg text-primary">{formatRupiah(p.amount_raised)}</p>
                                <p className="mt-1 text-label-md text-on-surface-variant">
                                    dari target {formatRupiah(p.target_amount)}
                                </p>
                            </div>

                            <div>
                                <div className="mb-2 flex justify-between text-label-sm">
                                    <span className="text-primary">{percent}%</span>
                                    {daysLeft !== null && (
                                        <span className="text-on-surface-variant">
                                            {daysLeft > 0 ? `${daysLeft} hari lagi` : "Berakhir"}
                                        </span>
                                    )}
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
                                    <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                                </div>
                            </div>

                            {p.shortfall > 0 && (
                                <div className="rounded-xl bg-surface-gray p-4 text-center">
                                    <p className="text-label-sm text-on-surface-variant">Dibutuhkan lagi</p>
                                    <p className="text-headline-md text-secondary">{formatRupiah(p.shortfall)}</p>
                                </div>
                            )}

                            <Link
                                href={`/donasi?project=${p.slug}`}
                                className="block w-full rounded-xl bg-primary py-4 text-center text-label-md text-on-primary transition-all hover:bg-deep-forest active:scale-[0.98]"
                            >
                                Wakaf Sekarang
                            </Link>

                            <p className="text-center text-label-sm text-on-surface-variant">
                                Wakaf Anda disalurkan transparan & dapat dipantau.
                            </p>
                        </div>
                    </aside>
                </div>
            </Container>
        </main>
    );
}