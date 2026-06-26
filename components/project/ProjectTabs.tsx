"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatDate, formatRupiah } from "@/lib/format";
import type { ProjectUpdate } from "@/types";
import { getProjectDonors, type ProjectDonor } from "@/services/public";

const tabs = [
    { id: "tentang", label: "Tentang" },
    { id: "update", label: "Update" },
    { id: "donatur", label: "Donatur" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProjectTabs({
    description,
    updates,
    projectSlug,
}: {
    description: string | null;
    updates: ProjectUpdate[];
    projectSlug: string;
}) {
    const [active, setActive] = useState<TabId>("tentang");
    const [donors, setDonors] = useState<ProjectDonor[] | null>(null);

    useEffect(() => {
        if (active === "donatur" && donors === null) {
            getProjectDonors(projectSlug).then(setDonors).catch(() => setDonors([]));
        }
    }, [active, donors, projectSlug]);

    return (
        <div>
            <div className="flex gap-6 border-b border-border-subtle">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActive(t.id)}
                        className={`relative -mb-px pb-4 text-label-md transition-colors ${active === t.id
                            ? "border-b-2 border-primary text-primary"
                            : "text-on-surface-variant hover:text-on-surface"
                            }`}
                    >
                        {t.label}
                        {t.id === "update" && updates.length > 0 && (
                            <span className="ml-1 rounded-full bg-primary-container px-2 py-0.5 text-label-sm text-on-primary-container">
                                {updates.length}
                            </span>
                        )}
                        {t.id === "donatur" && donors && donors.length > 0 && (
                            <span className="ml-1 rounded-full bg-primary-container px-2 py-0.5 text-label-sm text-on-primary-container">
                                {donors.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-8">
                {active === "tentang" && (
                    <div className="whitespace-pre-line text-body-md leading-relaxed text-on-surface-variant">
                        {description || "Belum ada deskripsi untuk project ini."}
                    </div>
                )}

                {active === "update" &&
                    (updates.length === 0 ? (
                        <p className="rounded-xl border border-dashed border-border-subtle p-8 text-center text-on-surface-variant">
                            Belum ada update untuk project ini.
                        </p>
                    ) : (
                        <div className="space-y-8">
                            {updates.map((u) => (
                                <article key={u.id} className="relative border-l-2 border-primary/30 pl-6">
                                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />
                                    <p className="text-label-sm text-on-surface-variant">{formatDate(u.published_at)}</p>
                                    <h3 className="mt-1 text-headline-md text-on-surface">{u.title}</h3>
                                    {u.content && (
                                        <div className="article-content mt-2" dangerouslySetInnerHTML={{ __html: u.content }} />
                                    )}
                                    {u.image_urls?.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {u.image_urls.map((img, i) => (
                                                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                                                    <Image src={img} alt={u.title} fill className="object-cover" sizes="200px" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    ))}

                {active === "donatur" && (
                    donors === null ? (
                        <div className="space-y-3">
                            {[0, 1, 2].map((i) => <div key={i} className="h-14 rounded-xl bg-surface-container-high animate-pulse" />)}
                        </div>
                    ) : donors.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border-subtle p-8 text-center">
                            <Icon name="groups" className="text-4xl text-on-surface-variant opacity-50" />
                            <p className="mt-3 text-body-md text-on-surface-variant">
                                Belum ada wakif terverifikasi untuk project ini.
                            </p>
                        </div>
                    ) : (
                        <ol className="space-y-2">
                            {donors.map((d, i) => {
                                const rank = i + 1;
                                const medal =
                                    rank === 1 ? "bg-amber-400 text-white"
                                        : rank === 2 ? "bg-slate-300 text-slate-800"
                                            : rank === 3 ? "bg-amber-700 text-white"
                                                : "bg-surface-container-high text-on-surface-variant";
                                return (
                                    <li key={i} className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-container-lowest p-3 transition-shadow hover:shadow-sm">
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-label-md font-bold ${medal}`}>
                                            {rank}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-label-md text-on-surface truncate">{d.name}</p>
                                            {d.date && <p className="text-label-sm text-on-surface-variant">{formatDate(d.date)}</p>}
                                        </div>
                                        <span className="text-label-md font-bold text-primary whitespace-nowrap">{formatRupiah(d.amount)}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    )
                )}
            </div>
        </div>
    );
}