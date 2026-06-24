import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import type { Program } from "@/types";

export function ProgramsSection({ programs }: { programs: Program[] }) {
    return (
        <section id="program" className="py-20">
            <Container>
                <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
                    <div className="max-w-2xl">
                        <h2 className="text-headline-lg text-primary">Program Kami</h2>
                        <p className="mt-4 text-body-md text-on-surface-variant">
                            Pilih berbagai program kebaikan yang berkelanjutan untuk membantu sesama dan meraih keberkahan jariyah.
                        </p>
                    </div>
                    <Link href="/program" className="group flex items-center gap-2 text-label-md text-primary">
                        Semua Program
                        <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {programs.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                        Belum ada program untuk ditampilkan.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {programs.map((p, i) => (
                            <article
                                key={p.id}
                                className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-container-low shadow-glow transition-all hover:-translate-y-2"
                            >
                                <div className="relative h-48 overflow-hidden bg-surface-container-high">
                                    {p.image_url ? (
                                        <Image
                                            src={p.image_url}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width:768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-on-surface-variant">
                                            <Icon name="image" className="text-4xl opacity-40" />
                                        </div>
                                    )}
                                    {i === 0 && (
                                        <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-label-sm text-primary backdrop-blur">
                                            Terpopuler
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-headline-md text-on-surface">{p.name}</h3>
                                    <p className="mb-6 line-clamp-2 text-body-md text-on-surface-variant">{p.description}</p>
                                    <Link
                                        href={`/donasi?program=${p.slug}`}
                                        className="block w-full rounded-lg border-2 border-primary py-3 text-center text-label-md text-primary transition-all hover:bg-primary hover:text-white"
                                    >
                                        Pilih Program
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}