"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import type { Project } from "@/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
    const categories = useMemo(() => {
        const names = projects.map((p) => p.program?.name).filter(Boolean) as string[];
        return ["Semua", ...Array.from(new Set(names))];
    }, [projects]);

    const [active, setActive] = useState("Semua");
    const visible = active === "Semua" ? projects : projects.filter((p) => p.program?.name === active);

    return (
        <section id="project" className="bg-surface-gray py-20">
            <Container>
                <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <h2 className="text-headline-lg text-primary">Project Berjalan</h2>
                    <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className={cn(
                                    "whitespace-nowrap rounded-full px-6 py-2 text-label-md transition-all duration-200",
                                    active === c
                                        ? "bg-primary text-on-primary shadow-md scale-105"
                                        : "border border-border-subtle bg-white text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-low hover:scale-105"
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {visible.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border-subtle p-8 text-center">
                        <Icon name="search_off" className="mb-3 text-5xl text-on-surface-variant opacity-40" />
                        <p className="text-body-md text-on-surface-variant">Belum ada proyek untuk kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {visible.map((p) => {
                            const raw = p.target_amount > 0 ? (p.amount_raised / p.target_amount) * 100 : 0;
                            const percent = Math.min(100, Math.round(raw));
                            const percentLabel = raw > 0 && raw < 1 ? "<1%" : `${percent}%`;
                            const barWidth = raw > 0 ? Math.min(100, Math.max(2, raw)) : 0; // sliver tipis saat >0
                            return (
                                <article
                                    key={p.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white custom-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row"
                                >
                                    <div className="relative h-64 overflow-hidden bg-surface-container-high md:h-auto md:w-2/5">
                                        {p.image_urls?.[0] ? (
                                            <Image
                                                src={p.image_urls[0]}
                                                alt={p.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width:768px) 100vw, 40vw"
                                            />
                                        ) : (
                                            <div className="flex h-full min-h-64 items-center justify-center text-on-surface-variant">
                                                <Icon name="image" className="text-4xl opacity-40" />
                                            </div>
                                        )}
                                        {/* Badge status */}
                                        {p.status === "berjalan" && (
                                            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-label-sm text-on-primary backdrop-blur-sm">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-fixed" />
                                                Aktif
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                                        <div>
                                            <span className="text-label-sm uppercase tracking-wider text-secondary">
                                                {p.program?.name ?? "Proyek"}
                                            </span>
                                            <h3 className="mb-2 mt-1 text-headline-md text-on-surface">{p.name}</h3>
                                            <p className="mb-4 line-clamp-2 text-body-md text-on-surface-variant">{p.description}</p>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex items-end justify-between gap-3">
                                                <div>
                                                    <span className="text-label-sm text-on-surface-variant">Terkumpul</span>
                                                    <p className="text-lg font-bold text-primary">{formatRupiah(p.amount_raised)}</p>
                                                    <p className="mt-0.5 text-label-sm text-on-surface-variant">
                                                        dari target {formatRupiah(p.target_amount)}
                                                    </p>
                                                </div>
                                                <span className={cn(
                                                    "whitespace-nowrap text-lg font-bold",
                                                    percent >= 100 ? "text-secondary" : "text-primary"
                                                )}>
                                                    {percentLabel}
                                                </span>
                                            </div>
                                            <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-700",
                                                        percent >= 100 ? "bg-secondary" : "bg-primary"
                                                    )}
                                                    style={{ width: `${barWidth}%` }}
                                                />
                                            </div>
                                            <Link
                                                href={`/donasi?project=${p.slug}`}
                                                className="flex items-center justify-center gap-2 rounded-xl bg-primary-container py-3.5 text-label-md text-on-primary-container transition-all hover:bg-primary hover:text-on-primary active:scale-[0.98]"
                                            >
                                                <Icon name="volunteer_activism" filled className="text-[18px]" />
                                                Wakaf Sekarang
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                <div className="mt-10 text-center">
                    <Link
                        href="/program"
                        className="inline-flex items-center gap-2 rounded-full border border-primary px-8 py-3 text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
                    >
                        Lihat Semua Proyek <Icon name="arrow_forward" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}