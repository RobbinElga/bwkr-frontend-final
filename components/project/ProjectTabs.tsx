"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { ProjectUpdate } from "@/types";

const tabs = [
    { id: "tentang", label: "Tentang" },
    { id: "update", label: "Update" },
    { id: "donatur", label: "Donatur" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProjectTabs({
    description,
    updates,
}: {
    description: string | null;
    updates: ProjectUpdate[];
}) {
    const [active, setActive] = useState<TabId>("tentang");

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
                    <div className="rounded-xl border border-dashed border-border-subtle p-8 text-center">
                        <Icon name="groups" className="text-4xl text-on-surface-variant opacity-50" />
                        <p className="mt-3 text-body-md text-on-surface-variant">
                            Daftar wakif akan tampil di sini setelah alur donasi aktif.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}