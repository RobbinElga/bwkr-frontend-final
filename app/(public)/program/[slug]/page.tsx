import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getProgramBySlug, getProjects } from "@/services/public";
import { ProjectCard } from "@/components/project/ProjectCard";
import { formatRupiah } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);
    if (!program) return { title: "Program tidak ditemukan | BWKR" };

    return {
        title: `${program.name} | BWKR`,
        description: program.description ?? undefined,
        openGraph: {
            title: program.name,
            description: program.description ?? undefined,
            images: program.image_url ? [program.image_url] : undefined,
        },
    };
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-headline-md text-primary">{value}</span>
            <span className="text-label-sm text-on-surface-variant">{label}</span>
        </div>
    );
}

export default async function ProgramDetailPage({ params }: Props) {
    const { slug } = await params;
    const [program, allProjects] = await Promise.all([getProgramBySlug(slug), getProjects()]);
    if (!program) notFound();

    const projects = allProjects.filter((p) => p.program_id === program.id);
    const totalRaised = projects.reduce((sum, p) => sum + p.amount_raised, 0);

    return (
        <main className="pb-20">
            <section className="bg-surface-gray pb-16 pt-28">
                <Container>
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary-container px-3 py-1 text-label-sm text-on-primary-container">
                                <Icon name="volunteer_activism" filled className="text-[16px]" />
                                Program Wakaf
                            </div>
                            <h1 className="text-display-lg-mobile text-primary">{program.name}</h1>
                            <p className="max-w-2xl text-body-lg text-on-surface-variant">{program.description}</p>
                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                <Stat value={`${projects.length}`} label="Project Aktif" />
                                <div className="h-12 w-px bg-border-subtle" />
                                <Stat value={formatRupiah(totalRaised)} label="Terkumpul" />
                            </div>
                        </div>
                        {program.image_url && (
                            <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-3xl border-4 border-white shadow-glow">
                                <Image
                                    src={program.image_url}
                                    alt={program.name}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width:768px) 100vw, 50vw"
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            <Container className="pt-16">
                <h2 className="mb-8 text-headline-lg text-primary">Project dalam Program Ini</h2>
                {projects.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                        Belum ada project untuk program ini.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}