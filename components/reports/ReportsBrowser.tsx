"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { ReportItem } from "@/types";

const TABS = [
    { key: "semua", label: "Semua" },
    { key: "tahunan", label: "Laporan Tahunan" },
    { key: "keuangan", label: "Laporan Keuangan" },
    { key: "program", label: "Laporan Program" },
] as const;

export function ReportsBrowser({ reports }: { reports: ReportItem[] }) {
    const [tab, setTab] = useState<string>("semua");
    const list = reports ?? [];
    const filtered = tab === "semua" ? reports : reports.filter((r) => r.category === tab);

    return (
        <Container>
            <div className="py-12">
                {/* Tabs */}
                <div className="mb-8 flex flex-wrap gap-2 border-b border-border-subtle">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={cn(
                                "relative px-4 pb-4 text-label-md transition-colors",
                                tab === t.key ? "font-bold text-primary" : "text-on-surface-variant hover:text-primary"
                            )}
                        >
                            {t.label}
                            {tab === t.key && <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-primary" />}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border-subtle p-12 text-center">
                        <Icon name="description" className="mb-3 text-5xl text-on-surface-variant opacity-30" />
                        <p className="text-body-md text-on-surface-variant">Belum ada laporan pada kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {filtered.map((r) => (
                            <ReportCard key={r.id} report={r} />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}

function ReportCard({ report }: { report: ReportItem }) {
    return (
        <div className="group overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest custom-shadow transition-transform hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden bg-primary-container">
                {report.cover_url ? (
                    <Image
                        src={report.cover_url}
                        alt={report.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                        priority />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Icon name="analytics" filled className="text-6xl text-on-primary-container opacity-60" />
                    </div>
                )}
                {report.year && (
                    <span className="absolute bottom-4 left-4 rounded bg-primary/90 px-3 py-1 text-label-sm font-bold text-on-primary">
                        {report.year}
                    </span>
                )}
            </div>
            <div className="p-6">
                <h3 className="mb-2 text-headline-md text-primary">{report.title}</h3>
                {report.description && (
                    <p className="mb-6 line-clamp-3 text-body-md text-on-surface-variant">{report.description}</p>
                )}
                {report.file_url ? (
                    <a
                        href={report.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary py-3 text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
                    >
                        <Icon name="download" className="text-[20px]" /> Lihat Laporan
                    </a>
                ) : (
                    <span className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border-subtle py-3 text-label-md text-on-surface-variant opacity-60">
                        <Icon name="schedule" className="text-[20px]" /> Segera Tersedia
                    </span>
                )}
            </div>
        </div >
    );
}